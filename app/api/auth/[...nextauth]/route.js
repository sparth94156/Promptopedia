import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
import { connectToDB } from "@utils/database"; 
import { MongoDBAdapter } from "@auth/mongodb-adapter";

import User from "@models/user";

const handler = NextAuth({
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    adapter: MongoDBAdapter(connectToDB),
    secret: process.env.NEXT_AUTH_SECRET,
    callbacks: {
        async session({ session }) {
            // we want to be able to get the data every time to keep an existing running session

            // Finding the document that matches with session email to check for already existing account
            const sessionUser = await User.findOne({
                email: session?.user.email,
            }) 
            // stores the user document id from MongoDB to session
            session.user.id = sessionUser._id.toString()
            return session;
        },
        async signIn({ profile }) {
            try {
                await connectToDB();    // Connection to DB

                // check if user already exists
                const UserExists = await User.findOne({
                    email: profile?.email
                });

                // If user not exists, create a new document and save user in mongoDB
                if (!UserExists) {
                    await User.create({
                        email: profile?.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile?.picture,
                    })
                }
                return true;
            } catch (error) {
                console.log("Error checking if user exists: ", error.message)
                return false;
            }
        },
    }

})

export { handler as GET, handler as POST };