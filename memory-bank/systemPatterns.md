# System Patterns: Rakuten Site Manager ROI Calculator

## 1. Architecture Overview

This project is a **client-side static web application**. All calculations and rendering happen directly in the user's browser.

-   **Structure:** Single Page Application (SPA) feel, implemented with separate HTML, CSS, and JavaScript files (`index.html`, `style.css`, `script.js`) for better organization and maintainability.
-   **Data Flow:**
    1.  User enters data into input fields (HTML form elements).
    2.  JavaScript captures input changes (on `input` events).
    3.  JavaScript performs calculations based on the logic in `calculator.md`.
    4.  JavaScript updates the output display areas (HTML elements) and charts with the results.
-   **No Backend:** No server-side processing or database is required for the core functionality.

```mermaid
graph LR
    A[User Interface (HTML/CSS)] -- Input Events --> B(JavaScript Logic);
    B -- Updates --> A;
    B -- Reads --> C{Calculation Logic (calculator.md)};
    B -- Reads --> D{Design Styles (RS_design.json)};
    A -- Styled By --> D;
```

## 2. Key Technical Decisions

-   **Core Technologies:** Vanilla HTML, CSS, and JavaScript are used to keep the application lightweight and dependency-free, suitable for GitHub Pages.
-   **CSS Styling:**
    -   Direct CSS rules in `style.css`.
    -   CSS variables (custom properties) derived from `RS_design.json` for colors, fonts, and spacing, ensuring adherence to the Rakuten Symphony design system.
    -   Flexbox and CSS Grid for responsive layout.
    -   Montserrat font as fallback for Rakuten Sans.
-   **JavaScript Implementation:**
    -   Standard DOM manipulation (`getElementById`, `querySelector`, `textContent`) to read inputs and update outputs.
    -   Event listeners (`addEventListener`) to trigger calculations on input changes.
    -   Functions to encapsulate calculation logic for clarity and reusability.
    -   Pure CSS-based visualizations without external libraries.
-   **Responsiveness:** Media queries in CSS to adapt the layout for different screen sizes (desktop, tablet, mobile).
-   **State Management:** Application state (input values, calculated results) is managed directly within the DOM and JavaScript variables.

## 3. Design Patterns

-   **Input Handling:** HTML form elements (`<input type="number">`) with clear labels (`<label>`).
-   **Output Display:** Dedicated HTML elements (`<span>`, `<div>`) with unique IDs for displaying calculated results. Numbers formatted (currency, percentages) using `Intl.NumberFormat`.
-   **Calculation Logic:**
    -   Project Speed Savings: Calculate new duration and time saved based on efficiency improvements.
    -   Cost Savings: Calculate direct project cost savings based on cost reduction percentage.
    -   Labor/Admin Savings: Calculate savings from reduced manual work.
    -   ROI: Calculate return on investment as total annual savings relative to total project costs.
-   **Visualizations:**
    -   **Summary Banner:** Large, prominent text elements showing Total Annual Savings and ROI.
    -   **Savings Breakdown Pie Chart:** CSS conic-gradient showing proportion of cost vs. admin savings.
    -   **Project Duration Bar Chart:** Styled divs comparing before and after durations.
-   **Modularity (Code Structure):**
    -   Separate HTML structure, CSS styling, and JavaScript logic into distinct files.
    -   Within `script.js`, grouped related functions (input reading, calculations, output updating, chart generation).

## 4. Deployment Strategy

-   **GitHub Pages:** Files are placed in the root directory of the GitHub repository. GitHub Pages is configured to serve from this location.
-   **Documentation:** README.md file provides project overview, features, and deployment instructions.
