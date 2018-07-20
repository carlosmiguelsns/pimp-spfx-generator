# Pimp SPFx Generator
### Generate a starter Yeoman template extending for SPFx

This sample generator performs the following actions:
* Apply custom config (replaces and backup the original gulp file)
* Adds webpart bundles and strings location to the existing config file
* Adds webpart compiler options to the existing tsconfig file
* Copies webparts, assets and tslint files to the new project's location
* Installs Angular Elements and PnP.js npm packages dependencies

## Requirements:
* Yeoman globaly installed - [Official documentation](http://yeoman.io/learning/)

## Installation process:

```sh
# Clone repository
git clone https://github.com/carlosmiguelsns/pimp-spfx-generator.git

# Switch to the repositories directory
cd pimp-spfx-generator

# Install generator dependencies (optional - this will be automatically performed on the npm link command)
npm install

# Create a global symlink to the global folder
npm link
```

The only way to use and install this generator is through cloning url repository and link the local files in the global npm cache.
In general this generator should only be used to configure new projects after the configuration has once been provisioned `@microsoft/sharepoint` should be used.

## Usage:

This SPFx Yeoman template is 100% based on @microsoft/generator-sharepoint and adds:
* Optional sample HelloWorld Web Part using Angular Elements Framework (prompt interaction)
* Optional models, services and utils folders (with files) to include (prompt interaction)


The basic usage is to start a new project through:

```sh
yo pimpspfx
```

## Troubleshooting
If it looks like the generator is going into an infinite loop, repeating the same questions over and over, try to re-install the spfx generator:
```sh
npm rm --global @microsoft/generator-sharepoint
npm install --global @microsoft/generator-sharepoint
```


## Special thanks to:

* [Diogo Martins](https://github.com/d-martins)
* [Rodrigo Silva](https://github.com/RodCoder)
* [Waldek Mastykarz](https://github.com/waldekmastykarz) - [Hello World Angular Elements Web Part](https://github.com/SharePoint/sp-dev-fx-webparts/tree/master/samples/angularelements-helloworld)
