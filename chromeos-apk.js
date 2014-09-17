var path = require('path');
var fs = require('fs');

var program = require('commander');
var parseApk = require('apk-parser2');
var ncp = require('ncp').ncp;
var chalk = require('chalk');

function success(appPath) {
  console.log(chalk.green('Directory "', appPath, '" created. Copy that directory onto your Chromebook and use "Load unpacked extension" to load the application.'));
}

module.exports = function() {

  program
    .version('1.0.0')
    .option('-t, --tablet', 'Create a tablet version')
    .usage('<path_to_apk_file ...>')
    .parse(process.argv);

  var apk = program.args[0];

  if (!apk) {
    throw new Error('Please provide a path to an APK file...');
  }

  parseApk(apk, function (err, data) {
    if (err) {
      console.log('>> Failed to load APK');
      throw err;
    }

    var packageName = null;

    try {
      packageName = data.manifest[0]['@package'];
    } catch (e) {
      throw new Error('Failed to parse package name in the APK.');
    }

    if (!packageName) {
      throw new Error('Unknown APK package.');
    }

    var templatePath = path.join(__dirname, '_template');
    var appPath = path.join(packageName);

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
      messages.extName.message = packageName;

      if (program.tablet) {
        manifest.arc_metadata.formFactor = 'tablet';
        manifest.arc_metadata.orientation = 'landscape';
      }

      fs.writeFileSync(path.join(appPath, 'manifest.json'), JSON.stringify(manifest, null, 2));
      fs.writeFileSync(path.join(appPath, '_locales', 'en', 'messages.json'), JSON.stringify(messages, null, 2));

      // done.
      success(appPath);
    });
  });

};
