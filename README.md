# JavaScript Step Series

![JavaScript Step Series](stepPlot-darkGold.png)

This demo application belongs to the set of examples for LightningChart JS, data visualization library for JavaScript.

LightningChart JS is entirely GPU accelerated and performance optimized charting library for presenting massive amounts of data. It offers an easy way of creating sophisticated and interactive charts and adding them to your website or web application.

The demo can be used as an example or a seed project. Local execution requires the following steps:

-   Make sure that relevant version of [Node.js](https://nodejs.org/en/download/) is installed
-   Open the project folder in a terminal:

          npm install              # fetches dependencies
          npm start                # builds an application and starts the development server

-   The application is available at _http://localhost:8080_ in your browser, webpack-dev-server provides hot reload functionality.


## Description

_Also known as a Step Graph or Step Chart_

This example shows the basic usage of a step series with different preprocessing modes. Similarly to line series, it is drawn on a Cartesian coordinate system and represents the relationship between two variables. However, it is used to visualize the changing variables that have irregular fluctuation forming a step-like progression.

The data that changes at irregular intervals remains constant between the changes. The vertical risers of a chart denote changes in the data and their magnitude, the horizontal - the constancy of the data within the interval.

![](./assets/comparison.png 'Line Chart vs. Step Chart')

Creation of a step series is equal to any basic line series, with the exception of an additional optional parameter, which specifies the 'step option' of the series.

```javascript
const stepSeries = chart.addStepSeries({ mode: stepOption })
```

There is no need in data preparation, step chart will be generated automatically from the provided curve based on selected step mode.

| Step Options |                      Description                       |
| :----------: | :----------------------------------------------------: |
|    before    | The magnitude changes before the next interval start.  |
|    middle    | The magnitude changes at the midpoint of the interval. |
|    after     | The magnitude changes after the previous interval end. |

The series accepts points in format `{ x: number, y: number: color: Color }` with specified IndividualPointFill to enable individual point coloring or `{ x: number, y: number }` for other fill styles. Any number of points can be added with a single call similarly to line series with point markers.


## API Links

* [XY cartesian chart]
* [Step options]
* [Individual point coloring]
* [UI layout builders]
* [UI backgrounds]
* [UI elements builders]
* [UI button pictures]
* [UI position origins]
* [Progressive random generator]


## Support

If you notice an error in the example code, please open an issue on [GitHub][0] repository of the entire example.

Official [API documentation][1] can be found on [LightningChart][2] website.

If the docs and other materials do not solve your problem as well as implementation help is needed, ask on [StackOverflow][3] (tagged lightningchart).

If you think you found a bug in the LightningChart JavaScript library, please contact sales@lightningchart.com.

Direct developer email support can be purchased through a [Support Plan][4] or by contacting sales@lightningchart.com.

[0]: https://github.com/Arction/
[1]: https://lightningchart.com/lightningchart-js-api-documentation/
[2]: https://lightningchart.com
[3]: https://stackoverflow.com/questions/tagged/lightningchart
[4]: https://lightningchart.com/support-services/

© LightningChart Ltd 2009-2025. All rights reserved.


[XY cartesian chart]: https://lightningchart.com/js-charts/api-documentation/v8.0.1/classes/ChartXY.html
[Step options]: https://lightningchart.com/js-charts/api-documentation/v8.0.1/enums/StepOptions.html
[Individual point coloring]: https://lightningchart.com/js-charts/api-documentation/v8.0.1/classes/IndividualPointFill.html
[UI layout builders]: https://lightningchart.com/js-charts/api-documentation/v8.0.1/variables/UILayoutBuilders.html
[UI backgrounds]: https://lightningchart.com/js-charts/api-documentation/v8.0.1/variables/UIBackgrounds.html
[UI elements builders]: https://lightningchart.com/js-charts/api-documentation/v8.0.1/variables/UIElementBuilders.html
[UI button pictures]: https://lightningchart.com/js-charts/api-documentation/v8.0.1/variables/UIButtonPictures.html
[UI position origins]: https://lightningchart.com/js-charts/api-documentation/v8.0.1/variables/UIOrigins.html
[Progressive random generator]: https://lightning-chart.github.io/xydata/classes/progressiverandomgenerator.html

