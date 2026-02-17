const fs = require('node:fs');
const path = require('node:path');

const ANDROID_DEST = path.join(
  __dirname,
  '../../../apps/droid/android/app/google-services.json',
);
const IOS_DEST = path.join(
  __dirname,
  '../../../apps/droid/ios/App/App/GoogleService-Info.plist',
);

function restoreSecret(envVar, destPath) {
  if (!process.env[envVar]) {
    console.log(`[INFO] ${envVar} not found. Skipping restore.`);
    return;
  }

  try {
    const content = Buffer.from(process.env[envVar], 'base64').toString('utf8');
    fs.writeFileSync(destPath, content);
    console.log(`[SUCCESS] Restored ${destPath}`);
  } catch (error) {
    console.error(`[ERROR] Failed to restore ${destPath}:`);
    if (error?.constructor?.name === 'TypeError') {
      console.error('  Likely invalid Base64 string in env var.');
    } else {
      const errorType =
        error?.constructor && typeof error.constructor.name === 'string'
          ? error.constructor.name
          : 'UnknownError';
      console.error(`  ${errorType}: ${error.message}`);
    }
    // Don't exit process, just log error so build can continue if this is optional
  }
}

// Execute
restoreSecret('ANDROID_GOOGLE_SERVICES_BASE64', ANDROID_DEST);
restoreSecret('IOS_GOOGLE_SERVICE_INFO_BASE64', IOS_DEST);
