# PushNotification — Firebase Cloud Messaging (React Native)

A React Native app demonstrating Firebase Push Notifications (FCM) on Android, covering setup, permissions, and notification handling across all app states.

## Versions

| Package | Version |
|---|---|
| `react-native` | `0.84.1` |
| `react` | `19.2.3` |
| `@react-native-firebase/app` | `^23.8.8` |
| `@react-native-firebase/messaging` | `^23.8.8` |
| Node | `>= 22.11.0` |
| Yarn | `3.6.4` |

> Both `@react-native-firebase/*` packages must share the same major version to avoid build failures.

## Setup

### 1. Install Dependencies

```bash
yarn install
```

### 2. Firebase Console

- Create a project at [Firebase Console](https://console.firebase.google.com/)
- Add an Android app — the **package name** must match `applicationId` in `android/app/build.gradle` (e.g., `com.pushnotification`)
- Download `google-services.json` → place in `android/app/`

### 3. Android Native Config (already applied)

- **`android/build.gradle`** — `classpath("com.google.gms:google-services:4.4.2")`
- **`android/app/build.gradle`** — `apply plugin: "com.google.gms.google-services"`
- **`AndroidManifest.xml`** — `POST_NOTIFICATIONS` permission (required for Android 13+ / API 33+)

## Running the App

```bash
# Start Metro bundler
yarn start

# Run on Android (separate terminal)
yarn android
```

> Ensure the [React Native environment](https://reactnative.dev/docs/set-up-your-environment) is set up before running.

## How It Works

### Permissions

Two permission layers are required on Android 13+:
- `PermissionsAndroid.request(POST_NOTIFICATIONS)` — native Android dialog
- `messaging().requestPermission()` — Firebase internal authorization

### FCM Token

`messaging().getToken()` returns the device token. Send this to your backend for targeted push delivery.

### Notification Handling by App State

| State | Handler | Behavior |
|---|---|---|
| **Foreground** | `messaging().onMessage()` | Payload delivered to JS — no system notification shown. Display manually via `Alert`, toast, etc. |
| **Background** | `messaging().setBackgroundMessageHandler()` | System shows notification automatically. Register handler in `index.js` before `AppRegistry.registerComponent()`. |
| **Killed** | `messaging().getInitialNotification()` | Called when user taps a notification to open a terminated app. Useful for deep linking. |

## Common Issues

| Issue | Fix |
|---|---|
| No notifications received | Verify `google-services.json` placement and `package_name`. Check plugin is applied. |
| Foreground not showing | Expected — `onMessage()` gives payload only. Display manually. |
| Permission dialog missing (API 33+) | Need both `AndroidManifest.xml` declaration AND runtime `PermissionsAndroid.request()`. |
| Token is null | Firebase didn't initialize. Check `@react-native-firebase/app` and plugin setup. |
| Build failures | SDK version mismatch. Use `compileSdkVersion` 33+. Clean with `cd android && ./gradlew clean`. |

## References

- [React Native Firebase — Messaging](https://rnfirebase.io/messaging/usage)
- [Firebase Console](https://console.firebase.google.com/)
- [React Native Docs](https://reactnative.dev/docs/getting-started)
