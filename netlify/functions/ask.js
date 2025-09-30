// file: netlify/functions/ask.js
import fetch from "node-fetch";

export async function handler(event) {
  try {
    const { query } = JSON.parse(event.body);

    // 🔑 Replace with your Chatbase credentials
    const CHATBASE_API_KEY = "YOUR_CHATBASE_API_KEY";
    const BOT_ID = "YOUR_CHATBASE_BOT_ID";

    const response = await fetch(`https://www.chatbase.co/api/v1/chat`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${CHATBASE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: query }],
        botId: BOT_ID,
      }),
    });

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ reply: data.output || "No response from Chatbase" }),
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
