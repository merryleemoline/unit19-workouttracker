const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  title: { type: String, required: true },
  time: { type: String, required: true },
  description: String,
  date: { type: Date, default: Date.now }
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
