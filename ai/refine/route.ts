import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
function getPrompt (action: string, text: string): string{
    switch(action){
        case "format":
            return `Rewrite the following todo text to be well-structured and grammatically correct. Only return the rewritten text, nothing else.\n\nText: "${text}"`;
        case "casual":
            return `Rewrite the following todo text in a more natural, conversational tone. Only return the rewritten text, nothing else.\n\nText: "${text}"`;
        case "summary":
            return `Summarize the following todo text, keeping only the key information, as short as possible. Only return the summarized text, nothing else.\n\nText: "${text}"`;
        case "enhance":
            return `Improve the clarity and readability of the following todo text, without changing its meaning. Only return the improved text, nothing else.\n\nText: "${text}"`;
        default:
            return text;
    }
}
export async function POST(request:Request) {
    const { text, action } = await request.json();
    if (!text || !action) {
        return NextResponse.json(
            {error : "Text and action are required"},
            {status:400}
        );
    }
    try{
        const model = genAI.getGenerativeModel({model: "gemini-3.6-flash"});
        const prompt = getPrompt(action,text);
        const result = await model.generateContent(prompt);
        const refinedText = result.response.text().trim();
        return NextResponse.json({ refinedText});
    }
    catch(err){
        console.error ("Gemini error:",err);
        return NextResponse.json(
            {error: "Failes to refine Text"},
            { status:500}
        );
    }
}