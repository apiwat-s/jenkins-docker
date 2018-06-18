pipeline {
  agent {
    kubernetes {
      label 'k8s-slave'
      defaultContainer 'jnlp'
    }
  }
  environment {
    CI = 'true'
    PRODUCT_NAME = 'jenkins-docker'
    DESK_DEV_SERVER = '188.166.224.25'
    GITHUB_TOKEN = credentials('e9ac4e50-9eba-4ad3-a8b6-c6a36796248b');
  }
  stages {
    stage('Pre-Build') {
      steps {
        container('node') {
          echo 'Pre-Build started'
          slackSend color: "good", message: "STARTED: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
          sh 'git log --reverse -1|tail'
          script {
            env.GIT_HEAD = sh(returnStdout: true, script: "git rev-parse --short HEAD").trim()
          }
        }
      }
    }
    stage('Build') {
      steps {
        container('node') {
          echo 'Building'
          echo "${env.GIT_HEAD}"
          sh 'yarn install'
          script {
            if (currentBuild.result == "STABLE") {
              slackSend color: "good", message: "DEPLOYED DEV: ${currentBuild.result} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
            } else {
              slackSend color: "danger", message: "DEPLOYED DEV: ${currentBuild.result} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
            }
          }
        }
      }
    }
    stage('Test') {
      steps {
        container('node') {
          echo 'Testing'
          sh 'yarn lint'
          echo 'yarn test'
        }
      }
    }
    stage('Version') {
      when {
        expression { BRANCH_NAME ==~ /(develop|master|production)/ }
      }
      steps {
        container('node') {
          echo 'Versioning'
          echo 'npm version patch -m "Bumped to %s"'
          echo 'git push --tags'
        }
      }
    }
    stage('Build Docker') {
      when {
        branch 'master'
      }
      steps {
        container('docker') {
          echo 'Building docker for development'
          script {
            docker.withRegistry('https://registry.zrcdn.xyz', 'zr-registry') {
              app = docker.build("registry.zrcdn.xyz/apiwat/${env.PRODUCT_NAME}:${env.BRANCH_NAME}-${env.GIT_HEAD}", "-f Dockerfile .")
              app.push("${env.BRANCH_NAME}-${env.GIT_HEAD}")
            }
          }
        }
      }
    }
  }
  post {
    success {
      slackSend color: "good", message: "PASSES: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
    }
    failure {
      slackSend color: "danger", message: "FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
    }
  }
}
