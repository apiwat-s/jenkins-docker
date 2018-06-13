pipeline {
  agent {
    kubernetes {
      label 'k8s-slave'
      defaultContainer 'jnlp'
    }
  }
  options { disableConcurrentBuilds() }
  environment {
    PRODUCT_NAME = 'crm-client'
    DESK_DEV_SERVER = '188.166.224.25'
    CI = 'true'
    GITHUB_TOKEN = credentials('e9ac4e50-9eba-4ad3-a8b6-c6a36796248b');
  }
  stages {
    stage('Pre-Build') {
      steps {
        container('node') {
          echo 'Pre-Build started'
          sh 'echo $HOSTNAME'
          sh 'git remote -v'
          sh 'git log --reverse -1|tail'
          script {
            env.GIT_TAG = sh(returnStdout: true, script: "git tag --sort version:refname | tail -1").trim()
            env.GIT_HEAD = sh(returnStdout: true, script: "git rev-parse --short HEAD").trim()
          }
        }
      }
    }
    stage('Build') {
      steps {
        container('docker') {
          echo 'Build'
          sh 'echo $HOSTNAME'
          echo "${env.GIT_TAG}"
          echo "${env.GIT_HEAD}"
          echo "${env.NPM_TOKEN}"
          script {
            docker = docker.build("registry.zrcdn.xyz/apiwat/jenkins-docker:latest", "-f Dockerfile --build-arg NPM_TOKEN=${env.NPM_TOKEN} .")
            docker.withRegistry('https://registry.zrcdn.xyz', 'zr-registry') {
              docker.push("latest")
            }
          }
        }
      }
    }
    stage('Test') {
      steps {
        container('golang') {
          echo 'Test'
          sh 'echo $HOSTNAME'
          sh 'git remote -v'
          echo "${env.GIT_TAG}"
          echo "${env.GIT_HEAD}"
          echo "${env.PRODUCT_NAME}"
          sh 'go version'
        }
      }
    }
    stage('Version') {
      when {
        expression { BRANCH_NAME ==~ /(develop|master|production)/ }
      }
      steps {
        echo 'Versioning'
        echo 'npm version patch -m "Bumped to %s"'
        echo 'git push --tags'
        sh 'git remote -v'
        sh 'echo $HOSTNAME'
        echo "${env.GIT_TAG}"
        echo "${env.GIT_HEAD}"
        echo "${env.PRODUCT_NAME}"
      }
    }
  }
}
