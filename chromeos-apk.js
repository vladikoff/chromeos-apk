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

module.exports = function (callback) {

  program
    .version('4.0.2')
    .option('-t, --tablet', 'Create a tablet version')
    .option('-s, --scale', 'Enable application window scaling')
    .option('-n, --ext-name [value]', 'Extension display name')
    .usage('<path_to_apk_file ...>')
    .parse(process.argv);

  var apk = program.args[0];
  callback = callback || success;

  if (!apk) {
    program.outputHelp();
    process.exit(0);
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
        manifest.version = '1337';

        if (program.extName && typeof program.name !== 'function') {
          messages.extName.message = program.extName;
        } else if (packageName) {
          messages.extName.message = packageName;
        } else {
          messages.extName.message = 'App';
        }

        if (program.tablet) {
          manifest.arc_metadata.formFactor = 'tablet';
          manifest.arc_metadata.orientation = 'landscape';
        }

        if (program.scale) {
          manifest.arc_metadata.resize = 'scale';
        }

        fs.writeFileSync(path.join(appPath, 'manifest.json'), JSON.stringify(manifest, null, 2));
        fs.writeFileSync(path.join(appPath, '_locales', 'en', 'messages.json'), JSON.stringify(messages, null, 2));

        // done.
        callback(appPath);
      });
    }
  });

};
