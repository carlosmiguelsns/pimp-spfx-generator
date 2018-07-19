# Pimp SPFx Generator
### Generate a starter Yeoman template extending for SPFx

This sample generator performs the following actions:
* Apply custom config (replaces gulp file)
* Adds webpart bundles and strings location to the existing config file
* Adds webpart compiler options to the existing tsconfig file
* Copies webparts and tslint files to the new project's location
* Installs Angular Elements and PnP.js npm packages dependencies

## Installation

```sh
# Clone repository
git clone https://github.com/carlosmiguelsns/pimp-spfx-generator.git

# Switch to the repositories directory
cd pimp-spfx

# Create a global symlink to appear as a global npm package
npm link
```

The generator is not published on NPM. The only way to use and install it is through cloning the repository and link the local files in the global npm cache.
In general this generator should only be used to configure new projects after the configuration has once been provisioned `@microsoft/sharepoint` should be used.

## Usage

This generator is 100% based on @microsoft/generator-sharepoint and supports two different scenarios:

* SPFx Yeoman template pre-configured with sample web part illustrating how to use Angular Elements in the SharePoint Framework
* Optional installation of webparts (prompt interaction)
* Optional models, services and utils folders (with files) to include (prompt interaction)


The basic usage is to start a new project through:

```sh
yo pimpspfx
```


## Special thanks to:

* [Diogo Martins](https://github.com/d-martins)
* [Rodrigo Silva](https://github.com/RodCoder)
* [Waldek Mastykarz](https://github.com/waldekmastykarz) - [Hello World Angular Elements Web Part](https://github.com/SharePoint/sp-dev-fx-webparts/tree/master/samples/angularelements-helloworld)
