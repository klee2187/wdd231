import { getParkData } from "./parkService.mjs";

const parkData = getParkData();

const menuButton = document.getElementById('global-nav-toggle');
const navMenu = document.querySelector('.global-nav');

if (menuButton && navMenu) {
    menuButton.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });
};

function parkInfoTemplate(info) {
    return `
            <h1>${info.name}</h1>
            <p>${info.designation}<br>${info.states}</p>
        `;
};

function setHeaderInfo(data) {

    const disclaimer = document.querySelector(".disclaimer > a");
    disclaimer.href = data.url;
    disclaimer.innerHTML = data.fullName;

    document.querySelector("head > title").textContent = data.fullName;
    document.querySelector(".hero-banner > img").src = data.images[0].url;
    document.querySelector(".hero-text").innerHTML = parkInfoTemplate(data);
};

setHeaderInfo(parkData);

function parkIntroTemplate(info) {
    return`
        <h1>${info.fullName}</h1>
        <p>${info.description}</p>`
};

function setParkIntro(data) {
    const parkIntro = document.querySelector(".intro");
    parkIntro.innerHTML = parkIntroTemplate(data);
}

setParkIntro(parkData);

function mediaCardTemplate(data) {
    return`
        <div class="media-card">
          <img src="${data.image}" alt="${data.name}">
            <div class="media-card-content">
                <a href="${data.link}">
                    <h2>${data.name}</h2>
                </a>
                <a href="${data.link}">
                    <p>${data.description}</p>
                </a>
            </div>
        </div>`
};

const parkInfoLinks = [
    {
        name: "Current Conditions &#x203A;",
        link: "conditions.html",
        image: parkData.images[2].url,
        description: "See what conditions to expect in the parkbefore leaving for your trip!"
    },
    {
        name: "Fees and Passes &#x203A;",
        link: "fees.html",
        image: parkData.images[3].url,
        description: "Learn about the fees and passes that are available."
    },
    {
        name: "Visitor Centers &#x203A;",
        link: "visitor_centers.html",
        image: parkData.images[9].url,
        description: "Learn about the visitor centers in the park."
    }
];

function renderMediaCards(links, parentSelector) {
    const parentElement = document.querySelector(parentSelector);
    if (parentElement) {
        parentElement.innerHTML = '';
        parentElement.innerHTML = links.map(mediaCardTemplate).join('');
    }
} 

renderMediaCards(parkInfoLinks, ".info");

function getMailingAddress(addresses) {
    const mailing = addresses.find((address) => address.type === "Mailing");
    return mailing;
}

function getVoicePhone(numbers) {
    const voice = numbers.find((number) => number.type === "Voice");
    return voice.phoneNumber;
}

function parkFooterTemplate(info) {
    const mailing = getMailingAddress(info.addresses);
    const voice = getVoicePhone(info.contacts.phoneNumbers);

    return`
      <div id="contact-info">
        <h3>Contact Info</h3>
      </div>
      <div id="address">
        <h4>Mailing Address: </h4>
        <p>${mailing.line1}</p>
        <p>${mailing.city}, ${mailing.stateCode}, ${mailing.postalCode}</p>
      </div>
      <div id="phone">
        <h4>Phone:</h4>
        <p>${voice}</p>
      </div>
      `;
};

function setParkFooter(info) {
    const parkFooter = document.getElementById("park-footer");
    parkFooter.innerHTML = parkFooterTemplate(info);
}

setParkFooter(parkData);