/*
============================================================

 ChronoMate 2026
 Report Window Module

============================================================
*/


function openReportWindow(report) {
    console.log(report);

    const safe = value => value || "Not entered";

const isDarkReport = document.body.classList.contains("dark");

const reportTheme = {
    bodyBg: isDarkReport ? "#0f172a" : "#ffffff",
    text: isDarkReport ? "#e5e7eb" : "#111111",
    panel: isDarkReport ? "#111827" : "#ffffff",
    border: isDarkReport ? "#374151" : "#cccccc",
    tableHeader: isDarkReport ? "#1f2937" : "#f3f4f6",
    muted: isDarkReport ? "#9ca3af" : "#555555"
};

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
                    color: ${reportTheme.text};
                    background: ${reportTheme.bodyBg};
                }
                
                .report-toolbar {
                    display: flex;
                    justify-content: flex-end;
                    margin-bottom: 20px;
                }

                .report-toolbar button {
                    padding: 10px 16px;
                    border: none;
                    border-radius: 8px;
                    background: #8bc53f;
                    color: #111;
                    font-size: 1rem;
                    font-weight: bold;
                    cursor: pointer;
                }

                .report-toolbar button:hover {
                    filter: brightness(0.95);
                }
                .report-header {
                    text-align: center;
                    border-bottom: 3px solid #8bc53f;
                    padding-bottom: 20px;
                    margin-bottom: 25px;
                }

                .report-header img {
                    width: 90px;
                    height: auto;
                    display: block;
                    margin: 0 auto 15px auto;
                }
                h1 {
                    margin: 0;
                    text-align: center;
                }

                h2 {
                    margin-top: 28px;
                    border-bottom: 1px solid ${reportTheme.border};
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
                    border: 1px solid ${reportTheme.border};
                    padding: 8px;
                    text-align: center;
                }

                th {
                    background: ${reportTheme.tableHeader};
                }

                footer {
                    margin-top: 35px;
                    padding-top: 12px;
                    border-top: 1px solid ${reportTheme.border};
                    font-size: 0.85rem;
                    color: ${reportTheme.muted};
                    text-align: center;
                }
      /* Magic Print Button */

                @media print {

                .report-toolbar {
                    display: none;
                }

                body {
                    background: white !important;
                    color: black !important;
                }

            }
        </style>

        </head>
        <body>
            <div class="report-toolbar">
                <button onclick="window.print()">🖨 Print / Save PDF</button>
            </div>

            <div class="report-header">
                <img src="assets/logo.png" alt="ChronoMate Logo">
                    <h1>ChronoMate 2026</h1>
                    <p>Chronograph Report</p>
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
