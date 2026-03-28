pipeline {
    agent any
        stages {
            stage('access github and download files'){
              steps {
          
                   git branch: 'main', 
                   credentialsId: 'latest-github',
                   url: 'https://github.com/shaliniche-code/autodeploy-new-app-ec2.git'               
        }
        }
          stage('build image') {
              steps {
                  sh 'docker build -t webapp .'
                }
}


          stage('docker hub login permission to push the image'){
                steps {
                     withCredentials(
                       [usernamePassword(credentialsId: 'dockerhub-creds', 
                        passwordVariable: 'DOCKER_PASS', 
                        usernameVariable: 'DOCKER_USER')]) {
  
                    sh '''
                    echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    '''                     
}
}

}

         stage('tag image and push to dockerhub') {
                  steps {
                       sh '''
                       docker tag webapp shalinidocker12/webapp:v1 
                       docker push shalinidocker12/webapp:v1
                       '''            
}
}
       stage('deploy app on remote server') {
    steps{
        sh '''
ssh -o StrictHostKeyChecking=no ubuntu@13.234.120.12 << 'EOF'

echo "Cleaning up old containers using port 80..."

docker ps -q --filter "publish=80" | xargs -r docker stop
docker ps -aq --filter "publish=80" | xargs -r docker rm

echo "Pulling latest image..."

docker pull shalinidocker12/webapp:v1

echo "Running container..."
docker stop webapp || true
docker rm webapp || true
docker run -d --name webapp -p 80:3000 shalinidocker12/webapp:v1

EOF
        '''
    }
}
}
}


