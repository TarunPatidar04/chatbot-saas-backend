const express = require("express");
const router = express.Router();
const { generateChatResponse, getAllChats, deleteChat } = require("../controllers/chatController");

router.post("/", generateChatResponse);
router.get("/", getAllChats); 
router.delete("/:id", deleteChat);
module.exports = router;
