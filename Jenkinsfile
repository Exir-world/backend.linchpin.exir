pipeline {
    agent any

    environment {
        DOCKER_REGISTRY_URL = 'docker.exirtu.be'
        IMAGE_NAME = 'backend.linchpin.ex.pro'
    }

    stages {
        stage('Checkout Code') {
            steps {
                script {
                    // Use the SSH key stored in Jenkins credentials to access GitHub repository
                    withCredentials([sshUserPrivateKey(credentialsId: 'github-ssh-key', keyFileVariable: 'SSH_KEY')]) {
                        sh 'git clone git@github.com:Exir-world/backend.linchpin.exir.git'
                    }
                }
            }
        }

        stage('Get Latest Image Tag') {
            steps {
                script {
                    def latestTag = sh(
                        script: "curl -s -X GET https://${DOCKER_REGISTRY_URL}/v2/${IMAGE_NAME}/tags/list | jq -r '.tags | sort | last'",
                        returnStdout: true
                    ).trim()

                    if (latestTag == "null" || latestTag == "") {
                        latestTag = "1" // Start from 1 if no tags exist
                    } else {
                        try {
                            latestTag = (latestTag.toInteger() + 1).toString() // Increment by 1
                        } catch (Exception e) {
                            latestTag = "1" // Default to 1 if there's a NumberFormatException
                        }
                    }

                    env.IMAGE_TAG = latestTag
                }
            }
        }

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
                        customImage.push("latest") // Also push 'latest' tag
                    }
                }
            }
        }
    }

    post {
        success {
            script {
                def lastCommitMessage = sh(script: 'git log -1 --pretty=%B', returnStdout: true).trim()
                echo "✅ Pipeline ${env.JOB_NAME} succeeded!\nVersion: ${env.IMAGE_TAG}\nLast Commit: ${lastCommitMessage}"
            }
        }
        failure {
            script {
                def lastCommitMessage = sh(script: 'git log -1 --pretty=%B', returnStdout: true).trim()
                echo "❌ Pipeline ${env.JOB_NAME} failed!\nVersion: ${env.IMAGE_TAG}\nLast Commit: ${lastCommitMessage}"
            }
        }
    }
}
