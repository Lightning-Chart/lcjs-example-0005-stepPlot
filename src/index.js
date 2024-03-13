/*
 * LightningChartJS example that showcases step-series with dynamically changeable stepping-options.
 */
// Import LightningChartJS
const lcjs = require('@arction/lcjs')

// Extract required parts from LightningChartJS.
const { lightningChart, StepOptions, UILayoutBuilders, UIElementBuilders, emptyFill, UIOrigins, AxisTickStrategies, Themes } = lcjs

const chart = lightningChart()
    .ChartXY({
        theme: Themes[new URLSearchParams(window.location.search).get('theme') || 'darkGold'] || undefined,
    })
    .setTitle('Survey Report')

const reportTableXlabel = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

// Create step series for each available step-option.
// The step-function can not be changed during runtime!
const stepSeries = []
const addSeries = (stepOption) =>
    stepSeries.push(
        chart
            .addStepSeries({ mode: stepOption, automaticColorIndex: 0 })
            // Show identifier of stepping option as the name of the Series.
            .setName(StepOptions[stepOption])
            .setVisible(false)
            .setCursorResultTableFormatter((builder, _, xValue, yValue) =>
                builder
                    .addRow('Survey Report')
                    .addRow('Month: ' + reportTableXlabel[Math.trunc(xValue)])
                    .addRow('Amount: ' + yValue.toFixed(2)),
            ),
    )
addSeries(StepOptions.before)
addSeries(StepOptions.middle)
addSeries(StepOptions.after)

// X-axis of the series
const axisX = chart
    .getDefaultAxisX()
    .setMouseInteractions(false)
    // Disable default ticks.
    .setTickStrategy(AxisTickStrategies.Empty)
    .setMouseInteractions(false)

// Enable AutoCursor auto-fill.
chart.setAutoCursor((cursor) => {
    cursor.setResultTableAutoTextStyle(true).setTickMarkerXVisible(false).setTickMarkerYAutoTextStyle(true)
})

// Generate progressive points and add it to every series.
const data = [
    {
        x: 'Jan',
        y: 1,
    },
    {
        x: 'Feb',
        y: 11,
    },
    {
        x: 'Mar',
        y: 21,
    },
    {
        x: 'Apr',
        y: 15,
    },
    {
        x: 'May',
        y: 57,
    },
    {
        x: 'Jun',
        y: 77,
    },
    {
        x: 'Jul',
        y: 47,
    },
    {
        x: 'Aug',
        y: 24,
    },
    {
        x: 'Sep',
        y: 76,
    },
    {
        x: 'Oct',
        y: 88,
    },
    {
        x: 'Nov',
        y: 99,
    },
    {
        x: 'Dec',
        y: 3,
    },
]
let x = 0
let changedData = []

stepSeries.forEach((values, i) => {
    changedData = data.map((changex, index) => ({ x: index, y: changex.y }))
    values.add(changedData)
})

changedData.forEach((_, index) => {
    // Add custom tick, more like categorical axis.
    axisX
        .addCustomTick()
        .setValue(index)
        .setGridStrokeLength(0)
        .setTextFormatter((_) => data[index].x)
    x += 1
})
chart.getDefaultAxisY().setTitle('Amount / Month').setInterval({ start: 0, end: 100, stopAxisAfter: false })

// Add UI controls for switching between step-mode-options.
// NOTE: This is not the focus of the example, and will be better covered elsewhere.
const stepControls = chart.addUIElement(UILayoutBuilders.Column)
stepControls.addElement(UIElementBuilders.TextBox).setText('Step options')
const buttonLayout = stepControls.addElement(UILayoutBuilders.Row)
const radioButtons = []
let switching = false
const addRadioButton = (series) => {
    const checkBox = buttonLayout.addElement(UIElementBuilders.CheckBox).setButtonOnFillStyle(emptyFill).setButtonOffFillStyle(emptyFill)
    radioButtons.push(checkBox)
    series.attach(checkBox)
    checkBox.setOn(false)
    // Add radio button logic immediately afterwards so that it is applied after plot.
    // Attach logic (otherwise plot logic will override this)
    setTimeout(() => {
        checkBox.onSwitch((activatedButton, state) => {
            if (switching) {
                return
            }
            switching = true
            if (state) {
                // Deactivate other buttons
                for (const button of radioButtons) if (button !== activatedButton) button.setOn(false)
            } else {
                // Prevent turning of the selected option
                activatedButton.setOn(true)
            }
            switching = false
        })
    }, 100)
}
addRadioButton(stepSeries[0])
addRadioButton(stepSeries[1])
addRadioButton(stepSeries[2])
const margin = 10
stepControls.setPosition({ x: 30, y: 80 }).setOrigin(UIOrigins.CenterBottom).setMargin(margin)

// Apply initial selection
stepSeries[1].setVisible(true)
