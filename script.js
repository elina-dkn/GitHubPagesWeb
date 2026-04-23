const list = document.getElementById("exerciseList");

function render() {
  list.innerHTML = "";
  const exercises = getExercises();

  exercises.forEach((ex, index) => {
    const card = document.createElement("div");
    card.className = "card";

    // Name input
    const nameInput = document.createElement("input");
    nameInput.className = "exercise-name";
    nameInput.value = ex;

    nameInput.addEventListener("change", () => {
      exercises[index] = nameInput.value;
      saveExercises(exercises);
      render();
    });

    // Row
    const row = document.createElement("div");
    row.className = "row";

    // Weight input
    const weightInput = document.createElement("input");
    weightInput.type = "number";
    weightInput.className = "weight-input";

    const key = user + "_" + ex;
    weightInput.value = localStorage.getItem(key) || "";

    weightInput.addEventListener("input", () => {
      localStorage.setItem(key, weightInput.value);
    });

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerText = "Delete";

    deleteBtn.onclick = () => {
      exercises.splice(index, 1);
      saveExercises(exercises);
      render();
    };

    row.appendChild(weightInput);
    row.appendChild(deleteBtn);

    card.appendChild(nameInput);
    card.appendChild(row);

    list.appendChild(card);
  });
}