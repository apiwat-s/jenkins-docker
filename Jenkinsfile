node {
    def app

    stage('Clone repository') {
        checkout scm
    }

    stage('Build image') {
        app = docker.build("apiwat/hello-docker-jenkins")
    }

    stage('Test image') {
        app.inside {
            sh 'echo "Tests passed"'
        }
    }

    stage('Push image') {
        docker.withRegistry('https://registry.zrcdn.xyz', 'zr-registry') {
            app.push("${env.BUILD_NUMBER}")
            app.push("latest")
        }
    }
}