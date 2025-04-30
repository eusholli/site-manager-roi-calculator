# Technical Context: Rakuten Site Manager ROI Calculator

## 1. Core Technologies

-   **HTML5:** Used for structuring the web page content. Semantic HTML is prioritized for accessibility and maintainability.
-   **CSS3:** Used for styling the application, implementing the responsive design, and applying the Rakuten Symphony visual guidelines.
    -   **CSS Variables:** Extensively used to manage design tokens (colors, fonts, spacing) derived from `RS_design.json`.
    -   **Layout:** Flexbox and CSS Grid for responsive layouts.
    -   **Media Queries:** For adapting styles to different screen sizes (mobile, tablet, desktop).
    -   **CSS Visualizations:** Pure CSS techniques for charts (conic-gradient for pie chart, styled divs for bar chart).
-   **JavaScript (ES6+):** Used for implementing the calculator logic, handling user interactions (DOM manipulation, event listeners), and updating the UI dynamically. No external JS frameworks are used to maintain simplicity.

## 2. Development Setup & Environment

-   **Environment:** Standard web browser development tools (Inspector, Console).
-   **Code Editor:** VS Code.
-   **Version Control:** Git, hosted on GitHub.
-   **Dependencies:**
    -   **None.** Pure HTML, CSS, JS implementation without external libraries.
    -   **Fonts:** Montserrat (Google Fonts) as fallback for Rakuten Sans.
-   **Build Process:** None required. Direct deployment of static files.
-   **Documentation:** README.md file with project overview, features, and deployment instructions.

## 3. Design System Integration (`RS_design.json`)

-   **Colors:** Primary, secondary, accent, background, and text colors extracted from `RS_design.json` and defined as CSS variables.
-   **Typography:** 
    -   Font families reference `Rakuten Sans` with Montserrat as fallback.
    -   Font sizes and weights for headings (h1-h4) and body text implemented according to specifications.
    -   Font imports handled via CSS `@import`.
-   **Components:** Custom components implemented using standard HTML/CSS, styled to match the visual appearance described in `RS_design.json`.
-   **Layout:** Adheres to common spacing units defined as CSS variables.
-   **Responsiveness:** Design adapts smoothly across screen sizes using media queries.

## 4. Technical Constraints

-   **Static Site:** Functions entirely client-side without a backend.
-   **GitHub Pages Compatibility:** Code is deployable as static files on GitHub Pages.
-   **Performance:** Lightweight and fast-loading with no external dependencies.
-   **Browser Compatibility:** Targets modern evergreen browsers (latest Chrome, Firefox, Safari, Edge).

## 5. Tool Usage Patterns

-   **DOM Manipulation:** Standard `document.getElementById`, `document.querySelector`, `element.textContent`, `element.style`, `element.classList`.
-   **Event Handling:** `element.addEventListener` for `input` events to trigger calculations on user input.
-   **Calculations:** 
    -   Modular JavaScript functions for arithmetic operations based on `calculator.md`.
    -   Project Speed Savings, Cost Savings, and Labor/Admin Savings calculations.
    -   ROI calculation based on total annual savings relative to total project costs.
-   **Number Formatting:** `Intl.NumberFormat` for currency and percentages with locale-aware formatting.
-   **Chart Generation:** Pure CSS techniques with dynamic JavaScript updates:
    -   Pie chart using CSS conic-gradient with dynamically calculated percentages.
    -   Bar chart using styled divs with dynamic height calculations.
