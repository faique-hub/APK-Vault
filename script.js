
/* =========================================
   APK VAULT - UPDATED JAVASCRIPT
   App data is loaded from apps.json
========================================= */


/* =========================================
   APP DATA
========================================= */

let apps = [];


/* =========================================
   GET HTML ELEMENTS
========================================= */

const appsGrid = document.getElementById("appsGrid");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const categoryButtons =
    document.querySelectorAll(".category-btn");

const appCount = document.getElementById("appCount");
const noResults = document.getElementById("noResults");
const appDetails = document.getElementById("appDetails");
const appsSection = document.getElementById("apps");
const backBtn = document.getElementById("backBtn");
const menuBtn = document.getElementById("menuBtn");
const navbar = document.querySelector(".navbar");


/* =========================================
   DETAILS ELEMENTS
========================================= */

const detailsIcon = document.getElementById("detailsIcon");
const detailsName = document.getElementById("detailsName");
const detailsDescription =
    document.getElementById("detailsDescription");

const detailsVersion = document.getElementById("detailsVersion");
const detailsSize = document.getElementById("detailsSize");
const detailsCategory = document.getElementById("detailsCategory");
const detailsAbout = document.getElementById("detailsAbout");
const detailsFeatures = document.getElementById("detailsFeatures");
const detailsChangelog = document.getElementById("detailsChangelog");
const downloadBtn = document.getElementById("downloadBtn");


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
   LOAD APPS FROM apps.json
========================================= */

async function loadApps() {
    try {
        const response = await fetch("apps.json");

        if (!response.ok) {
            throw new Error(
                `Failed to load apps.json (${response.status})`
            );
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
            throw new Error("apps.json must contain an array.");
        }

        apps = data.map((app, index) => ({
            ...app,
            id: app.id ?? index + 1,
            name: app.name || "Unnamed App",
            category: app.category || "other",
            version: app.version || "Unknown",
            size: app.size || "Unknown",
            updated: app.updated || "Not specified",
            icon: app.icon || "images/apps/capcut.png",
            description: app.description || "",
            about: app.about || "",
            features: Array.isArray(app.features)
                ? app.features
                : [],
            changelog: app.changelog || "No changelog available.",
            apk: app.apk || ""
        }));

        displayApps(apps);

        console.log(
            `APK Vault: ${apps.length} app(s) loaded successfully.`
        );

    } catch (error) {
        console.error("APK Vault loading error:", error);

        apps = [];

        if (appsGrid) {
            appsGrid.innerHTML =
                "<p>Apps load nahi ho paayin. Please try again later.</p>";
        }

        if (appCount) {
            appCount.textContent = "Apps unavailable";
        }

        if (noResults) {
            noResults.hidden = true;
        }
    }
}


/* =========================================
   DISPLAY APPS
========================================= */

function displayApps(appList) {
    if (!appsGrid) return;

    appsGrid.innerHTML = "";

    if (appCount) {
        appCount.textContent =
            `${appList.length} App${appList.length !== 1 ? "s" : ""}`;
    }

    if (appList.length === 0) {
        if (noResults) noResults.hidden = false;
        return;
    }

    if (noResults) noResults.hidden = true;

    appList.forEach(app => {
        const card = document.createElement("article");
        card.className = "app-card";

        /* Build card safely */
        const top = document.createElement("div");
        top.className = "app-card-top";

        const icon = document.createElement("img");
        icon.src = app.icon;
        icon.alt = `${app.name} icon`;
        icon.className = "app-icon";
        icon.loading = "lazy";

        const info = document.createElement("div");
        info.className = "app-info";

        const name = document.createElement("h3");
        name.textContent = app.name;

        const category = document.createElement("span");
        category.className = "app-category";
        category.textContent = getCategoryName(app.category);

        info.append(name, category);
        top.append(icon, info);

        const description = document.createElement("p");
        description.className = "app-description";
        description.textContent = app.description;

        const meta = document.createElement("div");
        meta.className = "app-meta";

        [`v${app.version}`, app.size, app.updated].forEach(value => {
            const span = document.createElement("span");
            span.textContent = value;
            meta.appendChild(span);
        });

        const actions = document.createElement("div");
        actions.className = "app-actions";

        const viewButton = document.createElement("button");
        viewButton.className = "view-btn";
        viewButton.type = "button";
        viewButton.textContent = "View Details";
        viewButton.addEventListener("click", () => {
            showAppDetails(app.id);
        });

        actions.appendChild(viewButton);

        if (app.apk) {
            const downloadLink = document.createElement("a");
            downloadLink.href = app.apk;
            downloadLink.className = "card-download-btn";
            downloadLink.textContent = "Download APK";
            downloadLink.target = "_blank";
            downloadLink.rel = "noopener noreferrer";

            actions.appendChild(downloadLink);
        }

        card.append(top, description, meta, actions);
        appsGrid.appendChild(card);
    });
}


/* =========================================
   SHOW APP DETAILS
========================================= */

function showAppDetails(appId) {
    const app = apps.find(item => String(item.id) === String(appId));

    if (!app) return;

    if (detailsIcon) {
        detailsIcon.src = app.icon;
        detailsIcon.alt = `${app.name} icon`;
    }

    if (detailsName) detailsName.textContent = app.name;

    if (detailsDescription) {
        detailsDescription.textContent = app.description;
    }

    if (detailsVersion) {
        detailsVersion.textContent = `Version: ${app.version}`;
    }

    if (detailsSize) {
        detailsSize.textContent = `Size: ${app.size}`;
    }

    if (detailsCategory) {
        detailsCategory.textContent =
            `Category: ${getCategoryName(app.category)}`;
    }

    if (detailsAbout) detailsAbout.textContent = app.about;

    if (detailsChangelog) {
        detailsChangelog.textContent = app.changelog;
    }

    if (detailsFeatures) {
        detailsFeatures.innerHTML = "";

        app.features.forEach(feature => {
            const li = document.createElement("li");
            li.textContent = feature;
            detailsFeatures.appendChild(li);
        });
    }

    if (downloadBtn) {
        if (app.apk) {
            downloadBtn.href = app.apk;
            downloadBtn.hidden = false;
            downloadBtn.target = "_blank";
            downloadBtn.rel = "noopener noreferrer";
            downloadBtn.removeAttribute("download");
        } else {
            downloadBtn.removeAttribute("href");
            downloadBtn.hidden = true;
        }
    }

    if (appsSection) appsSection.hidden = true;
    if (appDetails) appDetails.hidden = false;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   BACK TO APPS
========================================= */

if (backBtn) {
    backBtn.addEventListener("click", () => {
        if (appDetails) appDetails.hidden = true;
        if (appsSection) appsSection.hidden = false;

        window.scrollTo({
            top: appsSection
                ? appsSection.offsetTop - 70
                : 0,
            behavior: "smooth"
        });
    });
}


/* =========================================
   SEARCH
========================================= */

function searchApps() {
    if (!searchInput) return;

    const searchTerm = searchInput.value.trim().toLowerCase();

    const selectedButton =
        document.querySelector(".category-btn.active");

    const selectedCategory =
        selectedButton?.dataset.category || "all";

    const filteredApps = apps.filter(app => {
        const matchesSearch =
            app.name.toLowerCase().includes(searchTerm) ||
            app.description.toLowerCase().includes(searchTerm) ||
            app.category.toLowerCase().includes(searchTerm);

        const matchesCategory =
            selectedCategory === "all" ||
            app.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    displayApps(filteredApps);
}

if (searchInput) {
    searchInput.addEventListener("input", searchApps);

    searchInput.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            searchApps();
        }
    });
}

if (searchBtn) {
    searchBtn.addEventListener("click", searchApps);
}


/* =========================================
   CATEGORY FILTER
========================================= */

categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");
        searchApps();
    });
});


/* =========================================
   MOBILE MENU
========================================= */

if (menuBtn && navbar) {
    menuBtn.addEventListener("click", () => {
        navbar.classList.toggle("active");
    });
}

document.querySelectorAll(".navbar a").forEach(link => {
    link.addEventListener("click", () => {
        if (navbar) navbar.classList.remove("active");
    });
});


/* =========================================
   INITIAL LOAD
========================================= */

loadApps();


/* =========================================
   CONSOLE MESSAGE
========================================= */

console.log("APK Vault JavaScript initialized.");
