const list = document.getElementById("exerciseList");

// Load data
function getData() {
  return JSON.parse(localStorage.getItem("exercises")) || [];
}

// Save data
function saveData(data) {
  localStorage.setItem("exercises", JSON.stringify(data));
}

// Render exercises
function render() {
  const data = getData();
  list.innerHTML = "";

  data.forEach((ex, index) => {
    const card = document.createElement("div");
    card.className = "card";

    // Name
    const nameInput = document.createElement("input");
    nameInput.className = "exercise-name";
    nameInput.value = ex.name;

    nameInput.addEventListener("change", () => {
      data[index].name = nameInput.value;
      saveData(data);
      render();
    });

    // Row
    const row = document.createElement("div");
    row.className = "row";

    // Weight
    const weightInput = document.createElement("input");
    weightInput.type = "number";
    weightInput.className = "weight-input";
    weightInput.value = ex.current || "";

    weightInput.addEventListener("input", () => {
      data[index].current = Number(weightInput.value);

      if (!data[index].best || data[index].current > data[index].best) {
        data[index].best = data[index].current;
      }

      saveData(data);
    });

    // Delete
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerText = "Delete";

    deleteBtn.onclick = () => {
      data.splice(index, 1);
      saveData(data);
      render();
    };

    row.appendChild(weightInput);
    row.appendChild(deleteBtn);

    card.appendChild(nameInput);
    card.appendChild(row);

    list.appendChild(card);
  });
}

// Add exercise
function addExercise() {
  const input = document.getElementById("newExercise");
  const value = input.value.trim();

  if (!value) return;

  const data = getData();

  data.push({
    name: value,
    current: 0,
    best: 0
  });

  saveData(data);
  input.value = "";
  render();
}

render();