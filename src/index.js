/*
 * LightningChartJS example that showcases step-series with dynamically changeable stepping-options.
 */
// Import LightningChartJS
const lcjs = require('@lightningchart/lcjs')

// Extract required parts from LightningChartJS.
const { lightningChart, UILayoutBuilders, UIElementBuilders, emptyFill, UIOrigins, AxisTickStrategies, Themes } = lcjs

const chart = lightningChart({
            resourcesBaseUrl: new URL(document.head.baseURI).origin + new URL(document.head.baseURI).pathname + 'resources/',
        })
    .ChartXY({
        theme: Themes[new URLSearchParams(window.location.search).get('theme') || 'darkGold'] || undefined,
    })
    .setTitle('Survey Report')

const stepSeries = []
const addSeries = (step) =>
    stepSeries.push(
        chart
            .addPointLineAreaSeries({ dataPattern: 'ProgressiveX', automaticColorIndex: 0 })
            .setName(step)
            .setVisible(false)
            .setCurvePreprocessing({ type: 'step', step })
            .setAreaFillStyle(emptyFill),
    )
addSeries('before')
addSeries('middle')
addSeries('after')

// X-axis of the series
const axisX = chart
    .getDefaultAxisX()
    // Disable default ticks.
    .setTickStrategy(AxisTickStrategies.Empty)

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
        checkBox.addEventListener('switch', (event) => {
            const state = event.state
            if (switching || !state) {
                return
            }
            // Deactivate other buttons
            for (const button of radioButtons) if (button !== checkBox) button.setOn(false)
        })
    }, 100)
    series.addEventListener('visiblechange', (e) => {
        checkBox.setPointerEvents(!e.isVisible)
    })
}
addRadioButton(stepSeries[0])
addRadioButton(stepSeries[1])
addRadioButton(stepSeries[2])
const margin = 10
stepControls.setPosition({ x: 30, y: 80 }).setOrigin(UIOrigins.CenterBottom).setMargin(margin)

// Apply initial selection
stepSeries[1].setVisible(true)
