# ARChon Custom Runtime Guide

> ARChon runtime lets you run unlimited number of Android APKs created with `chromeos-apk` on Chrome OS and across any desktop platform that supports Chrome.

<img src="http://v14d.com/g/WinApk.jpg" width="350px" />
<img src="http://v14d.com/g/multiple.png" width="350px" />

## Instructions

**Note: This can be unstable on operating systems other than Chrome OS**

**Warning: The custom runtime will replace the official runtime component. To go back to the official runtime you will need to uninstall the custom one and reinstall the official one.**

Tested on OS X, Windows and Ubuntu. You must have Chrome 37+ installed. (If it doesn't work try Chrome Canary).

- Make sure you have `chromeos-apk@2.0.0` or higher. (Update using `npm install -g chromeos-apk@latest`). See [README.md](README.md) for more help with the `chromeos-apk` tool.
- Download the runtime: https://bitbucket.org/vladikoff/archon/get/v1.0.zip
- Load it as an unpacked extension.

<img src="http://v14d.com/g/chromeapks/howto.png" width="500px" />
- Create your APKs with the ARChon flag: `chromeos-apk com.imdb.mobile.apk --archon`.
This will create an app directory for you.
- Load as many APKs as you want as unpacked extensions on any platform of your choice.

## Notes

### Convert older apps created with `chromeos-apk` tool to ARChon runtime.

- Remove the `"key"` parameter from `manifest.json`.
