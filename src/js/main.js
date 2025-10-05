import { getParkData, getVisitorCenterData } from "./parkService.mjs";

export function getInfoLinks(data) {
    return parkInfoLinks.map((item) => {
        const updatedItem = { ...item };
        updatedItem.image = data[updatedItem.imageIndex].url;
        return updatedItem;
    });
}

function parkInfoTemplate(info) {
    return `
        <h1>${info.name}</h1>
        <p>${info.designation}<br>${info.states}</p>
    `;
};

function parkIntroTemplate(info) {
    return`
        <h1>${info.fullName}</h1>
        <p>${info.description}</p>`
};

function mediaCardTemplate(data) {
    const linkColorStyle = `color: var(--bs-link-color);`;

    return`
        <div class="media-card">
          <img src="${data.image}" alt="${data.name.replace(' &#x203A;', '')}">
            <div class="media-card-content">
                <a href="${data.link}">
                    <h2 style="${linkColorStyle}">${data.name}</h2>
                </a>
                <a href="${data.link}">
                    <p style="${linkColorStyle}">${data.description}</p>
                </a>
            </div>
        </div>`;
};

function getMailingAddress(addresses) {
    const mailing = addresses.find((address) => address.type === "Mailing");
    return mailing;
}

function getVoicePhone(numbers) {
    const voice = numbers.find((number) => number.type === "Voice");
    return voice ? voice.phoneNumber : 'N/A';
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
}

function setHeaderInfo(data) {

    const disclaimer = document.querySelector(".disclaimer > a");
    disclaimer.href = data.url;
    disclaimer.innerHTML = data.fullName;

    document.querySelector("head > title").textContent = data.fullName;
    document.querySelector(".hero-banner > img").src = data.images[0].url;
    document.querySelector(".hero-text").innerHTML = parkInfoTemplate(data);
}

function setParkIntro(data) {
    const parkIntro = document.querySelector(".intro");
    parkIntro.innerHTML = parkIntroTemplate(data);
}

function renderMediaCards(links, parentSelector) {
    const parentElement = document.querySelector(parentSelector);
    if (parentElement) {
        parentElement.innerHTML = '';
        parentElement.innerHTML = links.map(mediaCardTemplate).join('');
    }
} 

function setParkFooter(info) {
    const parkFooter = document.getElementById("park-footer");
    parkFooter.innerHTML = parkFooterTemplate(info);
}

function setHeaderFooter(data) {
    setHeaderInfo(data);
    setParkFooter(data);
}

const menuButton = document.getElementById('global-nav-toggle');
const navMenu = document.querySelector('.global-nav');

if (menuButton && navMenu) {
    menuButton.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });
};

const parkInfoLinks = [
    {
        name: "Current Conditions &#x203A;",
        link: "conditions.html",
        imageIndex: 2,
        description: "See what conditions to expect in the parkbefore leaving for your trip!"
    },
    {
        name: "Fees and Passes &#x203A;",
        link: "fees.html",
        imageIndex: 3,
        description: "Learn about the fees and passes that are available."
    },
    {
        name: "Visitor Centers &#x203A;",
        link: "visitor_centers.html",
        imageIndex: 9,
        description: "Learn about the visitor centers in the park."
    }
];

async function init() {
    try {
        
    const parkData = await getParkData();

    setHeaderFooter(parkData);
    setParkIntro(parkData);

    const finalLinks = getInfoLinks(parkData.images);

    renderMediaCards(finalLinks, ".info");

    } catch (error) {
        console.error("Initialization failed:", error)

    }

}

init();
