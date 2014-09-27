# ARChon Custom Runtime Guide

> ARChon runtime lets you run unlimited number of Android APKs created with `chromeos-apk` on Chrome OS and across any desktop platform that supports Chrome.

<img src="http://v14d.com/g/WinApk.jpg" width="350px" />
<img src="http://v14d.com/g/multiple.png" width="350px" />

## Instructions

**Note: This can be unstable on operating systems other than Chrome OS.**

**Warning: The custom runtime will replace the official runtime component. To go back to the official runtime you will need to uninstall the custom one and reinstall the official one.**

Tested on OS X, Windows 64-bit and Ubuntu. You must have Chrome 37+ installed. (If it doesn't work try Chrome Canary).

- Download the runtime that is appropriate for your system: 

| Runtime  | Download |
|---|---|
| ARChon 1.0 - Intel x86 64-bit | [BitBucket](https://bitbucket.org/vladikoff/archon/get/v1.0.zip) MD5:3bd2e6014a0cba0b1ee3c69462a9b46d |
| ARChon 1.1 - Intel x86 **Chrome 64-bit / Chrome OS 64-bit** (OSX: Use this in Chrome Canary)  | [BitBucket](https://bitbucket.org/vladikoff/archon/get/v1.1-x86_64.zip) :: [GitHub](https://github.com/vladikoff/chromeos-apk/releases/download/v3.0.0/ARChon-v1.1-x86_64.zip)   MD5:d409801cac97cdff9ea6aad468ddc927 |
| ARChon 1.1 - Intel x86 **Chrome 32-bit / Chrome OS 32-bit** (OSX: Use this in Chrome Stable)   | [BitBucket](https://bitbucket.org/vladikoff/archon/get/v1.1-x86_32.zip) :: [GitHub](https://github.com/vladikoff/chromeos-apk/releases/download/v3.0.0/ARChon-v1.1-x86_32.zip)   MD5:873c4d116eabd1a5ebedec65d11d6d8a |
| ARChon 1.1 - ARM (i.e ARM-based Chromebooks)  | [BitBucket](https://bitbucket.org/vladikoff/archon/get/v1.1-ARM.zip) :: [GitHub](https://github.com/vladikoff/chromeos-apk/releases/download/v3.0.0/ARChon-v1.1-ARM.zip) MD5:d0a69d822399545ff67292b50f8c4047   |


- Unzip it, Load it as an unpacked extension.

<img src="http://v14d.com/g/chromeapks/howto.png" width="500px" />
- (Try out this pre-packaged open source game: [2048-ARChon.APK](https://github.com/vladikoff/chromeos-apk/releases/download/v1.1.0/com.uberspot.a2048.android-ARChon-runtime.zip) by [Uberspot](https://github.com/uberspot/2048-android) and load it as an unpacked extension. Press "Launch", ignore warnings.)
- To load custom applications, make sure you have `chromeos-apk@2.0.0` or higher. (Update using `npm install -g chromeos-apk@latest`). See [README.md](README.md) for more help with the `chromeos-apk` tool.
- Create your custom APKs with the ARChon flag: `chromeos-apk com.imdb.mobile.apk --archon`.
This will create an app directory for you.
- Load as many APKs as you want as unpacked extensions on any platform of your choice.


## Notes

### Google Play Services

- See https://github.com/vladikoff/chromeos-apk/issues/66

### Load additional files 

- Put any additional files into `/vendor/chromium/crx/`, those would be accessible within the app environment
- OBB files, one way: enable the `enableAdb` flag in `manifest.json`,  `adb push /<package>/<some.obb> /storage/sdcard/Android/obb/<package>/<some.obb>`

### Convert older apps created with `chromeos-apk` tool to ARChon runtime.

- Remove the `"key"` parameter from `manifest.json`.

### Uninstalling ARChon

- Remove the component and all applications that depend on it from `chrome://extensions` using the "Remove" button. 
- Chrome OS: Reinstall an app such as Evernote to get the official runtime.

### ARChon source

ARChon source is hosted here: https://bitbucket.org/vladikoff/archon/src. It's on BitBucket because GitHub has a 100mb file limit. Feel free to hack on ARChon and tweak it. 

### Changing app resolution

Tweak the runtime in 2 places: You need to change the tablet resolution values in these 2 places: https://bitbucket.org/vladikoff/archon/src/master/gen_main.min.js and
https://bitbucket.org/vladikoff/archon/src/master/gen_index.min.js

Find `tablet: {"long": 1280, "short": 800}`, tweak it, fit your resolution, reload the run time. 

### Tweak Apps

Add `"resize": "scale"` to `"arc_metadata"` in `manifest.json`.

Read [the manifest guide](manifest.md) for more advanced tweaks.

### Windows 32-bit NACL issues

There is a bug in Windows NACL that prevents applications from running (Issue [#38](https://github.com/vladikoff/chromeos-apk/issues/38)). You need to patch `runnable-ld.so-bk` using a Python script:
```
import os
filename = 'runnable-ld.so-bk'
size = os.stat(filename).st_size
fh = open(filename, 'r+b')
fh.truncate((size + 0xffff) & ~0xffff)
fh.close()
exit()
```
