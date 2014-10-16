var ApkReader = require('adbkit-apkreader');

module.exports = function parseApk(apk, cb) {
  try {
    var reader = ApkReader.readFile(apk);
    var manifest = reader.readManifestSync();

    cb(null, manifest);
  } catch (e) {
    cb(e);
  }
};
