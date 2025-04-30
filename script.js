'use strict';

// --- DOM Element References ---
const form = document.getElementById('roi-form');
const inputs = {
    numSites: document.getElementById('numSites'),
    avgDuration: document.getElementById('avgDuration'),
    avgCost: document.getElementById('avgCost'),
    onTimeRate: document.getElementById('onTimeRate'),
    laborCost: document.getElementById('laborCost'),
    adminHours: document.getElementById('adminHours'),
    adminWage: document.getElementById('adminWage'),
    efficiencyGain: document.getElementById('efficiencyGain'),
    costReduction: document.getElementById('costReduction')
    // Platform cost removed as requested
};

const outputs = {
    totalSavings: document.getElementById('outputTotalSavings'),
    roi: document.getElementById('outputROI'),
    newDuration: document.getElementById('outputNewDuration'),
    weeksSaved: document.getElementById('outputWeeksSaved'),
    costSavings: document.getElementById('outputCostSavings'),
    adminSavings: document.getElementById('outputAdminSavings'),
    // Chart placeholders (will be used later)
    savingsPieChart: document.getElementById('savingsPieChart'),
    durationBarChart: document.getElementById('durationBarChart')
    // Breakeven timeline removed as it's no longer relevant without platform cost
};

const currentYearSpan = document.getElementById('currentYear');

// --- Formatting Helpers ---
const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
};

const formatPercent = (value) => {
    // ROI can be large, allow decimals for precision if needed, but usually whole % is fine
    return new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 0 }).format(value);
};

const formatNumber = (value, maximumFractionDigits = 0) => {
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: maximumFractionDigits }).format(value);
};

// --- Calculation Logic (Based on calculator.md) ---

function getInputs() {
    const values = {};
    for (const key in inputs) {
        // Ensure values are numbers, default to 0 if input is invalid/empty
        values[key] = parseFloat(inputs[key].value) || 0;
    }
    // Convert percentages to decimals for calculations
    values.efficiencyGain /= 100;
    values.costReduction /= 100;
    values.onTimeRate /= 100; // Though not used in current core calcs, good practice
    return values;
}

function calculateProjectSpeedSavings(currentDuration, efficiencyGain, numSites) {
    const newDuration = currentDuration * (1 - efficiencyGain);
    const weeksSavedPerProject = currentDuration - newDuration;
    const totalWeeksSaved = weeksSavedPerProject * numSites;
    return { newDuration, weeksSavedPerProject, totalWeeksSaved };
}

function calculateCostSavings(avgCost, costReduction, numSites) {
    const savingsPerProject = avgCost * costReduction;
    const totalCostSavings = savingsPerProject * numSites;
    return { savingsPerProject, totalCostSavings };
}

function calculateLaborAdminSavings(adminHours, efficiencyGain, adminWage, numSites) {
    const hoursSavedPerSite = adminHours * efficiencyGain;
    const totalHoursSaved = hoursSavedPerSite * numSites;
    const totalAdminCostSavings = totalHoursSaved * adminWage;
    return { hoursSavedPerSite, totalHoursSaved, totalAdminCostSavings };
}

function calculateTotalSavings(projectCostSavings, adminCostSavings) {
    return projectCostSavings + adminCostSavings;
}

function calculateROI(totalAnnualSavings, inputs) {
    // Calculate ROI as the percentage of savings relative to total project costs
    // This represents the return on implementing Site Manager
    const totalProjectCosts = inputs.numSites * inputs.avgCost;
    if (totalProjectCosts <= 0) return 0; // Avoid division by zero
    return totalAnnualSavings / totalProjectCosts;
}

function calculateBreakeven() {
    // Without platform cost, breakeven is immediate (0 months)
    return 0;
}

// --- Update UI Functions ---

function updateOutputs(results) {
    outputs.totalSavings.textContent = formatCurrency(results.totalAnnualSavings);
    outputs.roi.textContent = formatPercent(results.roi);
    outputs.newDuration.textContent = formatNumber(results.speed.newDuration, 1); // Allow one decimal for weeks
    outputs.weeksSaved.textContent = formatNumber(results.speed.totalWeeksSaved);
    outputs.costSavings.textContent = formatCurrency(results.cost.totalCostSavings);
    outputs.adminSavings.textContent = formatCurrency(results.admin.totalAdminCostSavings);

    // Breakeven point removed as it's no longer relevant without platform cost

    // Update charts
    updatePieChart(results);
    updateBarChart(results);
    // Timeline removed as it's no longer relevant without platform cost
}

// --- Chart Update Functions ---

function updatePieChart(results) {
    const pieChartElement = outputs.savingsPieChart;
    const container = pieChartElement.parentElement; // Get the chart-container div
    let legend = container.querySelector('.legend');

    // Remove existing legend if it exists
    if (legend) {
        legend.remove();
    }

    const costSavings = results.cost.totalCostSavings;
    const adminSavings = results.admin.totalAdminCostSavings;

    // Define colors for segments
    const colorCost = '#4CAF50'; // Green
    const colorAdmin = '#2196F3'; // Blue

    const total = costSavings + adminSavings;

    if (total <= 0) {
        // Handle cases with no savings (e.g., display a message or default state)
        pieChartElement.style.backgroundImage = `conic-gradient(var(--placeholder-bg) 0% 100%)`;
        pieChartElement.textContent = 'N/A'; // Show text inside if needed
        return; // Exit if no data to show
    } else {
        // Clear any placeholder text if we have data
        if (pieChartElement.textContent === 'N/A') pieChartElement.textContent = '';
    }

    // Calculate percentages
    const costPercent = (costSavings / total) * 100;
    const adminPercent = (adminSavings / total) * 100;

    // Construct the conic-gradient string
    let gradientStops = [];
    
    // Only add segments if they have value
    if (costSavings > 0) {
        gradientStops.push(`${colorCost} 0% ${costPercent}%`);
    }
    
    if (adminSavings > 0) {
        const startPos = costSavings > 0 ? `${costPercent}%` : '0%';
        gradientStops.push(`${colorAdmin} ${startPos} 100%`);
    }
    
    // If no valid stops, show placeholder
    if (gradientStops.length === 0) {
        pieChartElement.style.backgroundImage = `conic-gradient(var(--placeholder-bg) 0% 100%)`;
    } else {
        pieChartElement.style.backgroundImage = `conic-gradient(${gradientStops.join(', ')})`;
    }

    // Create and append new legend
    legend = document.createElement('ul');
    legend.className = 'legend';

    const legendItems = [
        { label: `Cost Savings (${formatCurrency(costSavings)})`, color: colorCost, value: costSavings },
        { label: `Admin Savings (${formatCurrency(adminSavings)})`, color: colorAdmin, value: adminSavings }
    ];

    legendItems.forEach(item => {
        // Only add legend item if the value is > 0
        if (item.value > 0) {
            const li = document.createElement('li');
            const colorBox = document.createElement('span');
            colorBox.style.backgroundColor = item.color;
            li.appendChild(colorBox);
            li.appendChild(document.createTextNode(item.label));
            legend.appendChild(li);
        }
    });

    container.appendChild(legend); // Append legend to the container
}

function updateBarChart(results) {
    const barChartElement = outputs.durationBarChart;
    barChartElement.innerHTML = ''; // Clear previous bars

    const beforeDuration = results.inputs.avgDuration; // Original duration from input
    const afterDuration = results.speed.newDuration; // Calculated new duration

    // Determine the maximum value for scaling (use the 'before' duration, or 1 if it's 0)
    const maxDuration = Math.max(beforeDuration, 1);

    // Calculate percentage heights
    const beforeHeight = (beforeDuration / maxDuration) * 100;
    const afterHeight = (afterDuration / maxDuration) * 100;

    // Create 'Before' bar
    const beforeBar = document.createElement('div');
    beforeBar.className = 'bar-chart-bar before';
    beforeBar.style.height = `${beforeHeight}%`;

    const beforeValue = document.createElement('span');
    beforeValue.className = 'bar-chart-value';
    beforeValue.textContent = `${formatNumber(beforeDuration, 1)}w`;
    beforeBar.appendChild(beforeValue);

    const beforeLabel = document.createElement('span');
    beforeLabel.className = 'bar-chart-label';
    beforeLabel.textContent = 'Before';
    beforeBar.appendChild(beforeLabel);

    // Create 'After' bar
    const afterBar = document.createElement('div');
    afterBar.className = 'bar-chart-bar after';
    afterBar.style.height = `${afterHeight}%`;

    const afterValue = document.createElement('span');
    afterValue.className = 'bar-chart-value';
    // Only show value if duration > 0
    afterValue.textContent = afterDuration > 0 ? `${formatNumber(afterDuration, 1)}w` : '';
    afterBar.appendChild(afterValue);

    const afterLabel = document.createElement('span');
    afterLabel.className = 'bar-chart-label';
    afterLabel.textContent = 'After';
    afterBar.appendChild(afterLabel);

    // Append bars to the chart container
    barChartElement.appendChild(beforeBar);
    barChartElement.appendChild(afterBar);
}

// Timeline function removed as it's no longer relevant without platform cost

// --- Main Calculation Flow ---

function calculateAndDisplay() {
    const currentInputs = getInputs();

    const speedResults = calculateProjectSpeedSavings(currentInputs.avgDuration, currentInputs.efficiencyGain, currentInputs.numSites);
    const costResults = calculateCostSavings(currentInputs.avgCost, currentInputs.costReduction, currentInputs.numSites);
    const adminResults = calculateLaborAdminSavings(currentInputs.adminHours, currentInputs.efficiencyGain, currentInputs.adminWage, currentInputs.numSites);

    const totalAnnualSavings = calculateTotalSavings(costResults.totalCostSavings, adminResults.totalAdminCostSavings);
    const roi = calculateROI(totalAnnualSavings, currentInputs);
    const breakeven = calculateBreakeven();

    const finalResults = {
        inputs: currentInputs,
        speed: speedResults,
        cost: costResults,
        admin: adminResults,
        totalAnnualSavings: totalAnnualSavings,
        roi: roi,
        breakeven: breakeven
    };

    updateOutputs(finalResults);
}

// --- Event Listeners ---

// Recalculate whenever any input changes
form.addEventListener('input', calculateAndDisplay);

// --- Initialization ---
function setFooterYear() {
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
}

// Initial calculation on page load
document.addEventListener('DOMContentLoaded', () => {
    calculateAndDisplay();
    setFooterYear();
});
