pipeline {
    agent any

    environment {
        DOCKER_REGISTRY_URL = 'docker.exirtu.be'
        IMAGE_NAME = 'backend.linchpin.ex.pro'
        GIT_REPO_URL = 'git@github.com:Exir-world/backend.linchpin.exir.git'
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm // Automatically checks out the code from the repo
            }
        }

        stage('Get Latest Image Tag') {
            steps {
                script {
                    // Fetch the latest image tag from Docker registry
                    def latestTag = sh(
                        script: "curl -s -X GET https://${DOCKER_REGISTRY_URL}/v2/${IMAGE_NAME}/tags/list | jq -r '.tags | sort | last'",
                        returnStdout: true
                    ).trim()

                    // Set to "1" if no tag exists or handle NumberFormatException
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
                sh 'npm install'  // Install Node.js dependencies
            }
        }

        stage('Build/Test') {
            steps {
                sh 'npm run build'  // Build the project
            }
        }

        stage('Docker Build & Push') {
            steps {
                script {
                    // Build Docker image
                    def customImage = docker.build("${IMAGE_NAME}:${IMAGE_TAG}", "-f Dockerfile .")

                    // Login to Docker registry
                    withCredentials([usernamePassword(credentialsId: 'DOCKER_REGISTRY_CREDENTIALS_ID', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin ${DOCKER_REGISTRY_URL}'
                    }

                    // Push Docker image to the registry
                    docker.withRegistry("https://${DOCKER_REGISTRY_URL}", 'DOCKER_REGISTRY_CREDENTIALS_ID') {
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
                // Print success message and last commit
                def lastCommitMessage = sh(script: 'git log -1 --pretty=%B', returnStdout: true).trim()
                echo "✅ Pipeline ${env.JOB_NAME} succeeded!\nVersion: ${env.IMAGE_TAG}\nLast Commit: ${lastCommitMessage}"
            }
        }
        failure {
            script {
                // Print failure message and last commit
                def lastCommitMessage = sh(script: 'git log -1 --pretty=%B', returnStdout: true).trim()
                echo "❌ Pipeline ${env.JOB_NAME} failed!\nVersion: ${env.IMAGE_TAG}\nLast Commit: ${lastCommitMessage}"
            }
        }
    }
}
