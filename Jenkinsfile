pipeline {
    agent any

    environment {
        AWS_REGION = 'us-east-1'
        AWS_ACCOUNT_ID = '<AWS_ACCOUNT_ID>'
        REPOSITORY_NAME = 'node-js-deployment'
        EC2_INSTANCE_IP = '<EC2_INSTANCE_IP>'
        IMAGE_NAME = 'node-js-deployment'
        ECR_URI = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${REPOSITORY_NAME}"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'master', url: 'https://github.com/mouzamali123/node-js-deployment'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'credentialsId']]) {
                        sh "aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_URI}"
                        sh "docker build -t ${IMAGE_NAME} ./node-js"
                        sh "docker tag ${IMAGE_NAME}:latest ${ECR_URI}:latest"
                    }
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'credentialsId']]) {
                        sh "docker push ${ECR_URI}:latest"
                    }
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                script {
                    withCredentials([sshUserPrivateKey(credentialsId: 'credentialsId', keyFileVariable: 'SSH_KEY')]) {
                        echo "SSH key has been loaded successfully."

                        // Create a script to run on the remote EC2 instance
                        sh """
                        ssh -o StrictHostKeyChecking=no -i ${SSH_KEY} ubuntu@${EC2_INSTANCE_IP} <<EOF
                            echo "Starting deployment..."
                            # Authenticate with ECR
                            aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_URI}

                            # Pull the latest image
                            docker pull ${ECR_URI}:latest

                            # Stop and remove the existing container if it exists
                            docker stop ${IMAGE_NAME} || true
                            docker rm ${IMAGE_NAME} || true

                            # Run the new container
                            docker run -d --name ${IMAGE_NAME} -p 3000:3000 ${ECR_URI}:latest
EOF
                        """
                    }
                }
            }
        }
    }

    post {
        always {
            sh "docker logout ${ECR_URI}"
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
