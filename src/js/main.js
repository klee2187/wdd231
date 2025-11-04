import { 
    getParkData, 
    getInfoLinks
} from "./parkService.mjs";
import { 
    mediaCardTemplate,
    parkInfoTemplate,
    footerTemplate
} from "./templates.mjs";

function setHeaderInfo(data) {

    const disclaimer = document.querySelector(".disclaimer > a");
    disclaimer.href = data.url;
    disclaimer.innerHTML = data.fullName;

    document.querySelector("head > title").textContent = data.fullName;
    document.querySelector(".hero-banner > img").src = data.images[0].url;
    document.querySelector(".hero-text").innerHTML = parkInfoTemplate(data);
}

function setupMenuToggles() {
    const splitButtons = document.querySelectorAll('.global-nav__split-button__toggle');
    splitButtons.forEach(button => {
        button.addEventListener('click', () => {
    
            const splitButtonContainer = button.closest('.global-nav__split-button');
            if (splitButtonContainer) {
                splitButtonContainer.classList.toggle('open');
            }
        });
    });
}

function setParkIntro(data) {
    const parkIntro = document.querySelector(".intro");

    parkIntro.innerHTML = `<h1>${data.fullname}</h1>
    <p>${data.description}</p>`;
}

function renderMediaCards(links, parentSelector) {
    const parentElement = document.querySelector(parentSelector);
    if (parentElement) {
        parentElement.innerHTML = '';
        parentElement.innerHTML = links.map(mediaCardTemplate).join('');
    }
} 

function setParkFooter(data) {
    const footerElement = document.querySelector(".park-footer");

    if (footerElement) {
        footerElement.innerHTML = footerTemplate(data);
    }
}

function setHeaderFooter(data) {
    setHeaderInfo(data);
    setParkFooter(data);
}

function enableNavigation() {
    const menuButton = document.querySelector("#global-nav-toggle");
    menuButton.addEventListener("click", (ev) => {
        let target = ev.target;

    document.querySelector(".global-nav").classList.toggle("show");

    if (target.tagName != "BUTTON" ) {
        target = target.closest("button");
    }
    if(document.querySelector(".global-nav").classList.contains("show")) {
        target.setAttribute("aria-expanded", "true");
    } else {
        target.setAttribute("aria-expanded", "false");
    }
    console.log("toggle");
    });
}

async function init() {
    try {
        
    const parkData = await getParkData();

    setHeaderFooter(parkData);
    setParkIntro(parkData);

    const finalLinks = getInfoLinks(parkData.images);

    renderMediaCards(finalLinks, ".info");

    enableNavigation();

    setupMenuToggles();

    } catch (error) {
        console.error("Initialization failed:", error)

    }
}

init();
