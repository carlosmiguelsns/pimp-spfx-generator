"use strict";

// base generator scaffolding
const Generator = require('yeoman-generator');
// import command exists to check if yarn is installed
const commandExists = require('command-exists').sync;
// avoid conflict message
const fs = require('fs');

module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts)
    }

    // Initialisation Generator + SPFx Generator
    initializing(){
        // Yeoman composability
        this.composeWith(
            require.resolve(`@microsoft/generator-sharepoint/lib/generators/app`), {
                //'skip-install': true,
                'framework': 'none'
            }
        );
    }

    // Prompt for user inpput Custom Generator
    prompting(){
        const prompts = [
            {
                type: 'confirm',
                name: 'webparts',
                message: 'Would you like to install the Hello World Angular web part?'
            },
            {
                type: 'confirm',
                name: 'assets',
                message: 'Would you like to include the External Services?'
            },
        ];

        return this.prompt(prompts).then(answers => {
            this.webparts = answers.webparts;
        });
    }

    // adds additional editor support
    configuring(){ }

    // not used because if the dependencies of the SPFx file
    // Code was moved to Install
    writing(){ }

    install() {
        // Apply Custom configuration (gulp files)
        this._applyCustomConfig();

        // Modify file
        this._editExistingFiles();

        // Copy utils, services, tslint, etc...
        this._copyFiles();

        // Install aditional NPM Packages
        this._installNPMPackages();

        // Process Install
        this._processInstall();
    }

    // Run installer normally time to say goodbye
    //If Yarn is installed Yarn will be used
    end() { }


    // Implement Logic

    // Applies gulp additional config to project
    _applyCustomConfig() {
        // backup default gulp file;
        fs.renameSync(
            this.destinationPath('gulpfile.js'),
            this.destinationPath('gulpfile.backup.js')
        );

        this.fs.copy(
            this.templatePath('gulpfile.js'),
            this.destinationPath('gulpfile.js')
        );
    }

    // Edit config.json and other necessary files
    _editExistingFiles() {
        //In case the user has chosen to install webparts
        if(this.webparts){
            //config.json && tsconfig.json
            let config = this.fs.readJSON(this.destinationPath('config/config.json'));
            let tsconfig = this.fs.readJSON(this.destinationPath('tsconfig.json'));

            // Add bundle entries
            config.bundles["angular-web-parts"] = {
                "components": [
                    {
                        "entrypoint": "./lib/webparts/helloAngular/HelloAngularWebPart.js",
                        "manifest": "./src/webparts/helloAngular/HelloAngularWebPart.manifest.json"
                    }
                ]
            }

            // Add ControlStrings
            config.localizedResources.HelloAngularWebPartStrings = "lib/webparts/helloAngular/loc/{locale}.js";

            // Add entries to tsconfig
            tsconfig.compilerOptions["module"] = "commonjs";
            tsconfig.compilerOptions["emitDecoratorMetadata"] = true;

            // writing json
            fs.writeFileSync(
                this.destinationPath('config/config.json'),
                JSON.stringify(config, null, 2)
            );

            fs.writeFileSync(
                this.destinationPath('tsconfig.json'),
                JSON.stringify(tsconfig, null, 2)
            );
        }
    }

    // Adds the base files
    _copyFiles() {
        // TS Lint
        this.fs.copy(
            this.templatePath('tslint.json'),
            this.destinationPath('tslint.json')
        );

        // Angular
        // In case the user has chosen to install webparts
        if(this.webparts) {
            this.fs.copy(
                this.templatePath('src/webparts/'),
                this.destinationPath('src/webparts/')
            );
        }

        // Include MyAssets
        if(this.assets) {
            // Models
            this.fs.copy(
                this.templatePath('src/models/'),
                this.destinationPath('src/models/')
            )

            // Services
            this.fs.copy(
                this.templatePath('src/services/'),
                this.destinationPath('src/services/')
            )

            // Utils
            this.fs.copy(
                this.templatePath('src/utils/'),
                this.destinationPath('src/utils/')
            )
        }
    }

    // install additional NPM packages for PnP.js,
    // reusable controls and property controls
    _installNPMPackages() {
        var done = this.async();

        // Angular
        this.npmInstall(['install',
            '@angular/common'
        ], [
            '--save'
        ]);

        this.npmInstall(['install',
            '@angular/compiler'
        ], [
            '--save'
        ]);

        this.npmInstall(['install',
            '@angular/core'
        ], [
            '--save'
        ]);

        this.npmInstall(['install',
            '@angular/elements'
        ], [
            '--save'
        ]);

        this.npmInstall(['install',
            '@angular/platform-browser'
        ], [
            '--save'
        ]);

        this.npmInstall(['install',
            '@angular/platform-browser-dynamic'
        ], [
            '--save'
        ]);


        // PnP.js (SP only)
        this.npmInstall(['install',
            '@pnp/logging'
        ], [
            '--save'
        ]);

        this.npmInstall(['install',
            '@pnp/common'
        ], [
            '--save'
        ]);

        this.npmInstall(['install',
            '@pnp/odata'
        ], [
            '--save'
        ]);

        this.npmInstall(['install',
            '@pnp/sp'
        ], [
            '--save'
        ]);

        this.npmInstall(['install',
            '@pnp/graph'
        ], [
            '--save'
        ]);


        // Other
        this.npmInstall(['install',
            '@microsoft/generator-sharepoint'
        ], [
            '--save'
        ]);

        this.npmInstall(['install',
            '@webcomponents/custom-elements'
        ], [
            '--save'
        ]);

        this.npmInstall(['install',
            'core-js'
        ], [
            '--save'
        ]);

        this.npmInstall(['install',
            'rxjs'
        ], [
            '--save'
        ]);

        this.npmInstall(['install',
            'zone.js'
        ], [
            '--save'
        ]);

        this.npmInstall(['install',
            'uglifyjs-webpack-plugin'
        ], [
            '--save'
        ]);

        this.npmInstall(['install',
            'webpack-bundle-analyzer'
        ], [
            '--save'
        ]);


        done();
    }


    _processInstall() {
        console.log('Process Install');

        const hasYarm = commandExists('yarn');

        this.installDependencies({
            npm: !hasYarn,
            bower: false,
            yarn: hasYarn,
            skipMessage: this.options['skip-install-message'],
            skipInstall: this.options['skip-install']
        })
    }

}