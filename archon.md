# ARChon Custom Runtime Guide

> ARChon runtime lets you run unlimited number of Android APKs created with `chromeos-apk` across any desktop platform that supports Chrome.

![](http://v14d.com/g/WinApk.jpg)

## Instructions

Tested on OS X, Windows and Ubuntu. You must have Chrome 37+ installed. (If it doesn't work try Chrome Canary).

- Download the runtime: https://bitbucket.org/vladikoff/archon/get/v1.0.zip
- Load it as an unpacked extension.
<img src="http://v14d.com/g/chromeapks/howto.png" width="500px" />
- Create your APKs with the ARChon flag: `chromeos-apk com.imdb.mobile.apk --archon`.
This will create an app directory for you.
- Load as many APKs as you want as unpacked extensions on any platform of your choice.
- See [README.md](README.md) for more help with the `chromeos-apk` tool.

## Notes

### Convert older apps created with `chromeos-apk` tool to ARChon runtime.

- Remove the `"key"` parameter from `manifest.json`.
