  const state = {
    projucts: [],

  }


async function fetchData() {
    //errorMessage.textContent = "....Loading data...";
    try {
        const response = await fetch('./data/project.json');

        const data = await response.json();
        state.projucts = data;

        console.log(state.projucts);
}catch (error) {
//errorMessage.textContent = "Error fetching data: " + error.message;
}}
fetchData();

function displayProjects(projects) {
    const projectContainer = document.getElementById('project-container');
    projectContainer.innerHTML = '';
    }