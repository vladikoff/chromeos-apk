# Running Multiple Apps
<img src="http://v14d.com/g/chromeapks/multiple.png" width="450px" />

***** 

~~Currently you can load up to 4 of your favorite Android applications with the official ARC runtime.~~
~~By default the `chromeos-apk` tool replaces the Vine application and everytime you load a different app it replaces it. However you can load 3 more apps by replacing Evernote and other apps. For each extra app adjust the `"key"` value in the `manifest.json` file of that app, then use `"Load unpacked extension..."`.~~

**Chrome OS:** With Chrome 38+ you can now side load as many applications as you want. If you have older apps that
were created using `chromeos-apk` tool then re-convert them or remove the `"key"` option from `manifest.json`.

**Windows, Linux and OS X:** To load unlimited number of apps on you need a custom runtime, see the [ARChon runtime guide](archon.md) for details.
