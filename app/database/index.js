import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyB4Oonfiwe-Q4YCLF05w2XRGd_Sr1svaaA',
  authDomain: 'gulp-boiler.firebaseapp.com',
  databaseURL: 'https://gulp-boiler.firebaseio.com',
  storageBucket: 'gulp-boiler.appspot.com'
};

const app = firebase.initializeApp(config);
export default {
  database: app.database()
};
