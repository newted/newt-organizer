module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
  firebaseType: process.env.FIREBASE_TYPE,
  firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
  firebasePrivateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
  firebasePrivateKey: JSON.parse(process.env.FIREBASE_PRIVATE_KEY),
  firebaseClientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  firebaseClientId: process.env.FIREBASE_CLIENT_ID,
  firebaseAuthUri: process.env.FIREBASE_AUTH_URI,
  firebaseTokenUri: process.env.FIREBASE_TOKEN_URI,
  firebaseAuthProviderX509CertUrl: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  firebaseClientX509CertUrl: process.env.FIREBASE_CLIENT_X509_CERT_URL
};
