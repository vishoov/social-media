pipeline{
    agent any
    tools{
        maven 'maven'
    }
    stages{
        stage('clone github repository'){
            steps{
                script{
                    checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[credentialsId: 'github', url: 'https://github.com/ompatel0408/AI-USER-INTERFACE-REACT.git']])
                }
            }
        }
        stage('build'){
            steps{
                script{
                    sh 'npm run build'
                }
            }
        }
        stage('build docker image'){
            steps{
                script{
                    sh 'docker build -t ompatel0408/ai-social-media-user-interface-react:v1.0 .'
                }
            }
        }
        stage('push docker image to docker hub'){
            steps{
                script{
                    withCredentials([usernamePassword(credentialsId: 'Docker', passwordVariable: 'DOCKER_HUB_PASSWORD', usernameVariable: 'DOCKER_HUB_USERNAME')]) {
                        sh 'echo "$DOCKER_HUB_PASSWORD" | docker login -u "$DOCKER_HUB_USERNAME" --password-stdin'
                    }
                    sh 'docker push ompatel0408/ai-social-media-user-interface-react:v1.0'
                }
            }
        }
        stage('Retrieve EKS configuration'){
            steps{
                script{
                    sh 'aws eks update-kubeconfig --name AI-SOCIAL-MEDIA-CLUSTER'
                }
            }
        }
        stage('deploy ai-social-media-message-notification-interface to EKS cluster'){
            steps{
                script{
                    sh 'kubectl apply -f k8s-ai-user-interface-react.yml'
                }
            }
        }
        stage('restart ai social media message notification interface pod'){
            steps{
                script{
                    sh 'kubectl rollout restart deployment ai-social-media-user-interface-react'
                }
            }
        }
        stage('delete existing docker image'){
            steps{
                script{
                    sh 'docker rmi ompatel0408/ai-social-media-user-interface-react:v1.0'
                }
            }
        }
        stage('clean up workspace') {
            steps {
                deleteDir()
            }
        }
    }
}