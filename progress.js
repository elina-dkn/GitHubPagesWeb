const list = document.getElementById("progressList");

function getData() {
  return JSON.parse(localStorage.getItem("exercises")) || [];
}

function render() {
  const data = getData();
  list.innerHTML = "";

  data.forEach(ex => {
    const container = document.createElement("div");
    container.className = "progress-card";

    const title = document.createElement("div");
    title.innerText = `${ex.name} (${ex.current || 0} kg)`;

    const bar = document.createElement("div");
    bar.className = "progress-bar";

    const fill = document.createElement("div");
    fill.className = "progress-fill";

    const percent = ex.best ? (ex.current / ex.best) * 100 : 0;
    fill.style.width = percent + "%";

    bar.appendChild(fill);
    container.appendChild(title);
    container.appendChild(bar);

    list.appendChild(container);
  });
}

render();