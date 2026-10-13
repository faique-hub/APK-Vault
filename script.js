/* =========================================
   APK VAULT - JAVASCRIPT
========================================= */


/* =========================================
   APP DATA
========================================= */

const apps = [
    {
        id: 1,
        name: "CapCut - Video Editor",
        category: "entertainment",
        version: "19.7.0",
        size: "247MB",
        updated: "13 Oct 2026",
        icon: "images/apps/capcut.png",
        description: "A video editing application with tools for creating and editing videos.",
        about: "CapCut - Video Editor provides video editing tools and features for creating and enhancing videos.",
        features: [
            "Video editing tools",
            "Filters and effects",
            "Text and stickers",
            "Audio editing",
            "Video export"
        ],
        changelog: "Initial listing.",
        apk: "https://github.com/faique-hub/APK-Vault/releases/download/v1.0.0/capcut.apk"
    }
];


/* =========================================
   GET HTML ELEMENTS
========================================= */

const appsGrid = document.getElementById("appsGrid");

const searchInput = document.getElementById("searchInput");

const searchBtn = document.getElementById("searchBtn");

const categoryButtons =
    document.querySelectorAll(".category-btn");

const appCount =
    document.getElementById("appCount");

const noResults =
    document.getElementById("noResults");

const appDetails =
    document.getElementById("appDetails");

const appsSection =
    document.getElementById("apps");

const backBtn =
    document.getElementById("backBtn");

const menuBtn =
    document.getElementById("menuBtn");

const navbar =
    document.querySelector(".navbar");


/* =========================================
   DETAILS ELEMENTS
========================================= */

const detailsIcon =
    document.getElementById("detailsIcon");

const detailsName =
    document.getElementById("detailsName");

const detailsDescription =
    document.getElementById("detailsDescription");

const detailsVersion =
    document.getElementById("detailsVersion");

const detailsSize =
    document.getElementById("detailsSize");

const detailsCategory =
    document.getElementById("detailsCategory");

const detailsAbout =
    document.getElementById("detailsAbout");

const detailsFeatures =
    document.getElementById("detailsFeatures");

const detailsChangelog =
    document.getElementById("detailsChangelog");

const downloadBtn =
    document.getElementById("downloadBtn");


/* =========================================
   CATEGORY NAME
========================================= */

function getCategoryName(category) {

    const categories = {
        tools: "Tools",
        education: "Education",
        productivity: "Productivity",
        entertainment: "Entertainment",
        games: "Games"
    };

    return categories[category] || "Other";
}


/* =========================================
   DISPLAY APPS
========================================= */

function displayApps(appList) {

    appsGrid.innerHTML = "";

    appCount.textContent =
        `${appList.length} App${appList.length !== 1 ? "s" : ""}`;


    if (appList.length === 0) {

        noResults.hidden = false;

        return;
    }


    noResults.hidden = true;


    appList.forEach(app => {

        const card = document.createElement("article");

        card.className = "app-card";


        card.innerHTML = `

            <div class="app-card-top">

                <img
                    src="${app.icon}"
                    alt="${app.name} icon"
                    class="app-icon"
                    loading="lazy"
                >

                <div class="app-info">

                    <h3>
                        ${app.name}
                    </h3>

                    <span class="app-category">
                        ${getCategoryName(app.category)}
                    </span>

                </div>

            </div>


            <p class="app-description">
                ${app.description}
            </p>


            <div class="app-meta">

                <span>
                    v${app.version}
                </span>

                <span>
                    ${app.size}
                </span>

                <span>
                    ${app.updated}
                </span>

            </div>


            <div class="app-actions">

                <button
                    class="view-btn"
                    onclick="showAppDetails(${app.id})"
                >
                    View Details
                </button>

                <a
                    href="${app.apk}"
                    class="card-download-btn"
                    download
                >
                    Download APK
                </a>

            </div>

        `;


        appsGrid.appendChild(card);

    });
}


/* =========================================
   SHOW APP DETAILS
========================================= */

function showAppDetails(appId) {

    const app =
        apps.find(item => item.id === appId);


    if (!app) {
        return;
    }


    /* App information */

    detailsIcon.src = app.icon;

    detailsIcon.alt =
        `${app.name} icon`;

    detailsName.textContent =
        app.name;

    detailsDescription.textContent =
        app.description;

    detailsVersion.textContent =
        `Version: ${app.version}`;

    detailsSize.textContent =
        `Size: ${app.size}`;

    detailsCategory.textContent =
        `Category: ${getCategoryName(app.category)}`;

    detailsAbout.textContent =
        app.about;

    detailsChangelog.textContent =
        app.changelog;


    /* Features */

    detailsFeatures.innerHTML = "";


    app.features.forEach(feature => {

        const li =
            document.createElement("li");

        li.textContent = feature;

        detailsFeatures.appendChild(li);

    });


    /* Download */

    downloadBtn.href = app.apk;

    downloadBtn.setAttribute(
        "download",
        ""
    );


    /* Hide app listing */

    appsSection.hidden = true;


    /* Show details */

    appDetails.hidden = false;


    /* Scroll to top */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================
   BACK TO APPS
========================================= */

backBtn.addEventListener("click", () => {

    appDetails.hidden = true;

    appsSection.hidden = false;

    window.scrollTo({
        top: appsSection.offsetTop - 70,
        behavior: "smooth"
    });

});


/* =========================================
   SEARCH
========================================= */

function searchApps() {

    const searchTerm =
        searchInput.value
        .trim()
        .toLowerCase();


    const filteredApps =
        apps.filter(app => {

            return (
                app.name.toLowerCase()
                    .includes(searchTerm)

                ||

                app.description.toLowerCase()
                    .includes(searchTerm)

                ||

                app.category.toLowerCase()
                    .includes(searchTerm)
            );

        });


    displayApps(filteredApps);

}


/* Search while typing */

searchInput.addEventListener(
    "input",
    searchApps
);


/* Search button */

searchBtn.addEventListener(
    "click",
    searchApps
);


/* Enter key */

searchInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            searchApps();

        }

    }
);


/* =========================================
   CATEGORY FILTER
========================================= */

categoryButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            /* Remove active class */

            categoryButtons.forEach(btn => {

                btn.classList.remove("active");

            });


            /* Add active class */

            button.classList.add("active");


            const selectedCategory =
                button.dataset.category;


            if (selectedCategory === "all") {

                displayApps(apps);

                return;
            }


            const filteredApps =
                apps.filter(app =>
                    app.category === selectedCategory
                );


            displayApps(filteredApps);

        }
    );

});


/* =========================================
   MOBILE MENU
========================================= */

menuBtn.addEventListener(
    "click",
    () => {

        navbar.classList.toggle("active");

    }
);


/* Close mobile menu
   after clicking a link
*/

document
    .querySelectorAll(".navbar a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                navbar.classList.remove(
                    "active"
                );

            }
        );

    });


/* =========================================
   INITIAL LOAD
========================================= */

displayApps(apps);


/* =========================================
   CONSOLE MESSAGE
========================================= */

console.log(
    "APK Vault loaded successfully 🚀"
);