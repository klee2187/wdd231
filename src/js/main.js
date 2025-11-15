
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
    let heroText = document.querySelector(".hero-text");
    heroText.innerHTML = parkInfoTemplate(data);
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
    let parkIntro = document.querySelector(".intro");

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
    const subMenuToggles = document.querySelectorAll(
        ".global-nav__split-button__toggle"
    )

    menuButton.addEventListener("click", (ev) => {

        document.querySelector(".global-nav").classList.toggle("show");

        if(document.querySelector(".global-nav").classList.contains("show")) {
            menuButton.setAttribute("aria-expanded", "true");
        } else {
            menuButton.setAttribute("aria-expanded", "false");
        }
        console.log("toggle");
    });
    subMenuToggles.forEach((toggle) => {
        toggle.addEventListener("click", (ev) => {
            ev.currentTarget
                .closest("li")
                .querySelector(".global-nav__submenu")
                .classList.toggle("show");
            ev.currentTarget.querySelector(".icon").classList.toggle("rotate");
        })
    })
}

function mainMenuHandler(ev) {
  document.querySelector(".global-nav").classList.toggle("show");

  if (document.querySelector(".global-nav").classList.contains("show")) {
    ev.target.setAttribute("aria-expanded", true);

  } else {
    ev.target.setAttribute("aria-expanded", false);
  }

  console.log("toggle");
}

function subMenuHandler(ev) {
  
  ev.currentTarget
    .closest("li")
    .querySelector(".global-nav__submenu")
    .classList.toggle("show");
  ev.currentTarget.querySelector(".icon").classList.toggle("rotate");
}

export default function enableNavigation() {
  const menuButton = document.querySelector("#global-nav-toggle");
  const subMenuToggles = document.querySelectorAll(
    ".global-nav__split-button__toggle"
  );
  
  menuButton.addEventListener("click", mainMenuHandler);
  subMenuToggles.forEach((toggle) => {
    toggle.addEventListener("click", subMenuHandler);
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
