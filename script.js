const projectContainer = document.getElementById('project-container')
const Allbtn = document.getElementById('All')
const javabtn = document.getElementById('java')
const htmlbtn = document.getElementById('html')
const otherbtn = document.getElementById('other')
const modal = document.querySelector("#projectModal");
const modalName = document.getElementById("modalName");
const modalCategory = document.getElementById("modalCategory");
const modalDescription = document.getElementById("modalDescription");
const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

const state = {
    projects: [],
}

async function fetchData() {
    try {
        const response = await fetch('./data/project.json');

        if (!response.ok) {
            throw new Error('Failed to fetch projects');
        }

        const data = await response.json();
        state.projects = data;
        renderProjects(state.projects);
    } catch (error) {
        console.error(error);
        projectContainer.innerHTML = '<p>No projects available right now.</p>';
    }

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
                <button onclick="openModal(${project.id})">View Detail</button>
            </div>
        </article>
    `;
}

function setupFilterButtons() {
    const filterButtons = [Allbtn, javabtn, htmlbtn, otherbtn];

    filterButtons.forEach((button) => {
        if (!button) return;

        button.addEventListener('click', (e) => {
            const selectedCategory = e.target.getAttribute("data");
            const normalized = selectedCategory === 'all' ? 'all' : selectedCategory.toLowerCase();

            filterButtons.forEach((btn) => btn.classList.toggle('active', btn === e.target));

            if (!selectedCategory || normalized === 'all') {
                renderProjects(state.projects);
                return;
            }

            const filteredProjects = state.projects.filter(
                project => project.category.toLowerCase() === normalized.toLowerCase()
            );
            renderProjects(filteredProjects);
        });
    });
}

function openModal(projectId) {
    const project = state.projects.find(project => project.id === projectId);

    modal.style.display = 'flex';

    if (!project) {
        return;
    }

    modalName.textContent = project.name;
    modalCategory.textContent = project.category;
    modalDescription.textContent = project.body;
}

function closeModal() {
    modal.style.display = 'none';
}

const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

if (menuToggle && navbar) {
    menuToggle.addEventListener("click", () => {
        navbar.classList.toggle("active");
    });
}

if (form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        formMessage.textContent = 'Thanks! Your message has been sent.';
        form.reset();
    });
}
