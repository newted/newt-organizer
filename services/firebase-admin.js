const admin = require("firebase-admin");

let serviceAccount;

if (process.env.NODE_ENV === "production") {
  const keys = require("../config/keys");

  serviceAccount = {
    type: keys.firebaseType,
    project_id: keys.firebaseProjectId,
    private_key_id: keys.firebasePrivateKeyId,
    private_key: keys.firebasePrivateKey,
    client_email: keys.firebaseClientEmail,
    client_id: keys.firebaseClientId,
    auth_uri: keys.firebaseAuthUri,
    token_uri: keys.firebaseTokenUri,
    auth_provider_x509_cert_url: keys.firebaseAuthProviderX509CertUrl,
    client_x509_cert_url: keys.firebaseClientX509CertUrl
  };
} else {
  serviceAccount = require("../config/serviceAccountKey.json");
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
