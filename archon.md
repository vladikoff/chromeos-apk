# ARChon Custom Runtime Guide

> ARChon runtime lets you run unlimited number of Android APKs created with `chromeos-apk` on Chrome OS and across any desktop platform that supports Chrome.

<img src="http://v14d.com/g/WinApk.jpg" width="350px" />
<img src="http://v14d.com/g/multiple.png" width="350px" />

## Instructions

**Note: This can be unstable on operating systems other than Chrome OS**

**Warning: The custom runtime will replace the official runtime component. To go back to the official runtime you will need to uninstall the custom one and reinstall the official one.**

Tested on OS X, Windows and Ubuntu. You must have Chrome 37+ installed. (If it doesn't work try Chrome Canary).
[OS X Note](http://www.reddit.com/r/Android/comments/2gv035/you_can_now_run_android_apps_on_chrome_for/ckmwy13): Grab the latest version of Chrome Canary, Chrome won't work because 64 bit is required by the custom runtime.

- Make sure you have `chromeos-apk@2.0.0` or higher. (Update using `npm install -g chromeos-apk@latest`). See [README.md](README.md) for more help with the `chromeos-apk` tool.
- Download the runtime: https://bitbucket.org/vladikoff/archon/get/v1.0.zip
- Load it as an unpacked extension.

<img src="http://v14d.com/g/chromeapks/howto.png" width="500px" />
- (Try out this pre-packaged open source game: [2048-ARChon.APK](https://github.com/vladikoff/chromeos-apk/releases/download/v1.1.0/com.uberspot.a2048.android-ARChon-runtime.zip) by [Uberspot](https://github.com/uberspot/2048-android) and load it as an unpacked extension. Press "Launch", ignore warnings.)
- Create your custom APKs with the ARChon flag: `chromeos-apk com.imdb.mobile.apk --archon`.
This will create an app directory for you.
- Load as many APKs as you want as unpacked extensions on any platform of your choice.


## Notes

### Convert older apps created with `chromeos-apk` tool to ARChon runtime.

- Remove the `"key"` parameter from `manifest.json`.

### Uninstalling ARChon

- Remove the component from `chrome://extensions`. Reinstall an app such as Evernote to get the official runtime on Chrome OS.

### ARChon source

ARChon source is hosted here: https://bitbucket.org/vladikoff/archon/src. It's on BitBucket because GitHub has a 100mb file limit. Feel free to hack on ARChon and tweak it. 

### Changing app resolution

Tweak the runtime in 2 places: You need to change the tablet resolution values in these 2 places: https://bitbucket.org/vladikoff/archon/src/master/gen_main.min.js and
https://bitbucket.org/vladikoff/archon/src/master/gen_index.min.js

Find `tablet: {"long": 1280, "short": 800}`, tweak it, fit your resolution, reload the run time. 

### Scale Apps

Add `"resize": "scale"` to `"arc_metadata"` in `manifest.json`.

