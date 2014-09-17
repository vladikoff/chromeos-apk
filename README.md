chromeos-apk
======================

> Run Android APKs on Chromebooks

<img src="http://v14d.com/g/chromeapks/1.png" width="300px" />
<img src="http://v14d.com/g/chromeapks/2.png" width="300px" />
<img src="http://v14d.com/g/chromeapks/3.png" width="300px" />
<img src="http://v14d.com/g/chromeapks/4.png" width="300px" />
<img src="http://v14d.com/g/chromeapks/5.png" width="300px" />
<img src="http://v14d.com/g/chromeapks/6.png" width="300px" />


### [Video Demo](https://www.youtube.com/watch?v=O-yFLqp_sXs)
## Setup
- Tested on OS X and Ubuntu. On Windows [convert manually](manually-convert.md).
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

If you get a Parse Error, then [convert the APK manually](manually-convert.md)

## Note

#### This is a proof of concept. Only one app at a time is possible right now, it by default replaces the Vine app.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

#### Tested Apps

- Flipboard - Works
- Twitter - Works in tablet and phone mode
- Soundcloud - Works, crashes when playing sound
- Chrome, Firefox, Opera, Spotify - Crashes (require native libraries)
- Opera Mini - works, issues with the back button
- [Gyro Game](https://play.google.com/store/apps/details?id=pl.submachine.gyro&hl=en) - Works
- Swing Copters - Crashes on Google Play Services
- WhatsApp - Crashes
- IMDB - Works
- Skype - Loads up, but cannot authenticate.
