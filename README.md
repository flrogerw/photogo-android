## SETUP: ##

cordova create photogo com.photogo.mobile photoandgo

cd .\photoandgo

cordova platforms add android

cordova plugin add cordova-plugin-device

cordova plugin add cordova-plugin-console

cordova plugin add cordova-plugin-dialogs

cordova plugin add cordova-plugin-media

cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-file.git

cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-
file-transfer.git

cordova plugin add com.ionic.keyboard

cordova plugin add cordova-plugin-inappbrowser

cordova plugin add https://github.com/Wizcorp/phonegap-facebook-plugin.git --variable APP_ID=535521996587090 --variable APP_NAME=Photo&Go

cordova plugin add https://github.com/wymsee/cordova-imagePicker.git 

cordova plugin add cordova-plugin-screen-orientation

cordova plugin add cordova-instagram-plugin

cordova plugin add https://github.com/bez4pieci/Phonegap-Cookies-Plugin.git

## SUBMISSION ##
:: CREATE RELEASE VERSION ::
cordova build android --release

:: CREATE OUTSIDE OF APP DIRECTORY ::
keytool -genkey -v -keystore photogo.keystore -alias photogo -keyalg RSA -keysize 2048 -validity 10000

:: PUT IN platforms/android/ant.properties ::
key.store=[ PATH TO KEYSTORE FILE ]
key.alias=photogo

:: MOVE THE *-release-unsigned.apk TO THE KEYSTORE DIRECTORY YOU CREATED ABOVE ::
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore photogo.keystore android-release-unsigned.apk photogo

:: COPY zipalign.exe INTO KEYSTORE DIRECTORY ::
zipalign -v 4 android-release-unsigned.apk GoPrints.apk