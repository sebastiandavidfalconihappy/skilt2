import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { FirebaseAdapter } from '@next-auth/firebase-adapter';
import { db } from '../../../lib/firebaseConfig';

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Lógica personalizada para autenticación
        const { email, password } = credentials;
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          return { id: userCredential.user.uid, email: userCredential.user.email };
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  adapter: FirebaseAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
});
