module.exports = {
  apps : [{
    script: 'app.js',
    watch: '.',
    env: {
      'PHOTON_ID': 'jotnajoa',
      'PHOTON_TOKEN':'db1c57113235b967cf71f0276fab7008d5d83f8a',
      'AWSRDS_PW': 'wndeoalska86',
      'PHOTON_ID': 'jotnajoa',
      'AWSRDS_EP':'ds-20.crrxaw2b5hr1.us-east-1.rds.amazonaws.com'
    }
    
  }], 

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};

