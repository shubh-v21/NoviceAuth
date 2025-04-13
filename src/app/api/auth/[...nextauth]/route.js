import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please provide email and password");
        }

        await dbConnect();

        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("No user found with this email");
        }

        if (!user.isEmailVerified) {
          throw new Error("Please verify your email before logging in");
        }

        if (user.isGoogleAuth) {
          throw new Error("This email is registered with Google. Please use Google to sign in");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          isGoogleAuth: user.isGoogleAuth,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        await dbConnect();
        
        const existingUser = await User.findOne({ email: user.email });
        
        if (!existingUser) {
          // Create a new user if they don't exist
          await User.create({
            name: user.name,
            email: user.email,
            isGoogleAuth: true,
            isEmailVerified: true, // Google users are pre-verified
          });
        }
      }
      
      return true;
    },
    async session({ session, token }) {
      if (session?.user) {
        // Store the Google ID in the session
        session.user.id = token.sub;
        
        // Fetch additional user data using email instead of ID
        await dbConnect();
        const user = await User.findOne({ email: session.user.email });
        
        if (user) {
          // Update the ID to use MongoDB's _id
          session.user.id = user._id.toString();
          session.user.isGoogleAuth = user.isGoogleAuth;
        }
      }
      
      return session;
    },
  },
  pages: {
    signIn: "/auth",
    error: "/auth",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST }; 