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
}
}
