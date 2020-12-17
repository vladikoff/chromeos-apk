chromeos-apk
======================

> Run Android APKs on Chrome OS, OS X, Linux and Windows.

<img src="http://v14d.com/g/chromeapks/1.png" width="250px" />
<img src="http://v14d.com/g/chromeapks/2.png" width="250px" />
<img src="http://v14d.com/g/chromeapks/3.png" width="250px" />
<img src="http://v14d.com/g/chromeapks/4.png" width="250px" />
<img src="http://v14d.com/g/chromeapks/5.png" width="250px" />
<img src="http://v14d.com/g/chromeapks/6.png" width="250px" />
<img src="http://v14d.com/g/chromeapks/7.png" height="160px" />

### Now supports OS X, Linux and Windows

<img src="http://v14d.com/g/multiple.png" width="250px" />
<img src="http://v14d.com/g/WinApk.jpg" width="250px" />

>See the [Custom ARChon runtime guide](archon.md) to run apps on other operating systems besides Chrome OS.


### [Video Demo](https://www.youtube.com/watch?v=O-yFLqp_sXs)

## Quick Demo for Chrome OS
- Download an official app, [such as Evernote](https://chrome.google.com/webstore/detail/evernote/dhfolfjkgpeaojbiicgheljefkfbbfkc), from the Chrome Web Store.
- Then download this open source game: [2048.APK Game](https://github.com/vladikoff/chromeos-apk/releases/download/v1.1.0/com.uberspot.a2048.android-OFFICIAL.zip) by [Uberspot](https://github.com/uberspot/2048-android) and load it as an unpacked extension. Go to chrome://apps and launch it there, ignore warnings.

## Setup for Chrome OS / App Conversion
> Conversion Tool Tested on OS X, Windows and Ubuntu. You can also [convert APKs manually](manually-convert.md).

- Install [a sample Android app from the Chrome Store](https://chrome.google.com/webstore/detail/kids-sight-words/inpoiemibmljfjmjmlokfdllnkjejhai) to get the runtime. Test out that app, make sure it runs on your hardware.
- (Ubuntu might need `sudo apt-get install lib32stdc++6`)
- Install Node.js (via http://nodejs.org/)
- Install the tool (might need a `sudo` prefix):
```
npm install chromeos-apk -g
```
or

```
sudo npm install chromeos-apk -g
```

## Usage

Run
`chromeos-apk [path to apk file]`

### Example phone app

```
chromeos-apk com.soundcloud.android.apk
```

#### Example tablet app

```
chromeos-apk com.soundcloud.android.apk --tablet
```

This will generate a directory for you, i.e `com.soundcloud.android`. Copy this directory to your Chromebook.
On your Chromebook go to `chrome://extensions`, enable "Developer mode", and load the directory using the "Load unpacked extension" button.
<img src="http://v14d.com/g/chromeapks/howto.png" width="500px" />

## Troubleshooting

Make sure Android applications are compatible with your Chromebook, first try to install an official application such as Vine:
https://chrome.google.com/webstore/detail/vine/plfjlfohfjjpmmifkbcmalnmcebkklkh

If you get a `Failed to parse package name in the APK.` error, then you will have to type it the proper package name for the application. You can find out the package name by looking at the URL of the app in the Play Store.

## Note

**Chrome OS:** With Chrome 38+ you can now side load as many applications as you want. If you have older apps that
were created using `chromeos-apk` tool then re-convert them or remove the `"key"` option from `manifest.json`.

**Windows, Linux and OS X:** To load unlimited number of apps on you need a custom runtime, see the [ARChon runtime guide](archon.md) for details.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Tested Apps

Read [the manifest guide](manifest.md) to tweak applications. Android `Menu` key is accessible using `ctrl` + `ESC`.

- Flipboard, Flixster, Twitter - Works.
- Pandora - Works [[Screenshot](http://i.imgur.com/0d8XvXr.png)]
- Yahoo Screens, Weather and Mail work in Phone mode (might need to remove `gcm` from `usePlayServices` in `manifest.json`). 
- Soundcloud - Works, crashes when playing sound.
- Chrome, Firefox, Opera, Spotify - Crashes (require native libraries).
- Opera Mini - Works, issues with the back button.
- [Gyro Game](https://play.google.com/store/apps/details?id=pl.submachine.gyro&hl=en) - Works
- [Break Bricks Game](https://play.google.com/store/apps/details?id=com.tongwei.blockbreaker) - Works 
- Swing Copters - Crashes on Google Play Services.
- WhatsApp - Crashes
- IMDB - Works
- Skype `com.skype.raider` - Works, requires you to enter the package name manually in the CLI, use `com.skype.raider`. Use an older version of APK 5.0.0.x to get this to work.
- XBMC - Crash after initial load.
- Microsoft Remote Desktop - App seems to work properly after crashing once.  


### Author

| [![twitter/vladikoff](https://avatars3.githubusercontent.com/u/128755?s=70)](https://twitter.com/vladikoff "Follow @vladikoff on Twitter") |
|---|
| [@vladikoff](https://twitter.com/vladikoff) |
