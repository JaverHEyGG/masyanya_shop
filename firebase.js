import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js';
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL
} from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js';

const firebaseConfig = {
  apiKey: 'AIzaSyDcikMLz2qowsr3bfbxQAGoTrZDzvkhVrQ',
  authDomain: 'masyanya-sho.firebaseapp.com',
  projectId: 'masyanya-sho',
  storageBucket: 'masyanya-sho.appspot.com',
  messagingSenderId: '1071979327562',
  appId: '1:1071979327562:web:a40a96a24f955d568d76b3'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export async function signInUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function signOutUser() {
  return signOut(auth);
}

export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}

export function subscribeProducts(onUpdate, onError) {
  const productsQuery = query(collection(db, 'products'), orderBy('name', 'asc'));
  return onSnapshot(productsQuery, onUpdate, onError);
}

export async function addProduct(product) {
  const productData = {
    ...product,
    createdAt: serverTimestamp()
  };
  return addDoc(collection(db, 'products'), productData);
}

export async function updateProduct(id, product) {
  const productRef = doc(db, 'products', id);
  return updateDoc(productRef, {
    ...product,
    updatedAt: serverTimestamp()
  });
}

export async function deleteProduct(id) {
  const productRef = doc(db, 'products', id);
  return deleteDoc(productRef);
}

export async function uploadProductImage(file, path) {
  const storageReference = storageRef(storage, path);
  await uploadBytes(storageReference, file);
  return getDownloadURL(storageReference);
}
