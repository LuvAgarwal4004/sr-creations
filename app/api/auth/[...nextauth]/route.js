import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from '@/models/User';
import connectDb from '@/db/connectDb';

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "select_account consent"
        }
      }
    }),
    CredentialsProvider({

      name: "credentials",

      credentials: {

        email: {},
        password: {}

      },

      async authorize(credentials) {

        await connectDb();

        const user =
          await User.findOne({
            email: credentials.email,
            verified: true
          });

        if (!user) {
          throw new Error(
            "No user found"
          );
        }

        // GOOGLE ACCOUNT ONLY
        if (!user.password) {
          throw new Error(
            "Use Google Login"
          );
        }

        const passwordMatch =
          await bcrypt.compare(
            credentials.password,
            user.password
          );

        if (!passwordMatch) {
          throw new Error(
            "Wrong password"
          );
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role
        };

      }

    }),
  ],

  callbacks: {
    async signIn({ user, profile }) {
      // console.log("USER:", user);
      // console.log("PROFILE:", profile);
      try {
        // console.log("STEP 1: SignIn started");

        await connectDb();
        // console.log("STEP 2: DB connected");

        // console.log("USER EMAIL:", user.email);

        const currentUser = await User.findOne({ email: user.email });

        // console.log("STEP 3: User checked");

        const isAdmin = user.email === "luvag0707@gmail.com";
        if (!currentUser) {
          // console.log("STEP 4: Creating new user");



          await User.create({
            email: user.email,
            name: user.name || user.email.split("@")[0],
            image:
              profile?.picture ||
              user?.image ||
              "",
            verified: true,
            role: isAdmin ? "admin" : "user",
            cart: []
          });

          // console.log("STEP 5: User created");
        } else {
          // FIX: update role if needed
          if (currentUser.role !== (isAdmin ? "admin" : "user")) {
            await User.updateOne(
              { email: user.email },
              { role: isAdmin ? "admin" : "user" }
            );
          }
        }

        return true;

      } catch (err) {
        console.error("🔥 SIGNIN ERROR:", err);
        return false;
      }
    },
    // async jwt({ token, user }) {
    //   await connectDb();

    //   const email = user?.email || token.email;

    //   if (email) {
    //     const dbUser = await User.findOne({ email });

    //     if (dbUser) {
    //       token.role = dbUser.role;
    //       token.id = dbUser._id.toString(); // ✅ FIX
    //       token.name = dbUser.name;
    //       token.image = dbUser.image;
    //     }
    //   }

    //   return token;
    // },
    async jwt({ token, user }) {

      // Only runs when user logs in

      if (user) {

        await connectDb();

        const dbUser = await User.findOne({
          email: user.email
        });

        if (dbUser) {
          token.id = dbUser._id.toString();
          token.role = dbUser.role;
          token.name = dbUser.name;
          token.image = dbUser.image;
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id; // ✅ IMPORTANT
      session.user.name = token.name;
      session.user.role = token.role;
      session.user.image =
        token.image;
      // console.log(session?.user);
      return session;
    },
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };