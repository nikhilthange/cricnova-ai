const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");
const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running...");
});