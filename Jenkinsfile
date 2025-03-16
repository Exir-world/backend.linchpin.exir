pipeline { 
    agent any

    environment {
        // Environment Variables
        DOCKER_REGISTRY_URL = 'docker.exirtu.be'
        IMAGE_NAME = 'backend.linchpin.ex.pro'
        IMAGE_TAG = "${env.BUILD_NUMBER}" // Use build number for versioning
    }
    
    stages {

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build/Test') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Docker Build & Push') {
            steps {
                script {
                    def customImage = docker.build("${IMAGE_NAME}:${IMAGE_TAG}", "-f Dockerfile .")

                    withCredentials([usernamePassword(credentialsId: 'docker_registry_user_pass', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin ${DOCKER_REGISTRY_URL}'
                    }

                    docker.withRegistry("https://${DOCKER_REGISTRY_URL}", 'docker_registry_user_pass') {
                        customImage.push()
                        customImage.push("latest")
                    }
                }
            }
        }
    }

    post {
        success {
            script {
                def lastCommitMessage = sh(script: 'git log -1 --pretty=%B', returnStdout: true).trim()
                def message = "✅ Pipeline ${env.JOB_NAME} succeeded!\nVersion: ${env.BUILD_NUMBER}\nLast Commit: ${lastCommitMessage}"
                sendTelegramMessage(message)
            }
        }
        failure {
            script {
                def lastCommitMessage = sh(script: 'git log -1 --pretty=%B', returnStdout: true).trim()
                def message = "❌ Pipeline ${env.JOB_NAME} failed!\nVersion: ${env.BUILD_NUMBER}\nLast Commit: ${lastCommitMessage}"
                sendTelegramMessage(message)
            }
        }
    }
}

def sendTelegramMessage(message) {
    withCredentials([string(credentialsId: 'exir_telegram_bot_key', variable: 'TELEGRAM_TOKEN'),
                     string(credentialsId: 'EXIR_TELEGRAM_CHANNEL_REPORT_CHAT_ID', variable: 'TELEGRAM_CHAT_ID')]) {
        sh """
        curl -s -X POST https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage -d chat_id=${TELEGRAM_CHAT_ID} -d text="${message}"
        """
    }
}
