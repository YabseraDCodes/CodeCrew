  const state = {
    projects: [],

  }

async function fetchData() {
    //errorMessage.textContent = "....Loading data...";
    try {
        const response = await fetch('./data/project.json');

        const data = await response.json();
        state.projects = data;

       
}catch (error) {
//errorMessage.textContent = "Error fetching data: " + error.message;
} console.log(state.projects)
// displayProjects(state.projects);
const projectContainer = document.getElementById('project-container');
    projectContainer.innerHTML = ""; 
    
    state.projects.forEach((item) => {
        displayProjects(item);
    });
}
fetchData();

function displayProjects(projects) {
    const no = projects.id
   
    const title = projects.title;
    const category = projects.category;
    const details = projects.body;
    const projectContainer = document.getElementById('project-container');
      
    
    projectContainer.innerHTML += `

    <article class="card">
    <div class="card-content">
         <h2>Project ID: ${no}</h2>
        
        <p>${title}</p>
        <p>${category}</p>
        <p>${details}</p>

       ${console.log(no)}
       </div>
</article>` 
    ;
    }

;


const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("active");
});