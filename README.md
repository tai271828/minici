# Mini CI Loop

A dashboard showing the results from the mini CI loop tests for a device.
The build process generates a standalone index.html file.

## Build Instructions

### Pre-requisites

1. Install build packages
```
apt-get install build-essential libssl-dev
```

2. Install NVM
Install the [Node Version Manager](https://github.com/creationix/nvm) that will allow a specific
version of Node.js to be installed.
```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash
source ~/.profile
```

You may encounter a ca issue if you use Ubuntu (for example, Trusty. This issue could not be reproduced on Xenial). Then use this command instead
```
curl --cacert /etc/ssl/certs/ca-certificates.crt -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash
source ~/.profile
```

This is caused by the different ca path adapted by Ubuntu and Redhat.

3. Install the latest stable Node.js and npm
The latest stable (LTS) version of Node can be found on the [Node website](nodejs.org).
```
# Overview of available commands
nvm help

# Install the latest stable version
nvm install v4.4.3
```

You may again have the ca issue. Use the following commands before you apply the nvm install.
```
sudo mkdir -p /etc/pki/tls/certs/
sudo ln -s /etc/ssl/certs/ca-certificates.crt  /etc/pki/tls/certs/ca-bundle.crt
```
or
(use this if you do not care security issue very much.)
```
export NVM_NODEJS_ORG_MIRROR=http://nodejs.org/dist
```
```
# Select the version to use
nvm ls
nvm use v4.4.3
```

4. Download the project and install the dependencies
```
git clone XXXXXXXXXXXXXXXXXXXXXXX
cd minici
npm install
```

### Build
Build the index.html file
```
# Select the version to use
nvm ls
nvm use v4.4.3
gulp
```

### Run the tests
```
npm test
```
