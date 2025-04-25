# Doctor Listing Page (React + Tailwind CSS)

A responsive web application built with React.js and Tailwind CSS for searching, filtering, and sorting doctors with client-side functionality.

## Features

- **Autocomplete Search**: 
  - Real-time suggestions with debouncing
  - Shows top 3 matching doctor names
  - Filters results on selection or Enter key

- **Filter Panel**:
  - **Consultation Type**: Single-select radio buttons (Video/In-Clinic)
  - **Specialties**: Multi-select checkboxes (dynamically generated from API)
  - **Sorting**: By fees (low-to-high) or experience (high-to-low)

- **State Management**:
  - URL persistence with query parameters
  - Browser navigation support (Back/Forward)
  - State maintained on page reload

- **Responsive UI**:
  - Mobile-first design with Tailwind CSS
  - Clean, modern interface
  - Responsive sidebar filters

## Tech Stack

- **Frontend**: React.js (Functional Components + Hooks)
- **Styling**: Tailwind CSS
- **State Management**: React Context API (or Redux if used)
- **Routing**: React Router (if multi-page)
- **API Calls**: Axios/Fetch API

## Project Structure
/src
/components
DoctorCard.jsx
SearchBar.jsx
FilterPanel.jsx
SpecialityFilter.jsx
/context
DoctorContext.jsx
/hooks
useDoctors.js
useFilters.js
/utils
api.js
helpers.js
App.js
index.js


## Installation

1. Clone the repository:
```bash
git clone [repository-url]
Install dependencies:

bash
npm install
Run the development server:

bash
npm start
Open http://localhost:5173 in your browser

Data Source
Doctor data is fetched from:

https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json
Testing
The application includes all required data-testid attributes for testing:

Search input: autocomplete-input

Suggestion items: suggestion-item

Doctor cards: doctor-card

All filter components as specified

Run tests with:

bash
npm run dev

REACT_APP_API_URL=https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json
Available Scripts
npm start: Runs the app in development mode

npm test: Launches the test runner

npm run build: Builds the app for production

npm run eject: Ejects from Create React App (if used)


![image](https://github.com/user-attachments/assets/64e02ad0-2621-4186-bb8d-01957dcaef5e)

