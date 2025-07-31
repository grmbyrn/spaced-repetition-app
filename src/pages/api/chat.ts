import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "OpenAI API key not set" });
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful tutor for programming quizzes. Only answer questions related to the current quiz or chapter. If a user asks something unrelated, politely refuse and remind them to focus on their study material.",
        },
        ...messages,
      ],
      max_tokens: 300,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    return res.status(500).json({ error: data.error?.message || "OpenAI API error" });
  }

  res.status(200).json({ reply: data.choices[0].message.content });
}