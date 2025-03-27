pipeline {
    agent any

    environment {
        DOCKER_REGISTRY_URL = 'docker.exirtu.be'
        IMAGE_NAME = 'backend.linchpin.exir'
        GIT_REPO_URL = 'git@github.com:Exir-world/backend.linchpin.exir.git'
        TELEGRAM_CHAT_ID = '-1002585379912'
        TELEGRAM_BOT_TOKEN = '8027466900:AAG6Q_0p6rSeEXtg8e0gDcYJmIJ_R7zBVew'
    }

    stages {
        stage('Cleanup') {
            steps {
                deleteDir()
            }
        }

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Get Latest Image Tag') {
            steps {
                script {
                    def tagsJson = sh(
                        script: "curl -s -X GET https://${DOCKER_REGISTRY_URL}/v2/${IMAGE_NAME}/tags/list",
                        returnStdout: true
                    ).trim()

                    def latestTag = "1"
                    try {
                        def tags = readJSON text: tagsJson
                        def numericTags = []

                        for (tag in tags.tags) {
                            if (tag ==~ /^\d+$/) {
                                numericTags << tag.toInteger()
                            }
                        }

                        numericTags.sort()
                        if (numericTags && numericTags.size() > 0) {
                            latestTag = (numericTags[-1] + 1).toString()
                        }
                    } catch (Exception e) {
                        echo "⚠️ Failed to parse tags. Defaulting to tag 1. Error: ${e.message}"
                    }

                    env.IMAGE_TAG = latestTag
                    echo "🚀 Using image tag: ${env.IMAGE_TAG}"
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'rm -rf node_modules package-lock.json'
                sh 'npm cache clean --force'
                sh 'npm install'
            }
        }

        stage('Docker Build & Push') {
            steps {
                script {
                    def customImage = docker.build("${IMAGE_NAME}:${IMAGE_TAG}", "-f Dockerfile .")

                    withCredentials([usernamePassword(credentialsId: 'DOCKER_REGISTRY_CREDENTIALS_ID', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin ${DOCKER_REGISTRY_URL}'
                    }

                    docker.withRegistry("https://${DOCKER_REGISTRY_URL}", 'DOCKER_REGISTRY_CREDENTIALS_ID') {
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
                def message = "✅ *your container is alive!!! * `${env.JOB_NAME}`\n*Status:* ✅ Success\n*Version:* `${env.IMAGE_TAG}`\n*Commit:* `${lastCommitMessage}`"
                sendTelegramMessage(message)
            }
        }
        failure {
            script {
                def lastCommitMessage = sh(script: 'git log -1 --pretty=%B', returnStdout: true).trim()
                def message = "❌ *Pipeline:* `${env.JOB_NAME}`\n*Status:* ❌ Failed\n*Version:* `${env.IMAGE_TAG}`\n*Commit:* `${lastCommitMessage}`"
                sendTelegramMessage(message)
            }
        }
    }
}

// Outside the pipeline block: function to send Telegram message
def sendTelegramMessage(String message) {
    sh """
        curl -s -X POST https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage \\
        -d chat_id=${env.TELEGRAM_CHAT_ID} \\
        -d parse_mode=Markdown \\
        --data-urlencode text="${message}"
    """
}
