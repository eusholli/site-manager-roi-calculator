# Rakuten Site Manager ROI Calculator

A responsive web-based calculator that demonstrates the financial benefits of using Rakuten Site Manager for project management. This tool helps potential customers visualize cost savings, efficiency improvements, and return on investment. 

## Overview

This calculator allows users to input their current operational metrics and see projected results when using Rakuten Site Manager. The calculator provides:

- Total annual savings calculation
- Return on investment (ROI) percentage
- Project duration reduction
- Cost savings breakdown
- Breakeven timeline

## Features

- **Interactive Inputs**: Adjust parameters to match your specific business scenario
- **Real-time Calculations**: See results update instantly as you modify inputs
- **Visual Representations**: 
  - Savings breakdown pie chart
  - Project duration comparison bar chart
  - Breakeven timeline visualization
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Rakuten Symphony Design**: Follows Rakuten Symphony design guidelines with SF Pro font and Rakuten Symphony logo in the header

## Technologies Used

- HTML5
- CSS3 (with CSS variables, Flexbox, and Grid)
- Vanilla JavaScript (ES6+)
  - Input validation to ensure percentage values are within reasonable bounds (0-100%)
  - Real-time calculation updates
  - Pure JavaScript/CSS visualizations without external libraries
- No external dependencies or frameworks

## Project Structure

```
site-manager-roi-calculator/
├── index.html          # Main HTML structure
├── style.css           # CSS styling and responsive design
├── script.js           # JavaScript calculation logic and chart rendering
├── rs_logo.svg         # Rakuten Symphony logo
├── calculator.md       # Original requirements specification
├── RS_design.json      # Rakuten Symphony design specifications
└── memory-bank/        # Project documentation
    ├── projectbrief.md
    ├── productContext.md
    ├── systemPatterns.md
    ├── techContext.md
    ├── activeContext.md
    └── progress.md
```

## How to Use

1. Open `index.html` in a web browser
2. Adjust the input values to match your business scenario:
   - Number of sites/projects managed per year
   - Average project duration
   - Average cost per site/project
   - Current on-time completion rate
   - Labor costs and administrative hours
   - Expected efficiency improvements and cost reductions
   - Platform cost for Site Manager
3. View the calculated results and visualizations that update in real-time
4. Use the "Contact Rakuten Symphony" button to learn more

## Implementation Details

### Visualizations
- **Savings Breakdown Pie Chart**: Implemented using CSS `conic-gradient` without external libraries
- **Project Duration Bar Chart**: Created using styled `div` elements with dynamic height calculation
- **Breakeven Timeline**: Developed using positioned elements with dynamic indicator placement

### Responsive Design
- Breakpoints at 900px and 600px to ensure usability across device sizes:
  - Desktop: Two-column layout with inputs on the left and outputs on the right
  - Tablet (<900px): Single-column layout with inputs above outputs
  - Mobile (<600px): Compact layout with adjusted font sizes and spacing

## Future Enhancements

Potential future improvements could include:

- Tooltips/info icons for input fields to provide more context
- PDF export of results
- Saving/loading different scenarios
- Multi-language support
- Advanced mode with more detailed inputs

## License

Copyright © 2025 Rakuten Symphony. All rights reserved.
