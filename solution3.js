const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb://localhost/mongo-exercises",
    { useNewUrlParser: true }
  )
  .then(console.log("Connected to mongoDB..."))
  .catch(err => console.error("Could not connect to DB ", err));

const courseSchema = {
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number
};

const Course = mongoose.model("Course", courseSchema);

async function getCourse() {
  return await Course.find({ isPublished: true })
    .or([{ price: { $gte: 15 } }, { name: /.*by.*/i }])
    .sort("-price")
    .select("name author price");
}

async function run() {
  const courses = await getCourse();
  console.log(courses);
}

run();
