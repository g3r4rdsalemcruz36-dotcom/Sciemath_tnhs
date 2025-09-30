// netlify/functions/ask.js
import fetch from "node-fetch";

export async function handler(event) {
  try {
    const { question } = JSON.parse(event.body || "{}");

    if (!question) {
      return { statusCode: 400, body: JSON.stringify({ error: "No question provided." }) };
    }

    // 🔑 Use your real Chatbase API key here:
    const API_KEY = "ac20dc25-4986-4036-91d7-d66cb0205e52"; 
    const CHATBOT_ID = "ybaLccsZUv7BaHjFEJhmA";

    const response = await fetch(`https://www.chatbase.co/api/v1/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        chatbotId: CHATBOT_ID,
        messages: [{ role: "user", content: question }]
      })
    });

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ answer: data?.output || "⚠️ No answer from Chatbase." })
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
