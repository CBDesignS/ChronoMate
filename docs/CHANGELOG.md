# ChronoMate 2026 Changelog

This document records the complete development history of **ChronoMate 2026**.

Each release represents a stable milestone in the evolution of the project, documenting the progression from the initial chronograph recorder through to the Version 1.0.0 stable release.

Core application development concluded with **Version 0.9.0**.

Subsequent releases focused on documentation, project polish and long-term maintainability.

---

## v1.0.0 – Stable Release

### Completed

- Final review of all application features.
- Completed the project documentation library.
- Finalised user guides and reference documentation.
- Completed the full development changelog.
- Released ChronoMate Version 1.0.0.

### Notes

ChronoMate Version 1.0.0 marks the completion of the original project vision.

Future development will focus on:

- Built-in ammunition database expansion.
- Bug fixes.
- Long-term maintenance.

New functionality will only be considered where it directly improves the recording, reporting or management of chronograph sessions while preserving ChronoMate's lightweight design philosophy.

---

## Version 0.9.9 - Final Release Candidate

### Added
- Added support for entering custom pellet weights in either **grains** or **grams**.
- Added automatic weight conversion when switching between grains and grams during data entry.
- Added the ability to delete previously saved User Pellets with confirmation.
- Added permanent access to the **User Ammo** manufacturer option, allowing new users to create their first custom pellet without requiring an existing entry.

### Fixed
- Fixed a regression where the **User Ammo** option disappeared when no custom pellets existed for the selected calibre.
- Corrected the custom pellet workflow to ensure user pellets can always be added, edited through deletion/recreation, exported and restored correctly.
- Verified compatibility of Backup & Restore with the updated user pellet system.

### Improved
- Refined the custom pellet management workflow.
- Improved overall usability for users working with metric-only pellet scales.
- Updated interface text and documentation to match the final application behaviour.

### Release Status
- Final testing completed for all core functionality including:
  - Built-in pellet database (.177, .22 and .25)
  - User Pellet management
  - Saved Rifles
  - Backup & Restore
  - Report generation
  - Documentation
- ChronoMate v0.9.9 designated as the final release candidate prior to the official **v1.0.0** release.

---

## Version 0.9.8 - Documentation Update

### Added
- Completed the ChronoMate documentation ready for the v1.0.0 release.
- Added comprehensive user documentation covering installation, operation, backup and restore, frequently asked questions and version history.
- Added dedicated documentation screenshots for the main application window, ammunition selection, rifle management, backup and restore, and report generation.
- Organised all documentation images within the `/docs/images` folder.

### Improved
- Refined wording and formatting throughout all documentation for consistency and readability.
- Added cross-references between documentation sections where appropriate.
- Updated documentation to reflect .177, .22 and .25 calibre support.
- Simplified documentation by linking to screenshots rather than embedding large images directly into the guides.

### Changed
- Documentation now accurately reflects the final ChronoMate workflow and user interface prior to the v1.0.0 release.

---

## Version 0.9.7

### Added

* Added built-in support for **.25 calibre** air rifle pellets.
* Expanded the built-in pellet database with a range of currently available **.25** pellets from leading manufacturers.

### Improved

* Updated calibre selection to support **.177**, **.22** and **.25** built-in pellet databases.
* Expanded and refined the built-in pellet database using currently available production pellets.
* Updated project documentation to reflect .25 calibre support.
* Improved documentation consistency across the README and user guides.

### Notes

This release completes the planned expansion of the built-in pellet database before the Version **1.0.0** release.

ChronoMate remains feature complete, with development continuing to focus on documentation, testing and long-term maintainability rather than adding unnecessary features.

---

## Version 0.9.6

### Added

* Added built-in support for **.25 calibre** air rifle pellets.
* Expanded the built-in pellet database with a selection of currently available **.25** pellets from leading manufacturers.

### Improved

* Updated calibre selection to support **.177**, **.22** and **.25** built-in pellet databases.
* Expanded the built-in pellet database using currently available production pellets to improve out-of-the-box compatibility.
* Updated project documentation to reflect .25 calibre support and improve consistency across the documentation set.

---

## v0.9.5 – Complete Development History

### Added

- Added the complete ChronoMate development history.
- Completed the project changelog.
- Added documentation navigation between all project guides.

### Notes

Completed the final documentation required before the Version 1.0.0 stable release.

---

## v0.9.4 – Backup & Restore Guide

### Added

- Added the Backup & Restore Guide.
- Documented the built-in backup system.
- Explained user data portability.
- Documented backup compatibility.
- Added documentation navigation links.

### Notes

Completed the user data documentation covering application settings, saved rifle profiles and user pellet management.

---

## v0.9.3 – User Guide

### Added

- Added the complete User Guide.
- Documented the standard ChronoMate workflow.
- Added cross-links to related documentation.

### Notes

Provided a complete guide covering the recording of chronograph sessions from start to finish.

---

## v0.9.2 – README & Project Documentation

### Added

- Completely revised the project README.
- Added documentation links.
- Added project philosophy.
- Added project status information.
- Updated supported platform information.

### Changed

- Reorganised the GitHub landing page.
- Removed outdated platform references.

### Notes

Established the documentation structure used throughout the project.

---

## v0.9.1 – Installation Guide

### Added

- Created the new **docs** directory.
- Added documentation image support.
- Added the Installation Guide.

### Notes

Started the ChronoMate documentation library.

---

## v0.9.0 – Core Development Complete

### Added

- Configurable Shot String Target.
- Live Shot Counter.
- Visual completion indicator.

### Changed

- Improved shot recording workflow.
- Refined session handling.

### Notes

Completed the original ChronoMate feature set.

Development now moved from feature implementation to documentation, refinement and preparation for Version 1.0.0.

---

## v0.8.0 – Complete User Data Management

### Added

- Saved rifle profile management.
- User pellet management.
- Complete Backup & Restore support.
- Import and export of all user-created data.

### Changed

- Separated user-created pellet data from the built-in ammunition database.
- Improved long-term data portability between ChronoMate releases.

### Notes

Completed the user data management system while ensuring future ammunition database updates would never overwrite user-created information.

---

## v0.7.0 – Portable Backup System

### Added

- Portable Backup & Restore system.
- Export and Import buttons.
- JSON backup format.
- Enter key support for shot entry.

### Changed

- Improved application portability.
- Updated interface controls.

### Notes

Introduced portable user data management allowing ChronoMate installations to be safely moved between computers.

---

## v0.6.0 – Professional Reporting

### Added

- Dedicated report module (`report.js`).
- Improved landscape report layout.
- Professional report formatting.
- Optimised print output.

### Changed

- Separated report generation from the main application logic.
- Improved report readability.

### Notes

Established the report layout used by all future versions.

---

## v0.5.0 – Printable Reports

### Added

- Professional printable reports.
- Report preview window.
- Print toolbar.
- Browser PDF support.

### Changed

- Improved report presentation.
- Added support for light and dark report themes.

### Notes

Introduced the first complete reporting system, allowing chronograph sessions to be archived as printable reports or PDF files.

---

## v0.4.0 – Session Management

### Added

- Complete session information management.
- Rifle information management.
- Dedicated `session.js` module.
- Report snapshot engine.
- Software version tracking.
- Generate Report button.
- Clear Shot String with confirmation.

### Changed

- Separated session management from calculation logic.
- Improved application workflow.

### Notes

Prepared the application architecture for the printable reporting system introduced in Version 0.5.0.

---

## v0.3.0 – User Interface Refresh

### Added

- Complete user interface redesign.
- Modern card-based layout.
- ChronoMate branding.
- Application logo.
- Theme selector.
- Light and Dark themes.

### Changed

- Renamed `index.html` to `ChronoMate.html`.
- Improved overall project structure.

### Notes

Transformed ChronoMate from a functional prototype into a polished desktop-style application.

---

## v0.2.1 – Branding & Themes

### Added

- New ChronoMate branding.
- Application logo.
- Improved application header.
- Theme switching.

### Changed

- Improved usability.
- Refined application styling.

### Notes

Introduced the visual identity that remains part of ChronoMate today.

---

## v0.2.0 – Built-in Ammunition Database

### Added

- Built-in ammunition database.
- Support for .177 and .22 calibres.
- Manufacturer selection.
- Ammunition selection.
- Automatic pellet weight loading.
- User ammunition support.
- Dedicated `ammo.js` database module.

### Changed

- Replaced manual pellet entry with structured ammunition selection.
- Improved project organisation.

### Notes

Created the foundation for the ChronoMate ammunition database while separating application logic from ammunition data.

---

## v0.1.0 – Initial Release

### Added

- Initial ChronoMate application.
- Velocity recording.
- Multiple velocity units.
- Automatic muzzle energy calculations.
- ft-lb and Joule calculations.
- Shot recording.
- Shot history.
- Basic statistics.
- PASS / OVER LIMIT indication.
- Offline operation.
- Portable single-folder deployment.

### Project Goals

ChronoMate was designed from the beginning to remain:

- Lightweight
- Fast
- Offline
- Easy to use
- Easy to maintain
- Portable

The project has always focused on recording and reporting chronograph sessions without unnecessary features, ensuring the application remains simple, reliable and easy to maintain.

---

## Documentation Pages

← [Frequently Asked Questions](FAQ.md)

↑ [Project README](../README.md)


Doc Version 1.0.0
