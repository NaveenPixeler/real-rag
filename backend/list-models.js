const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

async function run() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    try {
        const listResult = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
        const data = await listResult.json();
        console.log("All Models:");
        data.models.filter(m => m.name.includes("embed")).forEach(m => {
            console.log("Name:", m.name, "Methods:", m.supportedGenerationMethods);
        });
    } catch (error) {
        console.error("Error:", error);
    }
}

run();
