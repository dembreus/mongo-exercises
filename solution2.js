const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb://localhost/mongo-exercises",
    { useNewUrlParser: true }
  )
  .then(console.log("Connecting to mongoDB..."))
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
async function getCourses() {
  return await Course.find({ isPublished: true })
    .or([{ tags: "frontend" }, { tags: "backend" }])
    .sort("-price")
    .select("name author price");
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();
