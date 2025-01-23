pipeline { 
    agent any

    environment {
        // Define environment variable for the GitLab PAT, using Jenkins credentials binding
        GITLAB_NPM_TOKEN = credentials('gitlab-npm-token-id')
        SONARQUBE_TOKEN = credentials('sonar-liyan-order')
        DOCKER_REGISTRY_URL = 'docker.sharifexchange.net'
        DOCKER_REGISTRY_CREDENTIALS_ID = credentials('docker_registry_user_pass')
        IMAGE_NAME = 'backend.linchpin.ex.pro'
        IMAGE_TAG =  "${env.BUILD_NUMBER}" //'latest' // or use ${env.BUILD_NUMBER} for dynamic tagging
        // Telegram configuration
        TELEGRAM_TOKEN = credentials('exir_telegram_bot_key')
        TELEGRAM_CHAT_ID = credentials('EXIR_TELEGRAM_CHANNEL_REPORT_CHAT_ID')
    }
    
    stages {
        // stage('Prepare') {
        //     steps {
        //         script {
        //             // Dynamically create .npmrc file with the GitLab registry configuration
        //             writeFile file: '.npmrc', text: """
        //             @liyan_bot:registry=https://git.sharifexchange.net/api/v4/projects/7/packages/npm/
        //             //git.sharifexchange.net/api/v4/projects/7/packages/npm/:_authToken=${GITLAB_NPM_TOKEN}
        //             """
        //         }
        //     }
        // }

        // stage('Update base package') {
        //     steps {
        //         script {
        //             // Clean npm cache
        //             sh 'npm cache clean --force'

        //             def output = sh(script: "npm outdated @liyan_bot/liyan_base -p || true", returnStdout: true).trim()
        //             if (!!output) {
        //                 sh "npm update @liyan_bot/liyan_base"
        //                 gitCommitAndPush()
        //             } else {
        //                 echo 'Base package is up to date'
        //             }
        //         }
        //     }
        // }

        stage('Install Dependencies') {
            steps {
                // Run npm install to fetch the private package and other dependencies
                sh 'npm install'
            }
        }

        // stage('SonarQube Analysis') {
        //     environment {
        //         SCANNER_HOME = tool 'sonarqube-scanner';    
        //     }
            
        //     steps {
                
        //         withSonarQubeEnv('sonarqube-container') {
        //             sh """
        //             ${SCANNER_HOME}/bin/sonar-scanner \
        //             -Dsonar.projectKey=${IMAGE_NAME}\
        //             -Dsonar.sources=. \
        //             -Dsonar.css.node=. \
        //             -Dsonar.host.url=http://37.27.39.139:9000 \
        //             -Dsonar.login=${SONARQUBE_TOKEN}
        //             """
        //         }
        //     }
        // }
        
        stage('Build/Test') {
            steps {
                // Add your build and test commands here
                sh 'npm run build'
                // sh 'npm test'
            }
        }

        stage('Deploy') 
        {
            steps
            {
                script
                {
                    // Corrected the echo statement by adding the missing closing quote
                    def customImage2 = docker.build("$IMAGE_NAME:$IMAGE_TAG", "-f Dockerfile .")
                    sh 'echo "Deploying to Docker registry"'
                    withCredentials([usernamePassword(credentialsId: 'docker_registry_user_pass', passwordVariable: 'DOCKER_REGISTRY_PASS', usernameVariable: 'DOCKER_REGISTRY_USER')]) {
                        sh 'echo $DOCKER_REGISTRY_PASS | docker login -u $DOCKER_REGISTRY_USER --password-stdin docker.sharifexchange.net'
                    }
                    docker.withRegistry("http://$DOCKER_REGISTRY_URL", 'docker_registry_user_pass') 
                    {
                        // Build the Docker image
                        // def customImage = docker.build("$IMAGE_NAME:$IMAGE_TAG", "-f Dockerfile .")
                        
                        // Push the Docker image to your self-hosted registry
                        customImage2.push()
                        customImage2.push("latest")
                    }
                }
            }
        }

        // Include additional stages for deployment or further processing as needed
    }

    post {
        success {
            script {
                // Retrieve the last commit message using git command
                def lastCommitMessage = sh(script: 'git log -1 --pretty=%B', returnStdout: true).trim()
                
                def message = "✅ Pipeline ${env.JOB_NAME} succeeded!\nVersion: ${env.BUILD_NUMBER}\nLast Commit: ${lastCommitMessage}"
                sendTelegramMessage(message)
            }
        }
        failure {
            script {
                // Retrieve the last commit message using git command
                def lastCommitMessage = sh(script: 'git log -1 --pretty=%B', returnStdout: true).trim()
                
                def message = "❌ Pipeline ${env.JOB_NAME} failed!\nVersion: ${env.BUILD_NUMBER}\nLast Commit: ${lastCommitMessage}"
                sendTelegramMessage(message)
            }
        }
    }
}


def sendTelegramMessage(message) {
    try {
        sh """
        # Send the message using curl and the Telegram Bot API
        curl -s -X POST https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage -d chat_id=${TELEGRAM_CHAT_ID} -d text="${message}"
        """
    } catch (Exception e) {
        echo "Failed to send message to Telegram: ${e.message}"
    }
}


// def gitCommitAndPush() {
//     // Assuming your repository is already configured in Jenkins
//     // Replace 'origin' with your remote repository name if it's different
//     sh '''
//         git config user.email "admin@example.com"
//         git config user.name "example"
//         git add package.json
//         git commit -m "Update base package"
//         git push origin
//     '''
// }