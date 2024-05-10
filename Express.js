const express = require("express");
const fs = require("fs");

const app = express();

// Serve family tree data
app.get("/family-tree", (req, res) => {
  try {
    const jsonData = fs.readFileSync(__dirname + "/family-tree.json", "utf8");
    const familyTreeData = JSON.parse(jsonData);
    res.json(familyTreeData);
  } catch (error) {
    console.error("Error reading family tree data:", error);
    res.status(500).json({ error: "Error reading family tree data" });
  }
});

// Other routes and middleware...

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
