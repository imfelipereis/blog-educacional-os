const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  subject: { type: String, required: true },
  teacherName: { type: String, required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "Professor", required: true },
});

module.exports = mongoose.model("Post", postSchema);
