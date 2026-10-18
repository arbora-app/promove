// Runs in CI after `cap add android`: version numbers, notification permission, and the small notification icon.
const fs = require("fs"), path = require("path");
const run = parseInt(process.env.GITHUB_RUN_NUMBER || "1", 10);

// 1. version: every build gets a higher versionCode, so a new APK installs over the old one
const gradle = "android/app/build.gradle";
let g = fs.readFileSync(gradle, "utf8");
g = g.replace(/versionCode\s+\d+/, "versionCode " + run).replace(/versionName\s+"[^"]*"/, 'versionName "1.0.' + run + '"');
fs.writeFileSync(gradle, g);

// 2. Android 13+ asks before an app may show notifications
const man = "android/app/src/main/AndroidManifest.xml";
let m = fs.readFileSync(man, "utf8");
for (const p of ["android.permission.POST_NOTIFICATIONS", "android.permission.RECEIVE_BOOT_COMPLETED"]) {
  if (!m.includes(p)) m = m.replace("</manifest>", '    <uses-permission android:name="' + p + '" />\n</manifest>');
}
fs.writeFileSync(man, m);

// 3. the small white icon in the status bar: three lines merging, like the logo
const dir = "android/app/src/main/res/drawable";
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, "ic_stat_promove.xml"),
`<vector xmlns:android="http://schemas.android.com/apk/res/android" android:width="24dp" android:height="24dp" android:viewportWidth="24" android:viewportHeight="24">
  <path android:fillColor="#00000000" android:strokeColor="#FFFFFFFF" android:strokeWidth="2" android:strokeLineCap="round" android:strokeLineJoin="round"
    android:pathData="M3,8.5h7c2,0 3,-3.5 6,-3.5h1.5a3.5,3.5 0 0,1 0,7H16M3,12h6.5M3,15.5h7c2,0 3,-3.5 6,-3.5M14,13v7"/>
</vector>
`);
console.log("patched: versionCode", run);
