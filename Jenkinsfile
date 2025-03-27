pipeline {
    agent any

    environment {
        DOCKER_REGISTRY_URL = 'docker.exirtu.be'
        IMAGE_NAME = 'backend.linchpin.exir'
        GIT_REPO_URL = 'git@github.com:Exir-world/backend.linchpin.exir.git'
        WORKDIR = '/var/www/html'
    }

    stages {
        stage('Clean & Clone Repository') {
            steps {
                sshagent(credentials: ['github-ssh']) { // Replace with your actual SSH credential ID
                    sh '''
                        echo "🧹 Cleaning up ${WORKDIR} ..."
                        rm -rf ${WORKDIR}/*
                        echo "📥 Cloning repository into ${WORKDIR} ..."
                        git clone ${GIT_REPO_URL} ${WORKDIR}
                    '''
                }
            }
        }

        stage('Get Latest Image Tag') {
            steps {
                dir("${WORKDIR}") {
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
        }

        stage('Docker Build & Push') {
            steps {
                dir("${WORKDIR}") {
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
    }

    post {
        success {
            dir("${WORKDIR}") {
                script {
                    def lastCommitMessage = sh(script: 'git log -1 --pretty=%B', returnStdout: true).trim()
                    echo "✅ Pipeline ${env.JOB_NAME} succeeded!\nVersion: ${env.IMAGE_TAG}\nLast Commit: ${lastCommitMessage}"
                }
            }
        }
        failure {
            dir("${WORKDIR}") {
                script {
                    def lastCommitMessage = sh(script: 'git log -1 --pretty=%B', returnStdout: true).trim()
                    echo "❌ Pipeline ${env.JOB_NAME} failed!\nVersion: ${env.IMAGE_TAG}\nLast Commit: ${lastCommitMessage}"
                }
            }
        }
    }
}
