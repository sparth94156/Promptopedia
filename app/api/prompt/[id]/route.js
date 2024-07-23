import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt";

// GET (read)
export const GET = async (req, { params }) => {
    try {
        await connectToDB();    // Connection to DB

        // here we are fetching the selected prompt by Id
        const prompt = await Prompt.findById(params.id).populate('creator')
        return new Response(JSON.stringify(prompt), {
            status: 200
        })

    } catch (error) {
        return new Response("Failed to load prompts", {
            status: 500
        })
    }
}

// PATCH (update) 
export const PATCH = async (req, { params }) => {
    // getting the body data from passed option object 
    const { prompt, tag } = await req.json()

    try {
        await connectToDB();

        // Find the prompt by Id params
        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) return new Response("Prompt not found", { status: 404 })

        // Update the existing promt with new updated prompt (we have passed the new prompt body through PATCH request)
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();    // Save to database

        return new Response(JSON.stringify(existingPrompt), { status: 200 })
    } catch (error) {
        return new Response("Failed to update prompt", { status: 500 })
    }
}

// DELETE 
export const DELETE = async (req, { params }) => {

    const { prompt, tag } = await req.json()
    try {
        await connectToDB();

        // Find the prompt by Id params
        const existingPrompt = await Prompt.findByIdAndDelete(params.id);

        return new Response("Prompt deleted successfully", { status: 200 })
    } catch (error) {
        return new Response("Failed to delete prompt",
            { status: 500 }
        )
    }
}