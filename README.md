# Step series

This demo application belongs to the set of examples for LightningChart JS, data visualization library for JavaScript.

LightningChart JS is entirely GPU accelerated and performance optimized charting library for presenting massive amounts of data. It offers an easy way of creating sophisticated and interactive charts and adding them to your website or web application.

The demo can be used as an example or a seed project. Local execution requires the following steps:

- Make sure that relevant version of [Node.js](https://nodejs.org/en/download/) is installed
- Open the project folder in a terminal:

        npm install              # fetches dependencies
        npm start                # builds an application and starts the development server

- The application is available at *http://localhost:8080* in your browser, webpack-dev-server provides hot reload functionality.

### Description 

*Also known as a Step Graph or Step Chart*

This example shows the basic usage of a step series with different preprocessing modes. Similarly to line series, it is drawn on a Cartesian coordinate system and represents the relationship between two variables. However, it is used to visualize the changing variables that have irregular fluctuation forming a step-like progression.

The data that changes at irregular intervals remains constant between the changes. The vertical risers of a chart denote changes in the data and their magnitude, the horizontal - the constancy of the data within the interval.

![](./assets/comparison.png "Line Chart vs. Step Chart")

Creation of a step series is equal to any basic line series, with the exception of an additional optional parameter, which specifies the 'step option' of the series.

```javascript
const stepSeries = chart.addStepSeries( { mode: stepOption } )
```
There is no need in data preparation, step chart will be generated automatically from the provided curve based on selected step mode.

| Step Options  | Description                                             |
| :-----------: | :-----------------------------------------------------: |
| before        | The magnitude changes before the next interval start.   |
| middle        | The magnitude changes at the midpoint of the interval.  |
| after         | The magnitude changes after the previous interval end.  |

The series accepts points in format `{ x: number, y: number: color: Color }` with specified IndividualPointFill to enable individual point coloring or `{ x: number, y: number }` for other fill styles. Any number of points can be added with a single call similarly to line series with point markers.

### API links

* XY cartesian chart: [ChartXY][]
* Step options: [StepOptions][]
* Individual point coloring: [IndividualPointFill][]
* UI layout builders: [UILayoutBuilders][]
* UI backgrounds: [UIBackgrounds][]
* UI elements builders: [UIElementBuilders][]
* UI button pictures: [UIButtonPictures][]
* UI position origins: [UIOrigins][]
* Progressive random generator: [ProgressiveRandomGenerator][]


### Support

If you notice an error in the example code, please open an issue on [GitHub][0] repository of the entire example.

Official [API documentation][1] can be found on [Arction][2] website.

If the docs and other materials do not solve your problem as well as implementation help is needed, ask on [StackOverflow][3] (tagged lightningchart).

If you think you found a bug in the LightningChart JavaScript library, please contact support@arction.com.

Direct developer email support can be purchased through a [Support Plan][4] or by contacting sales@arction.com.

© Arction Ltd 2009-2019. All rights reserved.

[0]: https://github.com/Arction/
[1]: https://www.arction.com/lightningchart-js-api-documentation/
[2]: https://www.arction.com
[3]: https://stackoverflow.com/questions/tagged/lightningchart
[4]: https://www.arction.com/support-services/

[ChartXY]: https://www.arction.com/lightningchart-js-api-documentation/v1.0.0/classes/chartxy.html
[IndividualPointFill]: https://www.arction.com/lightningchart-js-api-documentation/v1.0.0/classes/individualpointfill.html
[ProgressiveRandomGenerator]: https://arction.github.io/xydata/classes/progressiverandomgenerator.html
[StepOptions]: https://www.arction.com/lightningchart-js-api-documentation/v1.0.0/enums/stepoptions.html
[UIBackgrounds]: https://www.arction.com/lightningchart-js-api-documentation/v1.0.0/globals.html#uibackgrounds
[UIButtonPictures]: https://www.arction.com/lightningchart-js-api-documentation/v1.0.0/globals.html#uibuttonpictures
[UIElementBuilders]: https://www.arction.com/lightningchart-js-api-documentation/v1.0.0/globals.html#uielementbuilders
[UILayoutBuilders]: https://www.arction.com/lightningchart-js-api-documentation/v1.0.0/globals.html#uilayoutbuilders
[UIOrigins]: https://www.arction.com/lightningchart-js-api-documentation/v1.0.0/globals.html#uiorigins