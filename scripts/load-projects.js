// DOM elements
const projectContainer = document.getElementById("project-content");
const loadLocalBtn = document.getElementById("load-local");
const loadRemoteBtn = document.getElementById("load-remote");

// ---- Sample local data you will preload into localStorage ----
const localProjectData = [
  {
    title: "UCSD Tennis Court Booking System",
    img: "assets/courtres.webp",
    alt: "Screenshot of Tennis Court Booking System",
    desc: "Reimagined the court reservation system for UCSD's tennis courts...",
    link: "https://github.com/AMurphy03/Tennis-Court-Reservations"
  },
  {
    title: "Password Manager",
    img: "assets/passman.webp",
    alt: "Screenshot of password manager",
    desc: "Developed a secure password manager application using Electron and React...",
    link: "https://github.com/AMurphy03/Password-Manager"
  }
];

// Only initialize if nothing is stored yet
if (!localStorage.getItem("projects")) {
  localStorage.setItem("projects", JSON.stringify(localProjectData));
}


// Helper → Clears existing cards
function clearCards() {
  projectContainer.innerHTML = "";
}

// Helper → Creates a project-card element
function createCard(data) {
  // console.log("DATA RECEIVED BY createCard:", data); 
  const card = document.createElement("project-card"); 
  // console.log("Testing:", data.title); 
  card.setAttribute("title", `${data.title}`);
  card.setAttribute("img", `${data.img}`);
  card.setAttribute("alt", `${data.alt}`);
  card.setAttribute("desc", `${data.desc}`);
  card.setAttribute("link", `${data.link}`);
  return card;
}


// ========== LOAD LOCAL ==========
loadLocalBtn.addEventListener("click", () => {
  clearCards();

  const stored = JSON.parse(localStorage.getItem("projects") || "[]");

  stored.forEach(p => {
    projectContainer.appendChild(createCard(p));
  });
});


// ========== LOAD REMOTE ==========
loadRemoteBtn.addEventListener("click", async () => {
  clearCards();

  try {
    const response = await fetch(
      "https://api.jsonbin.io/v3/b/69310272ae596e708f82571a"
    );

    const json = await response.json();

    const records = json.record;
    
    Object.keys(records).forEach(key => {
        const project = records[key];
        projectContainer.appendChild(createCard(project));
    });

  } catch (err) {
    console.error("Remote fetch failed:", err);
  }
});
