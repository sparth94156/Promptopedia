import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt";

export const POST = async (req, res) => {
    // we extract the things that we passed through post request using
    const { userId, prompt, tag } = await req.json()
    try {
        await connectToDB();     // Connection to MongoDB (Now we need to create a model for the prompt)
        const newPrompt = new Prompt({
            creator:userId,
            prompt,
            tag
        }) 

        await newPrompt.save(); // To save it to the database

        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new prompt", { status: 500 })
    }
}