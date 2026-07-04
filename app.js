/*
============================================================

 ChronoMate 2026
 Version : v0.5.0

 Author:
 Chris Bruce (CBDesignS)

 Developed with ChatGPT (OpenAI GPT-5.5)

 https://github.com/CBDesignS/ChronoMate

============================================================
*/


//============================================================
// Global Variables
//============================================================

let ammoDatabase = [];
let shotHistory = [];


//============================================================
// DOM Elements
//============================================================

const calibreSelect      = document.getElementById("calibre");
const manufacturerSelect = document.getElementById("manufacturer");
const ammoSelect         = document.getElementById("ammo");

const customWeightInput  = document.getElementById("customWeight");

const velocityInput      = document.getElementById("velocity");
const velocityUnits      = document.getElementById("velocityUnits");

const powerMode          = document.getElementById("powerMode");

const grainsDisplay      = document.getElementById("weightGrains");
const gramsDisplay       = document.getElementById("weightGrams");

const energyFTLB         = document.getElementById("energyFTLB");
const energyJoules       = document.getElementById("energyJoules");

const velocityFPS        = document.getElementById("velocityFPS");
const velocityMPS        = document.getElementById("velocityMPS");

const powerStatus        = document.getElementById("powerStatus");
const powerBar           = document.getElementById("powerBar");

const shotTable          = document.getElementById("shotTable");
const statistics         = document.getElementById("statistics");

const addShotButton      = document.getElementById("btnAddShot");


//============================================================
// Utility Functions
//============================================================

function grainsToGrams(grains)
{
    return grains * 0.06479891;
}


function metresToFPS(ms)
{
    return ms * 3.28084;
}


function fpsToMetres(fps)
{
    return fps / 3.28084;
}


//============================================================
// Load Ammo Database
//============================================================

function loadAmmoDatabase()
{
    ammoDatabase =
        calibreSelect.value === ".177"
            ? ammo177
            : ammo22;

    buildManufacturerList();
}


//============================================================
// Build Manufacturer List
//============================================================

function buildManufacturerList()
{
    manufacturerSelect.innerHTML = "";

    const manufacturers =
        [...new Set(
            ammoDatabase.map(item => item.manufacturer)
        )].sort();

    manufacturers.forEach(manufacturer =>
    {
        const option = document.createElement("option");

        option.value = manufacturer;
        option.textContent = manufacturer;

        manufacturerSelect.appendChild(option);
    });

    buildAmmoList();
}
//============================================================
// Build Ammo List
//============================================================

function buildAmmoList()
{
    ammoSelect.innerHTML = "";

    const manufacturer = manufacturerSelect.value;

    const ammoList = ammoDatabase.filter(item =>
        item.manufacturer === manufacturer
    );

    ammoList.forEach((ammo, index) =>
    {
        const option = document.createElement("option");

        option.value = index;
        option.textContent =
            `${ammo.name} (${ammo.grains.toFixed(2)} gr)`;

        ammoSelect.appendChild(option);
    });

    updateSelectedAmmo();
}


//============================================================
// Update Selected Ammo
//============================================================

function updateSelectedAmmo()
{
    const manufacturer = manufacturerSelect.value;

    const ammoList = ammoDatabase.filter(item =>
        item.manufacturer === manufacturer
    );

    const selectedAmmo = ammoList[ammoSelect.selectedIndex];

    if (!selectedAmmo)
        return;

    grainsDisplay.textContent =
        selectedAmmo.grains.toFixed(2);

    gramsDisplay.textContent =
        grainsToGrams(selectedAmmo.grains).toFixed(3);

    calculateEnergy();
}


//============================================================
// Get Current Pellet Weight
//============================================================

function getCurrentWeight()
{
    const custom =
        parseFloat(customWeightInput.value);

    if (!isNaN(custom) && custom > 0)
        return custom;

    const manufacturer =
        manufacturerSelect.value;

    const ammoList =
        ammoDatabase.filter(item =>
            item.manufacturer === manufacturer
        );

    const selectedAmmo =
        ammoList[ammoSelect.selectedIndex];

    if (!selectedAmmo)
        return 0;

    return selectedAmmo.grains;
}


//============================================================
// Register Event Listeners
//============================================================

calibreSelect.addEventListener(
    "change",
    loadAmmoDatabase
);

manufacturerSelect.addEventListener(
    "change",
    buildAmmoList
);

ammoSelect.addEventListener(
    "change",
    updateSelectedAmmo
);

customWeightInput.addEventListener(
    "input",
    calculateEnergy
);

velocityInput.addEventListener(
    "input",
    calculateEnergy
);

velocityUnits.addEventListener(
    "change",
    calculateEnergy
);

powerMode.addEventListener(
    "change",
    calculateEnergy
);
//============================================================
// Calculate Energy
//============================================================

function calculateEnergy()
{
    const weight = getCurrentWeight();

    let fps = parseFloat(velocityInput.value);

    if (isNaN(fps))
        fps = 0;

    if (velocityUnits.value === "mps")
    {
        fps = metresToFPS(fps);
    }

    const mps = fpsToMetres(fps);

    const ftlb =
        (weight * fps * fps) / 450240;

    const joules =
        ftlb * 1.35582;

    velocityFPS.textContent =
        fps.toFixed(1);

    velocityMPS.textContent =
        mps.toFixed(1);

    energyFTLB.textContent =
        ftlb.toFixed(2);

    energyJoules.textContent =
        joules.toFixed(2);

    updatePowerBar(ftlb);

    return {

        fps: fps,

        mps: mps,

        ftlb: ftlb,

        joules: joules

    };
}


//============================================================
// Update Power Bar
//============================================================

function updatePowerBar(ftlb)
{
    let maxPower = 12;

    if (powerMode.value === "999")
    {
        maxPower = 40;
    }

    const percentage =
        Math.min(
            (ftlb / maxPower) * 100,
            100
        );

    powerBar.style.width =
        percentage + "%";

    if (powerMode.value === "999")
    {
        powerBar.style.background =
            "#2563eb";

        powerStatus.className =
            "status";

        powerStatus.textContent =
            "FAC MODE";

        return;
    }

    if (ftlb < 11.50)
    {
        powerBar.style.background =
            "#22c55e";

        powerStatus.className =
            "status safe";

        powerStatus.textContent =
            "SAFE";
    }
    else if (ftlb < 12.00)
    {
        powerBar.style.background =
            "#f59e0b";

        powerStatus.className =
            "status warning";

        powerStatus.textContent =
            "CAUTION";
    }
    else
    {
        powerBar.style.background =
            "#ef4444";

        powerStatus.className =
            "status danger";

        powerStatus.textContent =
            "OVER LIMIT";
    }
}
//============================================================
// Add Shot
//============================================================

function addShot()
{
    const result = calculateEnergy();

    if (result.fps <= 0)
        return;

    shotHistory.push(result);

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${shotHistory.length}</td>
        <td>${result.fps.toFixed(1)}</td>
        <td>${result.ftlb.toFixed(2)}</td>
        <td>${result.joules.toFixed(2)}</td>
    `;

    shotTable.appendChild(row);

    updateStatistics();

    velocityInput.value = "";
    velocityInput.focus();
}


//============================================================
// Update Statistics
//============================================================

function updateStatistics()
{
    if (shotHistory.length === 0)
    {
        statistics.textContent =
            "No shots recorded.";

        return;
    }

    const fpsValues =
        shotHistory.map(shot => shot.fps);

    const highest =
        Math.max(...fpsValues);

    const lowest =
        Math.min(...fpsValues);

    const average =
        fpsValues.reduce((a, b) => a + b, 0)
        / fpsValues.length;

    const spread =
        highest - lowest;

    statistics.innerHTML = `
        Shots : ${shotHistory.length}<br>
        Average FPS : ${average.toFixed(1)}<br>
        Highest FPS : ${highest.toFixed(1)}<br>
        Lowest FPS : ${lowest.toFixed(1)}<br>
        Extreme Spread : ${spread.toFixed(1)}
    `;
}


//============================================================
// Application Initialisation
//============================================================

addShotButton.addEventListener(
    "click",
    addShot
);

loadAmmoDatabase();
//============================================================
// Theme Support
//============================================================

const themeButton =
    document.getElementById("themeToggle");


function setTheme(theme)
{
    if(theme==="dark")
    {
        document.body.classList.add("dark");

        themeButton.textContent="🌙 Dark";
    }
    else
    {
        document.body.classList.remove("dark");

        themeButton.textContent="☀ Light";
    }

    localStorage.setItem(
        "chronomate-theme",
        theme
    );
}


themeButton.addEventListener(
    "click",
    () =>
    {
        const dark =
            document.body.classList.contains("dark");

        setTheme(
            dark ? "light" : "dark"
        );
    }
);


const savedTheme =
    localStorage.getItem(
        "chronomate-theme"
    );

setTheme(
    savedTheme ?? "dark"
);
//============================================================
// Report Data Helpers
//============================================================

function getSelectedAmmoForReport()
{
    const manufacturer =
        manufacturerSelect.value;

    const ammoList =
        ammoDatabase.filter(item =>
            item.manufacturer === manufacturer
        );

    const selectedAmmo =
        ammoList[ammoSelect.selectedIndex];

    if (!selectedAmmo)
        return null;

    return {
        calibre : calibreSelect.value,
        manufacturer : selectedAmmo.manufacturer,
        name : selectedAmmo.name,
        grains : selectedAmmo.grains,
        grams : grainsToGrams(selectedAmmo.grains)
    };
}


function getStatisticsForReport()
{
    if (shotHistory.length === 0)
    {
        return {
            shotCount : 0
        };
    }

    const fpsValues =
        shotHistory.map(shot => shot.fps);

    const energyValues =
        shotHistory.map(shot => shot.ftlb);

    const highestFPS =
        Math.max(...fpsValues);

    const lowestFPS =
        Math.min(...fpsValues);

    const averageFPS =
        fpsValues.reduce((a, b) => a + b, 0)
        / fpsValues.length;

    const highestFTLB =
        Math.max(...energyValues);

    const lowestFTLB =
        Math.min(...energyValues);

    const averageFTLB =
        energyValues.reduce((a, b) => a + b, 0)
        / energyValues.length;

    return {
        shotCount : shotHistory.length,
        averageFPS : averageFPS,
        highestFPS : highestFPS,
        lowestFPS : lowestFPS,
        extremeSpreadFPS : highestFPS - lowestFPS,
        averageFTLB : averageFTLB,
        highestFTLB : highestFTLB,
        lowestFTLB : lowestFTLB,
        selectedLimit : powerMode.value === "999" ? "FAC" : "Sub-12 ft-lb",
        result :
            powerMode.value === "999"
                ? "FAC MODE"
                : highestFTLB < 12
                    ? "PASS"
                    : "OVER SELECTED LIMIT"
    };
}


function getChronoMateReport()
{
    return buildReportSnapshot(
        getSelectedAmmoForReport(),
        structuredClone(shotHistory),
        getStatisticsForReport()
    );
}
//============================================================
// Generate Report Preview
//============================================================

const generateReportButton =
    document.getElementById("btnGenerateReport");

function generateReportPreview() {
    const report = getChronoMateReport();

    openReportWindow(report);
}

if(generateReportButton)
{
    generateReportButton.addEventListener(
        "click",
        generateReportPreview
    );
}
//============================================================
// Clear Shot String
//============================================================

const clearShotsButton =
    document.getElementById("btnClearShots");


if(clearShotsButton)
{

    clearShotsButton.addEventListener(

        "click",

        clearShotHistory

    );

}


function clearShotHistory()
{
    if(shotHistory.length===0)
    {
        alert("There are no shots to clear.");
        return;
    }

    const confirmed = confirm(
        "Clear the current shot string?\n\nAll recorded shots for this session will be removed."
    );

    if(!confirmed)
        return;

    shotHistory = [];

    shotTable.innerHTML = "";

    statistics.textContent =
        "No shots recorded.";

    energyFTLB.textContent = "0.00";
    energyJoules.textContent = "0.00";
    velocityFPS.textContent = "0";
    velocityMPS.textContent = "0";

    powerStatus.textContent = "READY";
    powerStatus.className = "status safe";

    powerBar.style.width = "0%";
}
