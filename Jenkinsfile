@Library('jenkins-shared-lib') _

jenkinsPipeline {
    kubernetesLabel = 'k8s-slave'

    productName = 'jenkins-docker'
    
    developmentServer = ''
    testingServer = ''
    stagingServer = ''
    productionServer = ''

    buildCmd = 'yarn install'
    lintCmd = 'yarn lint'
    testCmd = 'yarn test'

    deployDevCmd = 'uptime'
    deployTestCmd = 'uptime'
    deployStagCmd = 'uptime'
    deployProdCmd = 'uptime'

    dockerBuild = false
    dockerBuildEnv = false
}
