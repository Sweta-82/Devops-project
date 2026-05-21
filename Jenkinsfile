pipeline {
    agent any

    environment {
        DOCKER_USERNAME = credentials('docker-username')
        DOCKER_PASSWORD = credentials('docker-password')
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                url: 'https://github.com/Sweta-82/Devops-project.git'
            }
        }

        stage('Docker Login') {
            steps {
                sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t sweta82/skillsync-app:latest .'
            }
        }

        stage('Push Docker Image') {
            steps {
                sh 'docker push sweta82/skillsync-app:latest'
            }
        }

    }
}