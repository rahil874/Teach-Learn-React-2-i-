const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5555;
 
// Middleware
app.use(cors());
app.use(express.json());
 
// MongoDB Connection
const MONGO_URI =
  "mongodb+srv://rahilhussain874:YuDRaTjv7LFWAO7P@cluster0.9r8cl.mongodb.net/"; // Replace with your MongoDB connection string
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Define Topic Schema
const topicSchema = new mongoose.Schema({
  topic: String,
});

const Topic = mongoose.model("Topic", topicSchema);

// API Endpoints
// Save Topic
app.post('/api/save-topic', async (req, res) => {
  try {
    const { topic } = req.body;
    await Topic.deleteMany({}); // Clear previous topics
    const newTopic = new Topic({ topic });
    await newTopic.save();
    res.status(200).send('Topic saved successfully');
  } catch (error) {
    console.error('Error saving topic:', error);
    res.status(500).send('Error saving topic');
  }
});

// Get Topic
app.get("/api/get-topic", async (req, res) => {
  try {
    const topic = await Topic.findOne();
    res.status(200).json({ topic: topic ? topic.topic : null });
  } catch (error) {
    res.status(500).send("Error fetching topic");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
