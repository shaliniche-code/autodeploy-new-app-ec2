pipeline {
    agent any
        stages {
            steps ('access github and download files')
            {
                git branch: 'main', 
                credentialsId: 'cicdwebhook', 
                url: 'https://github.com/shaliniche-code/autodeploy-new-app-ec2.git'
            }
        }
}
