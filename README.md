# Promove

Portfolio Momentum Management, as an Android app (built with Capacitor).

## Get the app
Open **Releases** on this repository from your phone and download the newest `Promove-1.0.N.apk`.
The first time, Android asks you to allow installing apps from your browser or file manager.
Each new build installs over the previous one and keeps your data.

## How it's built
Every push to `main` runs **Actions → Build Android app** on GitHub's servers:
`www/index.html` (the whole app) is wrapped by Capacitor, given its icon, and built into an APK.
No Android Studio is needed.

## What's here
- `www/index.html` — the app itself
- `assets/` — icon and splash images
- `capacitor.config.json` — app id, name and plugin settings
- `ci/` — build helpers (the debug signing key keeps updates installable)
- `.github/workflows/android.yml` — the build

## Before the Play Store
Builds are signed with a fixed *debug* key, which is fine for installing yourself.
The Play Store needs a private release key kept in this repository's secrets; add that step before publishing.
