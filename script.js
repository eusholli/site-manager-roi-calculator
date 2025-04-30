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
    costReduction: document.getElementById('costReduction'),
    platformCost: document.getElementById('platformCost')
};

const outputs = {
    totalSavings: document.getElementById('outputTotalSavings'),
    roi: document.getElementById('outputROI'),
    newDuration: document.getElementById('outputNewDuration'),
    weeksSaved: document.getElementById('outputWeeksSaved'),
    costSavings: document.getElementById('outputCostSavings'),
    adminSavings: document.getElementById('outputAdminSavings'),
    breakeven: document.getElementById('outputBreakeven'),
    // Chart placeholders (will be used later)
    savingsPieChart: document.getElementById('savingsPieChart'),
    durationBarChart: document.getElementById('durationBarChart'),
    breakevenTimeline: document.getElementById('breakevenTimeline')
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
    
    // Validate percentage inputs to ensure they're within reasonable bounds (0-100%)
    values.efficiencyGain = Math.min(100, Math.max(0, values.efficiencyGain));
    values.costReduction = Math.min(100, Math.max(0, values.costReduction));
    values.onTimeRate = Math.min(100, Math.max(0, values.onTimeRate));
    
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

function calculateROI(totalAnnualSavings, platformCost) {
    if (platformCost <= 0) return 0; // Avoid division by zero
    return (totalAnnualSavings - platformCost) / platformCost;
}

function calculateBreakeven(totalAnnualSavings, platformCost) {
    if (totalAnnualSavings <= 0) return Infinity; // Cannot break even if no savings
    const monthlySavings = totalAnnualSavings / 12;
    if (monthlySavings <= 0) return Infinity;
    return platformCost / monthlySavings; // Breakeven in months
}

// --- Update UI Functions ---

function updateOutputs(results) {
    outputs.totalSavings.textContent = formatCurrency(results.totalAnnualSavings);
    outputs.roi.textContent = formatPercent(results.roi);
    outputs.newDuration.textContent = formatNumber(results.speed.newDuration, 1); // Allow one decimal for weeks
    outputs.weeksSaved.textContent = formatNumber(results.speed.totalWeeksSaved);
    outputs.costSavings.textContent = formatCurrency(results.cost.totalCostSavings);
    outputs.adminSavings.textContent = formatCurrency(results.admin.totalAdminCostSavings);

    if (results.breakeven === Infinity || results.breakeven < 0) {
        outputs.breakeven.textContent = "N/A";
    } else {
         // Round up to the next whole month if not exactly zero
        const breakevenMonths = results.breakeven > 0 ? Math.ceil(results.breakeven) : 0;
        outputs.breakeven.textContent = `${formatNumber(breakevenMonths)} months`;
    }

    // Update charts
    updatePieChart(results);
    updateBarChart(results);
    updateTimeline(results);
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
    const platformCost = results.inputs.platformCost; // Get platform cost from inputs used

    // Define colors for segments (use CSS variables or define here)
    const colorCost = '#4CAF50'; // Green
    const colorAdmin = '#2196F3'; // Blue
    const colorPlatform = '#ff9800'; // Orange

    const total = costSavings + adminSavings + platformCost;

    if (total <= 0) {
        // Handle cases with no savings or cost (e.g., display a message or default state)
        pieChartElement.style.backgroundImage = `conic-gradient(var(--placeholder-bg) 0% 100%)`;
        pieChartElement.textContent = 'N/A'; // Show text inside if needed
        return; // Exit if no data to show
    } else {
         // Clear any placeholder text if we have data
         if (pieChartElement.textContent === 'N/A') pieChartElement.textContent = '';
    }


    const costPercent = (costSavings / total) * 100;
    const adminPercent = (adminSavings / total) * 100;
    // Platform cost percent is the remainder, handled by the gradient structure

    // Calculate gradient stops
    const costStop = costPercent;
    const adminStop = costPercent + adminPercent;

    // Construct the conic-gradient string
    // Ensure stops don't overlap weirdly if a value is zero
    const gradientStops = [];
    if (costPercent > 0) gradientStops.push(`${colorCost} 0% ${costStop}%`);
    if (adminPercent > 0) gradientStops.push(`${colorAdmin} ${costStop}% ${adminStop}%`);
    // Platform cost fills the rest
    gradientStops.push(`${colorPlatform} ${adminStop}% 100%`);

    pieChartElement.style.backgroundImage = `conic-gradient(${gradientStops.join(', ')})`;


    // Create and append new legend
    legend = document.createElement('ul');
    legend.className = 'legend';

    const legendItems = [
        { label: `Cost Savings (${formatCurrency(costSavings)})`, color: colorCost, value: costSavings },
        { label: `Admin Savings (${formatCurrency(adminSavings)})`, color: colorAdmin, value: adminSavings },
        { label: `Platform Cost (${formatCurrency(platformCost)})`, color: colorPlatform, value: platformCost }
    ];

    legendItems.forEach(item => {
        // Only add legend item if the value is > 0 or it's the platform cost (always show cost)
        if (item.value > 0 || item.label.includes('Platform Cost')) {
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

function updateTimeline(results) {
    const timelineElement = outputs.breakevenTimeline;
    timelineElement.innerHTML = ''; // Clear previous timeline

    const breakevenMonths = results.breakeven;

    // Create the main line
    const line = document.createElement('div');
    line.className = 'timeline-line';

    // Create markers (adjust scale if needed)
    const markers = [
        { label: '0m', position: 0 },
        { label: '6m', position: 50 },
        { label: '12m', position: 100 }
        // Add more markers like 18m, 24m if breakeven can exceed 12 significantly
    ];

    markers.forEach(m => {
        const marker = document.createElement('span');
        marker.className = `timeline-marker ${m.label.replace('m','')}`; // e.g., timeline-marker zero
        marker.style.left = `${m.position}%`;
        marker.textContent = m.label;
        line.appendChild(marker);
    });

    timelineElement.appendChild(line); // Add line first

    // Create and position the breakeven indicator
    if (breakevenMonths !== Infinity && breakevenMonths >= 0) {
        const indicator = document.createElement('div');
        indicator.className = 'breakeven-indicator';

        const label = document.createElement('span');
        label.className = 'breakeven-indicator-label';
        label.textContent = `${formatNumber(Math.ceil(breakevenMonths))} mo`; // Show rounded-up month

        // Calculate position (assuming timeline represents 12 months max for now)
        // Clamp position between 0% and 100%
        const positionPercent = Math.min(100, Math.max(0, (breakevenMonths / 12) * 100));
        indicator.style.left = `${positionPercent}%`;
        indicator.style.display = 'block'; // Make it visible

        indicator.appendChild(label); // Add label to indicator
        line.appendChild(indicator); // Add indicator to the line
    }
    // If breakeven is N/A or negative, the indicator remains hidden (display: none by default)
}

// --- Main Calculation Flow ---

function calculateAndDisplay() {
    const currentInputs = getInputs();

    const speedResults = calculateProjectSpeedSavings(currentInputs.avgDuration, currentInputs.efficiencyGain, currentInputs.numSites);
    const costResults = calculateCostSavings(currentInputs.avgCost, currentInputs.costReduction, currentInputs.numSites);
    const adminResults = calculateLaborAdminSavings(currentInputs.adminHours, currentInputs.efficiencyGain, currentInputs.adminWage, currentInputs.numSites);

    const totalAnnualSavings = calculateTotalSavings(costResults.totalCostSavings, adminResults.totalAdminCostSavings);
    const roi = calculateROI(totalAnnualSavings, currentInputs.platformCost);
    const breakeven = calculateBreakeven(totalAnnualSavings, currentInputs.platformCost);

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
