require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");
const cors = require("cors");

const PORT = process.env.PORT || 5000;
app.use(cors());


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("DB error:", err));
