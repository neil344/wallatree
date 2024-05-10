const express = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid"); // Import uuid library to generate unique IDs

const app = express();
app.use(express.json()); // Middleware to parse JSON requests

// Function to read the family tree data from the JSON file
function readFamilyTreeData() {
  try {
    const jsonData = fs.readFileSync(__dirname + "/family-tree.json", "utf8");
    return JSON.parse(jsonData) || []; // Return an empty array if JSON parsing fails or data is null
  } catch (error) {
    console.error("Error reading family tree data:", error);
    return []; // Return an empty array if an error occurs
  }
}

// Function to write the family tree data to the JSON file
function writeFamilyTreeData(data) {
  try {
    fs.writeFileSync(
      __dirname + "/family-tree.json",
      JSON.stringify(data, null, 2)
    );
  } catch (error) {
    console.error("Error writing family tree data:", error);
  }
}

// GET route to fetch family tree data
app.get("/family-tree", (req, res) => {
  const familyTreeData = readFamilyTreeData();
  res.json(familyTreeData);
});

// POST route to create a new person
app.post("/family-tree", (req, res) => {
  // Your existing code for creating a new person...

  // Write updated family tree data to the JSON file
  writeFamilyTreeData(familyTreeData);

  // Send response
  res.status(201).json(newPerson);
});

// Define the '/' route
app.get("/", (req, res) => {
  res.send("Welcome to Genealogy Software!");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
