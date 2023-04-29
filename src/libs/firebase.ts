import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  collection,
  CollectionReference,
  DocumentData,
  getFirestore,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { Comment, Post, User } from '@/types';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

const createCollection = <T = DocumentData>(collectionName: string) =>
  collection(database, collectionName) as CollectionReference<T>;

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

const userCol = createCollection<User>('users');
const postCol = createCollection<Post>('posts');
const commentCol = createCollection<Comment>('comments');

export { app, database, auth, storage, userCol, postCol, commentCol };
