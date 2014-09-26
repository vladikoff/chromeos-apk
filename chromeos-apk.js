var path = require('path');
var fs = require('fs');
var readline = require('readline');

var program = require('commander');
var ncp = require('ncp').ncp;
var chalk = require('chalk');
var rl = readline.createInterface(process.stdin, process.stdout);

var parseApk = require('./lib/parseApk');

function success(appPath) {
  console.log(chalk.green('Directory "', appPath, '" created. Copy that directory onto your Chromebook and use "Load unpacked extension" to load the application.'));
  process.exit(0);
}

module.exports = function () {

  program
    .version('3.0.0')
    .option('-t, --tablet', 'Create a tablet version')
    .option('-a, --archon', 'Make app compatible with the custom ARChon runtime.')
    .option('-k, --key <n>', 'Specify key to be used. Default: 1', parseInt)
    .option('-n, --name [value]', 'Extension display name')
    .usage('<path_to_apk_file ...>')
    .parse(process.argv);

  var apk = program.args[0];

  if (!apk) {
    throw new Error('Please provide a path to an APK file...');
  }

  parseApk(apk, function (err, data) {
    if (err) {
      console.log(chalk.yellow('Failed to load APK'));
    }

    var packageName = null;

    try {
      packageName = data.package;
    } catch (e) {
      console.log(chalk.yellow('Failed to parse package name in the APK.'));
    }

    if (!packageName) {
      console.log(chalk.yellow('Unknown APK package.'));
      console.log('Please enter the package name (i.e "com.skype.raider", if you get this wrong your app will NOT work): ');
      rl.prompt();
      rl.on('line', function (text) {
        text = text.trim();

        if (/\.apk$/.test(text)) {
          console.log(chalk.red('Package names do not end with .apk'));
          console.log('They usually look like com.application.developer or com.website.www');
          process.exit(0);
        } else if (text.indexOf(' ') !== -1) {
          console.log(chalk.red('Package names do not contain spaces'));
          console.log('They usually look like com.application.developer or com.website.www');
          process.exit(0);
        }
        else {
          createExtension(text);
        }
      })
      .on('close', function () {
        process.exit(0);
      });
    } else {
      createExtension(packageName);
    }

    function createExtension(packageName) {
      var templatePath = path.join(__dirname, '_template');
      var appPath = path.join(packageName + '.android');

      // TODO: refactor this if needed in the future
      ncp(templatePath, appPath, function (err) {
        if (err) {
          throw err;
        }

        fs.writeFileSync(path.join(appPath, 'vendor', 'chromium', 'crx', 'custom-android-release-1400197.apk'), fs.readFileSync(apk));

        var manifest = JSON.parse(fs.readFileSync(path.join(templatePath, 'manifest.json')));
        var messages = JSON.parse(fs.readFileSync(path.join(templatePath, '_locales', 'en', 'messages.json')));
        manifest.arc_metadata.name = packageName;
        manifest.arc_metadata.packageName = packageName;
        manifest.version = data.versionName;

        if (program.name) {
          messages.extName.message = program.name;
        } else {
          messages.extName.message = packageName;
        }

        if (program.tablet) {
          manifest.arc_metadata.formFactor = 'tablet';
          manifest.arc_metadata.orientation = 'landscape';
        }
				
        if (program.key) {
          switch (program.key) {
            case 2: 
              manifest.key = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArHskrdG5EmB5QnEBPXw3TuQ1eHtLF2U7tIywykq4Hh8JQkKsX1aNn6azroEtZ0EslCWlvTleP9rBazLDoGYkCktjc/NAXCdoX728k+H/nxulYAWRkxeZiSbuyGAwt6jA67mq/QYHvsTMuIss/nwhdPVTPRrSpXnrWdO3CMMNMZH49edcAfnvrV8qRhJy3h9B8Qak3KYI2P+F501lGc8P6Xf8zzevvcL+ynFj7UgpDVnwDYVbTrnroC1FOpV8oNfnf1nar0Ii2izgDXl4EUt6zfaxEwJtc8o6HDKtPj2VwILOuWphmuMWHKsC+icExHnIm/oF61FMzyARaoWH2PjpJQIDAQAB';
              break;
            case 3: 
              manifest.key = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAq/bF1OTNX8Sqz6ZlYlTJb3S/XRnIxM7Wab4vzSb1oQltJi/YMrcxyYvnQZJRYZDN7AoBBlwNG/dx2yrNdSaNFN1bT3AhzNGa3STOlESF6FktWCHiy3HMkiguALaGGx95PPxSWpBjClHGePbFILwKdWQ75p+j4SiBO1mlNoZgP/F1n+rUVYMOfHKPUbb5zFDH7LbHyZWSAHTJWIZKIcLOcubYq8ITJq5nBFxW7mV0hcLdhflLJCbO/9yemi4Rfs0do7yRyLXuSB1EisBHY00kquIyaVJwJIiBDIKGk3KFhetTX3C1JLWTIuGAmjAsf3LBu7AuflDdia5fOANgPAGnJwIDAQAB';
              break;
            case 4: 
              manifest.key = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAq0UR3Z9iOO5m0taozmsdFdz1oKUCO02VRAMV3ZRwbHdYpg/Mo/dAauTeprLhnGY9N6aCjmDXrPXRcvLc/l8iV+v8U/zi32hvzcXw9d5G5WpQjIhCmLInG5eHOQWGXRTCF1wlrHlv+n4A0ZVYXBJ8zwhLZMrfR3jHhMVpJQOodmU2l/SjIOISfMseNSvkqIibLdzzyuaANh6EfgBOqLzC4yEG9rksTOU3Kr/Pqd/pxA7c1USM4iAZ7lWp8Tnf7m4XOya3K+CrMR0QKvspAF2aknK7eDyLNtG9lTxCDA2T5MD1BkUeHDlmn5ryr2D7myeFTYQqYXAgFrEYh/YKyIe22QIDAQAB';
              break;
          }
        }

        if (program.archon) {
          try {
            delete manifest.key;
          } catch (e) {}
        }

        fs.writeFileSync(path.join(appPath, 'manifest.json'), JSON.stringify(manifest, null, 2));
        fs.writeFileSync(path.join(appPath, '_locales', 'en', 'messages.json'), JSON.stringify(messages, null, 2));

        // done.
        success(appPath);
      });
    }
  });

};
