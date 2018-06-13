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
          sh 'whoami'
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
        container('node') {
          echo 'Build'
          sh 'whoami'
          sh 'echo $HOSTNAME'
          echo "${env.GIT_TAG}"
          echo "${env.GIT_HEAD}"
          echo "${env.NPM_TOKEN}"
        }
      }
    }
    stage('Test') {
      steps {
        container('node') {
          echo 'Test'
          sh 'echo $HOSTNAME'
          sh 'kubectl config view'
          echo "${env.GIT_TAG}"
          echo "${env.GIT_HEAD}"
          echo "${env.PRODUCT_NAME}"
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
