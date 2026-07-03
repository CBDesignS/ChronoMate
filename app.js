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

    console.log(report);

    const safe = value => value || "Not entered";

    const shotRows = report.shots.map((shot, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${shot.fps.toFixed(1)}</td>
            <td>${shot.ftlb.toFixed(2)}</td>
            <td>${shot.joules.toFixed(2)}</td>
        </tr>
    `).join("");

    const reportWindow = window.open("", "ChronoMateReport");

    reportWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>ChronoMate Report</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 30px;
                    color: #111;
                    background: #fff;
                }

                .report-header {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    border-bottom: 3px solid #8bc53f;
                    padding-bottom: 15px;
                    margin-bottom: 25px;
                }

                .report-header img {
                    width: 90px;
                    height: auto;
                }

                h1, h2 {
                    margin: 0;
                }

                h2 {
                    margin-top: 28px;
                    border-bottom: 1px solid #ccc;
                    padding-bottom: 6px;
                }

                .result-banner {
                    margin: 25px 0;
                    padding: 16px;
                    text-align: center;
                    font-size: 1.4rem;
                    font-weight: bold;
                    border-radius: 8px;
                    background: ${report.statistics.result === "PASS" ? "#dcfce7" : "#fee2e2"};
                    color: ${report.statistics.result === "PASS" ? "#166534" : "#991b1b"};
                }

                .info-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 10px 30px;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 12px;
                }

                th, td {
                    border: 1px solid #ccc;
                    padding: 8px;
                    text-align: center;
                }

                th {
                    background: #f3f4f6;
                }

                footer {
                    margin-top: 35px;
                    padding-top: 12px;
                    border-top: 1px solid #ccc;
                    font-size: 0.85rem;
                    color: #555;
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <div class="report-header">
                <img src="assets/logo.png" alt="ChronoMate Logo">
                <div>
                    <h1>ChronoMate 2026</h1>
                    <p>Chronograph Report</p>
                </div>
            </div>

            <div class="result-banner">
                ${report.statistics.result || "NO RESULT"}
            </div>

            <h2>Session Information</h2>
            <div class="info-grid">
                <div><strong>Tester:</strong> ${safe(report.session.tester)}</div>
                <div><strong>Chronograph:</strong> ${safe(report.session.chronograph)}</div>
                <div><strong>Date:</strong> ${safe(report.session.sessionDate)}</div>
                <div><strong>Time:</strong> ${safe(report.session.sessionTime)}</div>
            </div>

            <h2>Rifle Information</h2>
            <div class="info-grid">
                <div><strong>Manufacturer:</strong> ${safe(report.session.rifle.manufacturer)}</div>
                <div><strong>Model:</strong> ${safe(report.session.rifle.model)}</div>
                <div><strong>Serial:</strong> ${safe(report.session.rifle.serial)}</div>
                <div><strong>Configuration:</strong> ${safe(report.session.rifle.configuration)}</div>
            </div>

            <h2>Ammunition</h2>
            <div class="info-grid">
                <div><strong>Calibre:</strong> ${safe(report.ammo?.calibre)}</div>
                <div><strong>Manufacturer:</strong> ${safe(report.ammo?.manufacturer)}</div>
                <div><strong>Pellet:</strong> ${safe(report.ammo?.name)}</div>
                <div><strong>Weight:</strong> ${report.ammo ? report.ammo.grains.toFixed(2) + " gr" : "Not entered"}</div>
            </div>

            <h2>Shot String</h2>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Velocity FPS</th>
                        <th>ft-lb</th>
                        <th>Joules</th>
                    </tr>
                </thead>
                <tbody>
                    ${shotRows || `<tr><td colspan="4">No shots recorded</td></tr>`}
                </tbody>
            </table>

            <h2>Statistics</h2>
            <div class="info-grid">
                <div><strong>Shots:</strong> ${report.statistics.shotCount || 0}</div>
                <div><strong>Average FPS:</strong> ${report.statistics.averageFPS ? report.statistics.averageFPS.toFixed(1) : "N/A"}</div>
                <div><strong>Highest FPS:</strong> ${report.statistics.highestFPS ? report.statistics.highestFPS.toFixed(1) : "N/A"}</div>
                <div><strong>Lowest FPS:</strong> ${report.statistics.lowestFPS ? report.statistics.lowestFPS.toFixed(1) : "N/A"}</div>
                <div><strong>Extreme Spread:</strong> ${report.statistics.extremeSpreadFPS ? report.statistics.extremeSpreadFPS.toFixed(1) : "N/A"}</div>
                <div><strong>Highest ft-lb:</strong> ${report.statistics.highestFTLB ? report.statistics.highestFTLB.toFixed(2) : "N/A"}</div>
            </div>

            <footer>
                ChronoMate version ${report.software.version} |
                Generated ${new Date(report.software.generated).toLocaleString()} |
                https://github.com/CBDesignS/ChronoMate
            </footer>
        </body>
        </html>
    `);

    reportWindow.document.close();
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
