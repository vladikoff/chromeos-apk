# Instructions to convert APKs manually
> Use this if the command line tool (`chromeos-apk`) fails to parse work for you. 

*****


- Get the APK that you want to convert. Find the package name of the APK (i.e `com.soundcloud.android`, you can easily find it by looking at the URL in the Play Store). This process will not work without the proper package name.
- Make a copy of the [_template](https://github.com/vladikoff/chromeos-apk/tree/master/_template) directory. Name the **new directory** `com.soundcloud.android` for instance.
- Using the new directory, put the APK file into the `crx` directory, like so: [com.soundcloud.android/vendor/chromium/crx](https://github.com/vladikoff/chromeos-apk/tree/master/_template/vendor/chromium/crx)
- Update the [manifest.json](https://github.com/vladikoff/chromeos-apk/blob/master/_template/manifest.json#L8) file to suite your APK file. You can also change other stuff, such as `formFactor`: (`phone` or `tablet`), `orientation`: (`landscape` or `portrait`) for tablet apps. Note: some apps may crash with `tablet` or `portrait` settings.  
- Now you can load the new directory and it as an unpacked extension in Chrome Extensions.

## For ARChon runtime

- Remove the `"key"` parameter from `manifest.json`.
