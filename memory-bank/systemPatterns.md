# System Patterns: Rakuten Site Manager ROI Calculator

## 1. Architecture Overview

This project is a **client-side static web application**. All calculations and rendering happen directly in the user's browser.

-   **Structure:** Single Page Application (SPA) implemented with a single HTML file (`index.html`), CSS styling (`style.css`), and JavaScript logic (`script.js`).
-   **Data Flow:**
    1.  User enters data into input fields (HTML form elements).
    2.  JavaScript captures input changes via event listeners.
    3.  JavaScript performs calculations based on the logic in `calculator.md`.
    4.  JavaScript updates the output display areas and visualizations with the results.
-   **No Backend:** No server-side processing or database is required for the core functionality.

```mermaid
graph LR
    A[User Interface (HTML/CSS)] -- Input Events --> B(JavaScript Logic);
    B -- Updates --> A;
    B -- Reads --> C{Calculation Logic};
    B -- Reads --> D{Design Styles};
    A -- Styled By --> D;
```

## 2. Key Technical Decisions

-   **Core Technologies:** Vanilla HTML, CSS, and JavaScript are used to keep the application lightweight and dependency-free, suitable for GitHub Pages.
-   **CSS Styling:**
    -   Direct CSS rules in `style.css`.
    -   CSS variables (custom properties) derived from `RS_design.json` for colors, fonts, and spacing, ensuring adherence to the Rakuten Symphony design system.
    -   Flexbox and CSS Grid for responsive layout.
-   **JavaScript Implementation:**
    -   Standard DOM manipulation to read inputs and update outputs.
    -   Event listeners to trigger calculations on user input.
    -   Modular functions to encapsulate calculation logic for clarity and reusability.
    -   Custom visualization implementations using CSS and DOM manipulation rather than external libraries.
-   **Responsiveness:** Implemented with media queries at 900px and 600px breakpoints to adapt the layout for different screen sizes.
-   **State Management:** Application state (input values, calculated results) is managed directly within the DOM and JavaScript variables.

## 3. Design Patterns

-   **Input Handling:** HTML form elements with clear labels. Values are read directly from the DOM when calculations are triggered.
-   **Output Display:** Dedicated HTML elements with unique IDs for displaying calculated results. Numbers are formatted appropriately using `Intl.NumberFormat`.
-   **Visualizations:**
    -   **Summary Banner:** Large, prominent text elements with grid layout.
    -   **Pie Chart:** Implemented using CSS `conic-gradient` with dynamic calculation of gradient stops.
    -   **Bar Chart:** Implemented using styled `div` elements with dynamic height calculation.
    -   **Timeline:** Implemented using positioned elements with dynamic indicator placement.
-   **Modularity (Code Structure):**
    -   Separate HTML structure, CSS styling, and JavaScript logic into distinct files.
    -   JavaScript organized into logical sections:
        -   DOM references
        -   Formatting helpers
        -   Calculation functions
        -   UI update functions
        -   Chart generation functions
        -   Event handling

## 4. Deployment Strategy

-   **GitHub Pages:** Files are placed in the root directory of the GitHub repository. GitHub Pages can be configured to serve from this location.
