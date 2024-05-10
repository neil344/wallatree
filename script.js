<script>
  // Fetch family tree data from server
  fetch("/family-tree")
    .then((response) => response.json())
    .then((data) => {
      renderAncestorTree(data);
    })
    .catch((error) => {
      console.error("Error fetching family tree data:", error);
      console.log("Response:", error.response); // Log the full response object
    });

  // Function to render the ancestor tree
  function renderAncestorTree(treeData) {
    const ancestorTree = document.getElementById("ancestorTree");

    // Render each person in the tree
    treeData.forEach((person) => {
      const node = document.createElement("div");
      node.classList.add("node");
      node.textContent = `${person.name} (${person.sex}) - ${person.dob}`;
      ancestorTree.appendChild(node);

      // Check if the person has parents and render them recursively
      if (person.mother || person.father) {
        const parentContainer = document.createElement("div");
        parentContainer.classList.add("parents");
        node.appendChild(parentContainer);

        if (person.mother) {
          const mother = treeData.find((p) => p.id === person.mother);
          if (mother) {
            const motherNode = document.createElement("div");
            motherNode.textContent = `Mother: ${mother.name}`;
            parentContainer.appendChild(motherNode);
          }
        }

        if (person.father) {
          const father = treeData.find((p) => p.id === person.father);
          if (father) {
            const fatherNode = document.createElement("div");
            fatherNode.textContent = `Father: ${father.name}`;
            parentContainer.appendChild(fatherNode);
          }
        }
      }
    });
  }
</script>
