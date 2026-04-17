/*
 * LightningChartJS example that showcases step-series with dynamically changeable stepping-options.
 */
// Import LightningChartJS
const lcjs = require('@lightningchart/lcjs')

// Extract required parts from LightningChartJS.
const { lightningChart, UILayoutBuilders, UIElementBuilders, emptyFill, UIOrigins, AxisTickStrategies, LegendEntryClickBehaviors, Themes } = lcjs

const chart = lightningChart({
            resourcesBaseUrl: new URL(document.head.baseURI).origin + new URL(document.head.baseURI).pathname + 'resources/',
        })
    .ChartXY({
        legend: {
            title: 'Step options',
            entries: {
                events: {
                    click: LegendEntryClickBehaviors.focusClicked,
                }
            }
        },
        theme: (() => {
    const t = Themes[new URLSearchParams(window.location.search).get('theme') || 'darkGold'] || undefined
    const smallView = window.devicePixelRatio >= 2
    if (!window.__lcjsDebugOverlay) {
        window.__lcjsDebugOverlay = document.createElement('div')
        window.__lcjsDebugOverlay.style.cssText = 'position:fixed;top:0;left:0;background:rgba(0,0,0,0.7);color:#fff;padding:4px 8px;z-index:99999;font:12px monospace;pointer-events:none'
        if (document.body) document.body.appendChild(window.__lcjsDebugOverlay)
        setInterval(() => {
            if (!window.__lcjsDebugOverlay.parentNode && document.body) document.body.appendChild(window.__lcjsDebugOverlay)
            window.__lcjsDebugOverlay.textContent = window.innerWidth + 'x' + window.innerHeight + ' dpr=' + window.devicePixelRatio + ' small=' + (window.devicePixelRatio >= 2)
        }, 500)
    }
    return t && smallView ? lcjs.scaleTheme(t, 0.5) : t
})(),
textRenderer: window.devicePixelRatio >= 2 ? lcjs.htmlTextRenderer : undefined,
    })
    .setTitle('Survey Report')

const stepSeries = []
const addSeries = (step) =>
    stepSeries.push(
        chart
            .addPointLineSeries({ automaticColorIndex: 0 })
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
    values.appendJSON(changedData)
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

// Apply initial selection
stepSeries[1].setVisible(true)
