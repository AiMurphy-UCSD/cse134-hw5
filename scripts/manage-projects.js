const STORAGE_KEY = "projects";

const form = document.getElementById("crud-form");
const messageOut = document.getElementById("crud-message");
const list = document.getElementById("project-list");

// Helper: load array from localStorage
function loadProjects() {
  const raw = localStorage.getItem(STORAGE_KEY);
  try {
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Helper: save array to localStorage
function saveProjects(arr) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
}

// Helper: render simple list of current projects
function renderProjectList() {
  const projects = loadProjects();
  list.innerHTML = "";

  if (projects.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No projects in localStorage yet.";
    list.appendChild(li);
    return;
  }

  projects.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.title} → ${p.link || "(no link)"}`;
    list.appendChild(li);
  });
}

renderProjectList();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  messageOut.textContent = "";

  const action = document.getElementById("action").value;
  const title = document.getElementById("title").value.trim();
  const img = document.getElementById("img").value.trim();
  const alt = document.getElementById("alt").value.trim();
  const desc = document.getElementById("desc").value.trim();
  const link = document.getElementById("link").value.trim();

  if (!title) {
    messageOut.textContent = "Title is required for all actions.";
    return;
  }

  let projects = loadProjects();
  const index = projects.findIndex(p => p.title === title);

  if (action === "create") {
    if (index !== -1) {
      messageOut.textContent = "A project with that title already exists. Use update instead.";
      return;
    }

    const newProject = { title, img, alt, desc, link };
    projects.push(newProject);
    saveProjects(projects);
    messageOut.textContent = `Created project "${title}".`;
  }

  else if (action === "update") {
    if (index === -1) {
      messageOut.textContent = `No project found with title "${title}".`;
      return;
    }

    const project = projects[index];

    // Only update fields that are non-empty so you can change just one thing
    if (img) project.img = img;
    if (alt) project.alt = alt;
    if (desc) project.desc = desc;
    if (link) project.link = link;

    projects[index] = project;
    saveProjects(projects);
    messageOut.textContent = `Updated project "${title}".`;
  }

  else if (action === "delete") {
    if (index === -1) {
      messageOut.textContent = `No project found with title "${title}".`;
      return;
    }

    projects.splice(index, 1);
    saveProjects(projects);
    messageOut.textContent = `Deleted project "${title}".`;
  }

  // Clear non-key fields after action
  document.getElementById("img").value = "";
  document.getElementById("alt").value = "";
  document.getElementById("desc").value = "";
  document.getElementById("link").value = "";

  renderProjectList();
});
