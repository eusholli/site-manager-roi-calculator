# Instructions: Create a Site Manager ROI Calculator for GitHub Pages

This document provides detailed guidance to build an effective, real-world **Site Manager ROI Calculator** that you can host on **GitHub Pages**.

The calculator should:
- Be **easy to use** (5-10 input fields maximum)
- Deliver **realistic, business-relevant output** (savings, efficiency gains, project speed improvements)
- **Clearly show** ROI metrics with simple charts and key highlights
- Be understandable **without needing a background in finance**

This tool will powerfully demonstrate Site Manager’s value to prospective users.

---

## 1. Platform Setup

You will create a **simple static web app**:
- **Languages**: HTML, CSS, JavaScript
- **Framework**: Lightweight (Optional: TailwindCSS for design polish)
- **Hosting**: GitHub Pages

---

## 2. User Inputs (Powerful but Simple)

These inputs balance realism with usability.

| Field Name | Description | Default Value | Notes |
|:-----------|:------------|:--------------|:------|
| **Number of Sites/Projects Managed per Year** | How many distributed sites or major projects are managed annually. | 500 | Telecom, energy, real estate, construction, manufacturing |
| **Average Project Duration (weeks)** | How long a typical site/project takes to complete today. | 20 weeks | Before using Site Manager |
| **Average Cost per Site/Project ($)** | Total cost including labor, materials, delays, etc. | $50,000 | Before Site Manager efficiencies |
| **Current On-Time Completion Rate (%)** | Percentage of projects completed on-time without overruns. | 60% | Industry average |
| **Labor Cost per Site ($)** | Approximate labor cost portion of total site/project cost. | $15,000 | Field crew labor, project mgmt, admin support |
| **Manual Admin Hours per Site** | Number of admin/PM hours spent manually tracking, reporting, coordinating. | 10 hours | For status updates, coordination, data entry |
| **Hourly Wage for Admin/PM Staff ($)** | Average loaded wage for those hours. | $50/hour | Fully burdened labor cost |
| **Expected Efficiency Improvement (%)** | Site Manager-driven reduction in project delivery time and admin effort. | 30% | Conservative; based on case studies |
| **Expected Cost Reduction (%)** | Site Manager-driven reduction in total site/project cost. | 20% | Based on automation, fewer errors, fewer truck rolls |

---

## 3. Calculations

Here are the key backend calculations for ROI outputs:

### Step 1: Project Speed Savings

- **New Project Duration** = `Current Project Duration x (1 - Efficiency Improvement %)`
- **Weeks Saved per Project** = `Current Duration - New Duration`
- **Total Time Savings per Year (weeks)** = `Weeks Saved per Project x Number of Projects`

### Step 2: Cost Savings

- **Total Annual Project Cost Before** = `Number of Projects x Average Cost per Project`
- **Cost Savings per Project** = `Average Cost per Project x Cost Reduction %`
- **Total Annual Cost Savings** = `Cost Savings per Project x Number of Projects`

### Step 3: Labor/Admin Savings

- **Manual Admin Hours Saved per Site** = `Manual Admin Hours per Site x Efficiency Improvement %`
- **Annual Admin Hours Saved** = `Manual Admin Hours Saved per Site x Number of Projects`
- **Annual Admin Cost Savings** = `Annual Admin Hours Saved x Hourly Wage`

### Step 4: Total Savings

- **Total Annual Savings** = `Total Annual Cost Savings + Annual Admin Cost Savings`

### Step 5: ROI Calculation

Assuming a subscription or platform license fee for Site Manager (you can input a sample value, say **$250,000/year license**).

- **Return on Investment (ROI %)** = `((Total Annual Savings - Platform Cost) / Platform Cost) x 100`

---

## 4. User Outputs (Simple but Compelling)

Display the following:

| Output Name | Description |
|:------------|:------------|
| **New Average Project Duration** | Weeks after Site Manager optimization |
| **Total Weeks Saved Annually** | Across all projects/sites |
| **Total Project Cost Savings per Year ($)** | Hard dollar savings from better efficiency |
| **Total Admin/Labor Cost Savings per Year ($)** | Time saved by removing manual reporting/admin |
| **Total Annual Savings ($)** | Combined |
| **ROI (%)** | How much return vs investment |
| **Breakeven Point (months)** | Time to recover Site Manager platform cost |

### Visual Display:

- **Summary Banner**: Big numbers like "Total Annual Savings: $2,000,000" and "ROI: 650%"
- **Savings Breakdown Pie Chart**:
  - Slice 1: Cost Savings
  - Slice 2: Admin/Labor Savings
  - Slice 3: Platform Cost
- **Bar Chart**: Before vs After (Average Project Duration)
- **Breakeven Timeline**: Simple timeline showing when savings exceed cost

Use light, clean design - avoid crowding.

---

## 5. Design Tips

- Use large, bold numbers for output ("$ Saved", "ROI %")
- Use tooltips or small info bubbles next to inputs to explain them
- Autofill reasonable defaults so users see results immediately, but allow easy tweaking
- Responsive layout (works on desktop, tablet, phone)
- Dark/light mode optional but cool!

---

## 6. Hosting Instructions

- Create a GitHub repository
- Place all HTML/CSS/JS in a `/docs` folder
- Enable GitHub Pages for `/docs`
- Link shareable URL

(Optional: Use a static site generator like Astro or Hugo for cleaner code)

---

## 7. Future Enhancements (Optional)

- Add multi-language support
- Allow PDF export of results
- Add "Advanced Mode" with more detailed inputs (risk modeling, multi-year projections)
- Allow user to save input scenarios

---

## Final Thoughts

This calculator should:
- Tell an **immediate and clear story**: "You save X dollars and Y weeks using Site Manager"
- Provide a **credible financial rationale** for buying Site Manager
- Be so simple that an executive or field manager can use it without help

---

If you'd like, I can next help you scaffold the actual HTML/CSS/JavaScript code too!

