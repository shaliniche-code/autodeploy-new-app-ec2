pipeline {
    agent any
        stages {
            stage('access github and download files'){
              steps {
          
                   git branch: 'main', 
                   credentialsId: 'githubcreds',
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
                    ssh ubuntu@3.110.216.250 << 'EOF'
                    
                    docker stop webapp || true
                    docker rm webapp || true
                    docker pull shalinidocker12/webapp:v1 
                    docker run -itd --name webapp -p 80:3000 shalinidocker12/webapp:v1 
                    
                    EOF 
                    '''
}
}
}
}
