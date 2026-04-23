const exercises = ["Bench Press", "Squat", "Deadlift", "Shoulder Press"];

const user = localStorage.getItem("currentUser");
document.getElementById("username").innerText = user + "'s Workout";

const table = document.getElementById("tableBody");

exercises.forEach(ex => {
  const row = document.createElement("tr");

  const nameCell = document.createElement("td");
  nameCell.innerText = ex;

  const weightCell = document.createElement("td");
  const input = document.createElement("input");
  input.type = "number";

  const key = user + "_" + ex;

  // Load saved value
  input.value = localStorage.getItem(key) || "";

  // Save on change
  input.addEventListener("input", () => {
    localStorage.setItem(key, input.value);
  });

  weightCell.appendChild(input);

  row.appendChild(nameCell);
  row.appendChild(weightCell);
  table.appendChild(row);
});