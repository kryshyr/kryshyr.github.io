const body = document.body

const btnTheme = document.querySelector('.fa-moon')
const btnHamburger = document.querySelector('.fa-bars')

const addThemeClass = (bodyClass, btnClass) => {
    body.classList.add(bodyClass)
    btnTheme.classList.add(btnClass)
}

const getBodyTheme = localStorage.getItem('portfolio-theme')
const getBtnTheme = localStorage.getItem('portfolio-btn-theme')

addThemeClass(getBodyTheme, getBtnTheme)

const isDark = () => body.classList.contains('dark')

const setTheme = (bodyClass, btnClass) => {

    body.classList.remove(localStorage.getItem('portfolio-theme'))
    btnTheme.classList.remove(localStorage.getItem('portfolio-btn-theme'))

    addThemeClass(bodyClass, btnClass)

    localStorage.setItem('portfolio-theme', bodyClass)
    localStorage.setItem('portfolio-btn-theme', btnClass)
}

const toggleTheme = () =>
    isDark() ? setTheme('light', 'fa-moon') : setTheme('dark', 'fa-sun')

btnTheme.addEventListener('click', toggleTheme)

const displayList = () => {
    const navUl = document.querySelector('.nav__list')

    if (btnHamburger.classList.contains('fa-bars')) {
        btnHamburger.classList.remove('fa-bars')
        btnHamburger.classList.add('fa-times')
        navUl.classList.add('display-nav-list')
    } else {
        btnHamburger.classList.remove('fa-times')
        btnHamburger.classList.add('fa-bars')
        navUl.classList.remove('display-nav-list')
    }
}

//HAMBURGER NAVIGATION FOR MOBILE
btnHamburger.addEventListener('click', displayList)


// SCROLL ARROW
const scrollUp = () => {
    const btnScrollTop = document.querySelector('.scroll-top')

    if (
        body.scrollTop > 500 ||
        document.documentElement.scrollTop > 500
    ) {
        btnScrollTop.style.display = 'block'
    } else {
        btnScrollTop.style.display = 'none'
    }
}

document.addEventListener('scroll', scrollUp)


//SKILLS
async function fetchData(type = "skills") {
    let response
    type === "skills" ?
        response = await fetch("skills.json")
        :
        response = await fetch("./projects/projects.json")
    const data = await response.json();
    return data;
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
			<div class="info">
                <img class="skill-icon" src=${skill.icon} alt="skill" />
                <span>${skill.name}</span>
			</div>
        </div>`
    });
    skillsContainer.innerHTML = skillHTML;
}

fetchData().then(data => {
    showSkills(data);
});

// PROJECTS

document.addEventListener('DOMContentLoaded', function () {
    fetch('projects.json')
        .then(response => response.json())
        .then(projects => {
            const projectsContainer = document.querySelector('.projects-container');
            projects.forEach(project => {
                const projectElement = document.createElement('div');
                projectElement.classList.add('project');

                // Determine the correct link for the project image
                const projectLink = project.title === "UPV - DPSM Website"
                    ? project.links.find(link => link.type === "website").href
                    : project.links[0].href;

                const projectHTML = `
                    <a href="${projectLink}" target="_blank" rel="noopener noreferrer">
                        <img src="${project.image}" alt="${project.title}">
                    </a>
                    <a href="${projectLink}" target="_blank" rel="noopener noreferrer">
                        <h2>${project.title}</h2>
                    </a>
                    <div class="tech-stack">
                        ${project.techStack.map(tech => `<div class="tech-button">${tech}</div>`).join('')}
                    </div>
                    <div class="icon-container">
                        ${project.links.map(link => `
                            <a href="${link.href}" target="_blank" rel="noopener noreferrer" class="icon-link ${link.type}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                    fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="${link.type}">
                                    ${link.type === 'github' ? `
                                    <path
                                        d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                                    ` : `
                                    <path
                                        d="M15 7h3a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-3m-6 0H6a5 5 0 0 1-5-5 5 5 0 0 1 5-5h3" />
                                    <line x1="8" y1="12" x2="16" y2="12" />
                                    `}
                                </svg>
                            </a>
                        `).join('')}
                    </div>
                    <p>${project.description}</p>
                `;

                projectElement.innerHTML = projectHTML;
                projectsContainer.appendChild(projectElement);
            });
        })
        .catch(error => console.error('Error fetching projects:', error));
});
