   const projectContainer = document.getElementById('project-container')
   const Allbtn = document.getElementById('All')
   const javabtn = document.getElementById('java')
   const htmlbtn = document.getElementById('html')
   const otherbtn = document.getElementById('other')
   const state = {
    projects: [],

  }


async function fetchData() {
    try {
        const response = await fetch('./data/project.json');

        const data = await response.json();
        state.projects = data;
renderProjects(state.projects);
       
}catch (error) {
} console.log(state.projects)
renderProjects(state.projects);
    setupFilterButtons();
}
fetchData();



    function renderProjects(projectsToRender) {
    projectContainer.innerHTML = "";
    
    if (projectsToRender.length === 0) {
        projectContainer.innerHTML = "<p>No projects found in this category.</p>";
        return;
    }

    projectsToRender.forEach((item) => {
        displayProjects(item);
    });
}

function displayProjects(project) {
    const no = project.id;
    const title = project.title;
    const category = project.category;
    const name = project.name;
    

    projectContainer.innerHTML += `
        <article class="card">
            <div class="card-content">
                <h2>Project ${no}: ${name}</h2>
                <p>${title}</p>
                <p>${category}</p>
                <button>View Detail</button>
            </div>
        </article>
    `;
}
  function setupFilterButtons() {
    const filterButtons = [Allbtn, javabtn, htmlbtn, otherbtn];

    filterButtons.forEach(button => {
        if (!button) return;

        button.addEventListener('click', (e) => {
            const selectedCategory = e.target.getAttribute("data");
            
            if (!selectedCategory || selectedCategory === "all") {
                renderProjects(state.projects);
            } else if(selectedCategory === "all"){renderProjects(state.projects)}
            else {
                const filteredProjects = state.projects.filter(
                    project => project.category.toLowerCase() === selectedCategory.toLowerCase()
                );
                renderProjects(filteredProjects);
            }
        });
    });
}


const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("active");
});