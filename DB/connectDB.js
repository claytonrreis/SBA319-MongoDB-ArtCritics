const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {});
    console.log("MONGODB connected");
  } catch (error) {
    console.error("Error connecting MONGODB");
    // process.exit(1); // Exit the application with an error code
  }
};
// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server runnning on port: ${PORT}`);
//   });
// });

module.exports = connectDB;
