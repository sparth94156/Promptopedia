import { Schema, model, models } from "mongoose";   // mongoose helps us interacting with the database

const UserSchema = new Schema({ 
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required!'],
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        // match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, 
        // "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    image: {
        type: String, 
    }
})

// When working with nextjs. serverless routes is only going to be created and running when it is called
const User = models.User || model("User", UserSchema)

export default User;

// If we were working with always running backend server, we do like this 
// const User = model("User", UserSchema)

