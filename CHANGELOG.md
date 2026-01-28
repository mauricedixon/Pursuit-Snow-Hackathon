# Changelog

All notable changes to the "Will It Snow? Hype Meter" project will be documented in this file.

## [Unreleased]

## [1.2.0] - 2026-01-27
### Added
- **Multi-City Support**: Added support for 7 major cities (Boston, NYC, Chicago, Detroit, Miami, San Francisco, Anchorage).
- **Zipcode Search**: Users can now search by US Zipcode to find local hype (powered by Zippopotam.us).
- **City Selector**: New UI component to switch locations easily.
- **Live Data Visibility**: Dashboard now displays raw temperature, condition, and wind speed to verify real-time data.
- **Context-Aware AI**: `aiService` now includes the city name and specific conditions in its "Hype Summaries".
- **Visual Polish**: Added "Snow Particle System" (Blizzard) and Dynamic Backgrounds that react to Hype Score.
- **Layout Improvements**: Centered the main header and improved mobile responsiveness.

## [1.1.0] - 2026-01-27
### Changed
- **Real Weather Data**: Migrated from Mock Service to **Open-Meteo API**.
- **Dynamic Scoring**: `hypeEngine` now calculates scores based on live API data (Temperature + Weather Codes).
- **Bug Fixes**: Fixed hardcoded year in AI summary (now dynamic).

## [1.0.0] - 2026-01-27
### Initial Release
- **Core Architecture**: React + Vite + Tailwind CSS v4 setup.
- **Hype Dashboard**: Main visualization with "Glitch Text" and "Hype Gauge" properties.
- **HypeContext**: Global state management backbone.
- **Mock Services**: Initial mock implementations for weather and AI logic.
