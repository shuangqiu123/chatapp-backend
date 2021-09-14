pipeline {
	stages {
		stage("Build Docker Images") {
			sh 'docker rmi chatapp'
			sh 'docker build -t chatapp .'
		}

		stage('Push to the Docker Hub') {
			withCreadentials([string(credentialsId: 'docker-pwd', variable: 'dockerHubPwd')]) {
				sh 'docker login -u shuangqiu -p ${dockerHubPwd}'
			}
			sh 'docker tag chatapp:latest $DOCKER_HUB/chatapp:$BUILD_NUMBER'
		}

		stage('Run the application in the remote server') {
			def runDockerCommand = 'docker run -p 4000:4000 -d --name chatapp shuangqiu/chatapp:$BUILD_NUMBER'
			sshagent(['prodServer']) {
				sh 'ssh -o StrictHostKeyChecking=no ubuntu@${server} ${runDockerCommand}'
			}
		}
	}
}