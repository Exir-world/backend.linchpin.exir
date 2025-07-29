import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';
import { config } from 'dotenv';

config(); // Load .env

const serviceAccountPath = path.resolve(process.env.FIREBASE_ADMIN_SDK_PATH);

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

export default admin;
