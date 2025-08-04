// نسخه ساده فایل service worker
importScripts("https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js");

const firebaseConfig = {
    apiKey: "AIzaSyDcrm65-rQHOoLKNtPTwI-cOm851c1X3SU",
    authDomain: "linchpin-9c906.firebaseapp.com",
    projectId: "linchpin-9c906",
    storageBucket: "linchpin-9c906.firebasestorage.app",
    messagingSenderId: "200118688766",
    appId: "1:200118688766:web:970a436e624f6320853eaf",
    measurementId: "G-FV1MHWWEEJ"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
