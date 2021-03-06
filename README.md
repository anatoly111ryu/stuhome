[<img width="200" alt="new_logo" src="https://user-images.githubusercontent.com/7512625/34460783-aaf95076-ee53-11e7-8699-3e94b6a0c270.png">](https://user-images.githubusercontent.com/7512625/34460783-aaf95076-ee53-11e7-8699-3e94b6a0c270.png)

[![React Native](https://img.shields.io/badge/react--native-v0.42.2-05A5D1.svg)](https://facebook.github.io/react-native)
[![GitHub issues](https://img.shields.io/github/issues/just4fun/stuhome.svg)](https://github.com/just4fun/stuhome/issues)
[![MIT](https://img.shields.io/dub/l/vibe-d.svg)](http://opensource.org/licenses/MIT)

An iOS client for http://bbs.uestc.edu.cn/ written in [React Native](https://facebook.github.io/react-native/) with [Redux](http://redux.js.org/). APIs are provided by [UESTC-BBS](https://github.com/UESTC-BBS/API-Docs/wiki/Mobcent-API).

## Old logo (from v1.0.0 to v1.3.0)

![app_icon](https://cloud.githubusercontent.com/assets/7512625/18613513/348f7322-7daf-11e6-902d-94776bb55670.jpg)

## Status (v1.4.0)

[<img width="250" alt="download_on_the_app_store" src="https://user-images.githubusercontent.com/7512625/27969868-353f554c-637f-11e7-869d-3963933461ca.png">](https://itunes.apple.com/cn/app/qing-shui-he-pan-stuhome/id1190564355)

![](https://cloud.githubusercontent.com/assets/7512625/12371330/88981098-bc6a-11e5-8511-6e02c5233006.gif)

## Screenshot

![](https://user-images.githubusercontent.com/7512625/29569829-4596c76e-8787-11e7-98d8-9bf904a052f0.gif)

## Existing functionalities

- [x] Authentication
  - [x] Sign up (Webview)
  - [x] Sign in
  - [x] Sign out
- [x] Forum
  - [x] View forums
  - [x] View sub forums
  - [x] View topics in each forum
- [ ] Topic
  - [x] View latest topics
  - [x] View hot topics
  - [x] View topic detail and comments
  - [ ] View specific comments (only from author, descending order, etc)
  - [x] Publish topic
  - [ ] Edit published topic
  - [x] Reply topic
  - [x] Reply comment
  - [x] Favor topic
  - [x] Upload images
  - [ ] Meme
  - [ ] Report objectionable content
- [ ] Vote
  - [ ] Create vote
  - [x] Join in vote
  - [x] View vote results
- [x] Search
- [x] Notifications
  - [x] View list mentioned(@) me
  - [x] View list replied me
  - [x] View private messages
  - [x] Notification alert
- [ ] Individual
  - [x] View my recent topics
  - [x] View my favorite topics
  - [ ] Update password
  - [x] Upload avatar

## Try it out

#### Run in simulator

```bash
git clone git@github.com:just4fun/stuhome.git
cd stuhome
npm install
```
Then use Xcode to open this project and simply click **Run**.

#### Run on your iOS device

http://facebook.github.io/react-native/docs/running-on-device.html#running-your-app-on-ios-devices

## Run ESlint

```bash
npm run eslint
```

## Todo list

- ~~Update UI per new design~~
- ~~Submit to [App Store](https://itunes.apple.com/cn/app/qing-shui-he-pan-stuhome/id1190564355)~~
- ~~Replace [redux-thunk](https://github.com/gaearon/redux-thunk) with [redux-saga](https://github.com/redux-saga/redux-saga)~~ ([#7](https://github.com/just4fun/stuhome/pull/7))
- ~~Unit Testing Infrastructure~~ ([#8](https://github.com/just4fun/stuhome/pull/8))
- Replace deprecated Navigator with [React Navigation](https://github.com/react-navigation/react-navigation)

## Known issues

- ~~User avatar is not displayed sometimes: [RN/issue](https://github.com/facebook/react-native/issues/5616)~~ (Fixed by this [PR](https://github.com/facebook/react-native/pull/7262) for React Native, and the patch is released in `0.26.0`)
- ~~Switching between pages is not very smooth sometimes~~

## License

[The MIT License](http://opensource.org/licenses/MIT)
