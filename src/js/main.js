import { getParkData } from "./parkService.mjs";

const parkData = getParkData();

const menuButton = document.getElementById('global-nav-toggle');
const navMenu = document.querySelector('.global-nav');

if (menuButton && navMenu) {
    menuButton.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });
};

const disclaimer = document.querySelector(".disclaimer > a");
disclaimer.href = parkData.url;
disclaimer.innerHTML = parkData.fullName;

function parkInfoTemplate(info) {
    return `<div class="hero-text">
            <h1>${info.name}</h1>
            <p>${info.designation}<br>${info.states}</p>
          </div>`;
};

document.addEventListener("DOMContentLoaded", () => {
    const parkName = document.querySelector(".hero-text h1");
    const parkDetails = document.querySelector(".hero-text p");

    if (parkName && parkDetails) {
        parkName.textContent = parkData.name;
        parkDetails.innerHTML = `${parkData.designation}<br>${parkData.states}`;
    }
});

document.querySelector("head > title").textContent = parkData.images[0].url;
document.querySelector(".hero-banner > img").src = parkData.images[0].url;
document.querySelector(".hero-banner__content").innerHTML = parkInfoTemplate(parkData);

document.addEventListener("DOMContentLoaded", () => {
    const heroImageElement = document.querySelector(".hero-banner img");

    if (heroImageElement) {
        heroImageElement.src = heroImage;
    }
});