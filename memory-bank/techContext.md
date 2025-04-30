# Technical Context: Rakuten Site Manager ROI Calculator

## 1. Core Technologies

-   **HTML5:** Used for structuring the web page content. Semantic HTML was prioritized for accessibility and maintainability.
-   **CSS3:** Used for styling the application, implementing the responsive design, and applying the Rakuten Symphony visual guidelines.
    -   **CSS Variables:** Used extensively to manage design tokens (colors, fonts, spacing) derived from `RS_design.json`.
    -   **Layout:** Flexbox and CSS Grid for responsive layouts.
    -   **Media Queries:** Implemented at 900px and 600px breakpoints for adapting styles to different screen sizes.
-   **JavaScript (ES6+):** Used for implementing the calculator logic, handling user interactions, and updating the UI dynamically.

## 2. Development Setup & Environment

-   **Environment:** Standard web browser development tools (Inspector, Console).
-   **Code Editor:** VS Code.
-   **Version Control:** Git, hosted on GitHub.
-   **Dependencies:** None. Pure HTML, CSS, JS implementation.
-   **Build Process:** None required. Direct deployment of static files.

## 3. Design System Integration (`RS_design.json`)

-   **Colors:** Primary (#293a7a), secondary (#ecebf3), accent (#d10000), background (#ffffff), and text (#000000) colors were extracted from `RS_design.json` and defined as CSS variables.
-   **Typography:** Font families ("SF Pro Display"), sizes, and weights for headings (h1-h4) and body text were implemented according to the specifications, replacing Rakuten Sans with SF Pro for better availability and compatibility.
-   **Components:** Custom components were implemented using standard HTML/CSS, styled to match the visual appearance described in the design guidelines. Added Rakuten Symphony logo in the header using SVG.
-   **Layout:** Common spacing units (5px, 10px, 20px, 30px) were used for consistent spacing throughout the application.
-   **Responsiveness:** The design adapts smoothly across screen sizes with specific breakpoints at 900px and 600px.

## 4. Technical Constraints

-   **Static Site:** Functions entirely client-side without a backend.
-   **GitHub Pages Compatibility:** Code is deployable as static files on GitHub Pages.
-   **Performance:** Kept lightweight and fast-loading with no external dependencies.
-   **Browser Compatibility:** Targets modern evergreen browsers (latest Chrome, Firefox, Safari, Edge).

## 5. Tool Usage Patterns

-   **DOM Manipulation:** Standard `document.getElementById`, `document.querySelector`, `element.textContent`, etc.
-   **Event Handling:** `form.addEventListener('input', calculateAndDisplay)` for capturing all input changes.
-   **Calculations:** Modular JavaScript functions for arithmetic operations based on `calculator.md`.
-   **Number Formatting:** `Intl.NumberFormat` for currency, percentages, and numbers with appropriate localization.
-   **Visualization Techniques:**
    -   **Pie Chart:** CSS `conic-gradient` with dynamically calculated gradient stops.
    -   **Bar Chart:** Styled `div` elements with dynamic height calculation.
    -   **Timeline:** Positioned elements with dynamic indicator placement.

## 6. Implementation Details

-   **Input Handling:** All input fields are numeric with appropriate min/max/step attributes and default values. Added JavaScript validation to ensure percentage values are within reasonable bounds (0-100%) to prevent calculation errors.
-   **Calculation Logic:** Follows the formulas specified in `calculator.md` exactly, with proper handling of edge cases.
-   **Output Formatting:** Currency values are formatted without decimal places, percentages as whole numbers, and durations with one decimal place.
-   **Real-time Updates:** All calculations and visualizations update instantly when any input value changes.
-   **Responsive Behavior:**
    -   Desktop: Two-column layout with inputs on the left and outputs on the right.
    -   Tablet (<900px): Single-column layout with inputs above outputs.
    -   Mobile (<600px): Compact layout with adjusted font sizes and spacing.
