@Library('jenkins-shared-lib') _

jenkinsPipeline {
    kubernetesLabel = 'k8s-slave'
    githubTokenId = 'e9ac4e50-9eba-4ad3-a8b6-c6a36796248b'
    webhookTokenId = 'devops-webhook-token'
    productName = 'jenkins-docker'
    
    developmentServer = '188.166.253.7'
    testingServer = ''
    stagingServer = ''
    productionServer = ''

    buildCmd = 'pwd; ls; yarn install'
    lintCmd = 'pwd; ls; yarn lint'
    testCmd = 'pwd; ls;yarn test'

    deployDevCmd = 'uptime'
    deployTestCmd = 'uptime'
    deployStagCmd = 'uptime'
    deployProdCmd = 'uptime'

    dockerBuild = false
    dockerBuildEnv = false

    inputTimeout = 3
    slackChannel = 'jenkins'
    devopsWebhook = 'https://0b42b938.ap.ngrok.io'
}
