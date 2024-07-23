import { Schema, model, models } from "mongoose";

// Schema(model) of the prompt document 
const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User", 
    },
    prompt: {
        type: String,
        required: [true, "Prompt is required. "]
    },
    tag: {
        type: String,
        required: [true, 'Tag is required. ']
    }
})

const Prompt = models.Prompt || model("Prompt", PromptSchema)

export default Prompt