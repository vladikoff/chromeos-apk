chromeos-apk
======================

Run Android APKs on Chromebooks

## Install

- Install Node.js ( via http://nodejs.org/)
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

### Example:

```
chromeos-apk com.soundcloud.android.apk
```

#### For tablet apps

```
chromeos-apk com.soundcloud.android.apk --tablet
```

This will generate a directory for you, i.e `com.soundcloud.android`. Copy this directory to your Chromebook.
On your Chromebook go to `chrome://extensions`, enable "Developer mode", and load the directory using the "Load unpacked extension" button.

## Troubleshooting

Make sure Android applications are compatible with your Chromebook, first try to install an official application such as Vine:
https://chrome.google.com/webstore/detail/vine/plfjlfohfjjpmmifkbcmalnmcebkklkh

## Note

#### This is a proof of concept. Only one app at a time is possible right now, it by default replaces the Vine app.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

