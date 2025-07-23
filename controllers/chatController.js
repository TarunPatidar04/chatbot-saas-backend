// const dotenv = require("dotenv");
// dotenv.config();
const OpenAI = require("openai");

const Chat = require("../models/Chat");


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.generateChatResponse = async (req, res) => {
  try {
    const { prompt } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const response = completion.choices[0].message.content;
    console.log("response:", response);

    // Optional: Save to DB
    await Chat.create({ prompt, response });

    res.json({ response });
  } catch (err) {
    console.error("Chat error:", err.message);
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find().sort({ createdAt: -1 }); // latest first
    res.json(chats);
  } catch (err) {
    console.error("Chat history error:", err.message);
    res.status(500).json({ error: "Could not fetch history" });
  }
};

exports.deleteChat = async (req, res) => {
  try {
    const { id } = req.params;
    await Chat.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (err) {
    console.error("Delete chat error:", err.message);
    res.status(500).json({ error: "Failed to delete chat" });
  }
};

