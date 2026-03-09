const { GoogleGenerativeAIEmbeddings } = require("@langchain/google-genai");
require("dotenv").config();

async function run() {
    const model = "gemini-embedding-001";

    try {
        const embeddings = new GoogleGenerativeAIEmbeddings({
            apiKey: process.env.GEMINI_API_KEY,
            modelName: model,
        });
        const res = await embeddings.embedQuery("Hello world");
        console.log(`embedQuery Result length for ${model}:`, res.length);
    } catch (error) {
        console.error(`embedQuery Error for ${model}:`, error.message);
    }
}

run();
