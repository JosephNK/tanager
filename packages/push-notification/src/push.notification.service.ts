import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { PUSH_NOTIFICATION_CONFIG_OPTIONS } from './push.notification.constants';
import { PushNotificationOptions } from './push.notification.options';
import { readFile } from 'fs/promises';
import * as admin from 'firebase-admin';

@Injectable()
export class PushNotificationService implements OnModuleInit {
  constructor(
    @Inject(PUSH_NOTIFICATION_CONFIG_OPTIONS)
    private options: PushNotificationOptions,
  ) {}

  onModuleInit() {
    this.initializeFirebase();
  }

  async initializeFirebase() {
    const filePath = `${this.options.firebaseServcieKeyFile}`;
    console.log('filePath', filePath);
    try {
      const data = await readFile(filePath, 'utf8');
      console.log('data', data);
      const firebaseConfig = JSON.parse(data);
      const firebase_params = {
        type: firebaseConfig.type,
        projectId: firebaseConfig.project_id,
        privateKeyId: firebaseConfig.private_key_id,
        privateKey: firebaseConfig.private_key,
        clientEmail: firebaseConfig.client_email,
        clientId: firebaseConfig.client_id,
        authUri: firebaseConfig.auth_uri,
        tokenUri: firebaseConfig.token_uri,
        authProviderX509CertUrl: firebaseConfig.auth_provider_x509_cert_url,
        clientC509CertUrl: firebaseConfig.client_x509_cert_url,
      };
      admin.initializeApp({
        credential: admin.credential.cert(firebase_params),
      });
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.error('Firebase config file not found:', filePath);
        throw new Error(
          `Firebase configuration file not found at: ${filePath}`,
        );
      }
    }
  }

  doSomething(): string {
    return 'Library method called!';
  }
}
