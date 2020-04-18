const express = require("express");
const server = express();
const cors = require("cors");

// Middelware
server.use(express.json());
server.use(cors());

// Route handlers
const projectRoutes = require("./routes/projects/projects.js");
server.use("/projects", projectRoutes);

// Error middleware
server.use((err, req, res, next) => {
  console.error(err);

  if (err) {
    res
      .status(500)
      .json({
        message: "There was an error performing the required operation",
      });
  }
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
