import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async session({ session }) {
            // we want to be able to get the data every fucking time to keep an existing running session
            const sessionUser = await User.findOne({
                email: session.user.email,
            })
            // stores the user id from MongoDB to session
            session.user.id = sessionUser._id.toString()
            return session;
        },
        async signIn({ profile }) {
            try {
                await connectToDB();

                // check if user already exists
                const UserExists = await User.findOne({
                    email: profile.email
                });

                // If user not exists, create a new user
                if (!UserExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture,
                    })
                }
                return true;
            } catch (error) {
                console.log(error)
                return false;
            }
        },
    }

})

export { handler as GET, handler as POST };