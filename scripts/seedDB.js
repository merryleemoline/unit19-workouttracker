const mongoose = require("mongoose");
const db = require("../models");


mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/workouttracker_db"
);

const workoutSeed = [
  
  {
    title: "really great workout",
    time: "45 minutes",
    desciption:
      "burpees for 45 minutes",
    date: new Date(Date.now())
  }
];

db.Workout
  .remove({})
  .then(() => db.Workout.collection.insertMany(workoutSeed))
  .then(data => {
    console.log(data.result.n + " workouts inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
