import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import 'highcharts-chart/highcharts-chart.js';
import "./exporting.js";

class MyChart extends PolymerElement {
    static get template() {
        return html`
        <style>
        highcharts-chart{
            width: 300px;
            heigth: 300px;
        }
        </style>
        <highcharts-chart type="pie" data='[[0,0],[1,7],[2,1],[3,6],[4,8],[5,6]]' title='Test-Spline Chart' x-zoom x-label="Iterations" y-label="Awesomeness Index" export="true"></highcharts-chart>
        <highcharts-chart type="line" data='[[0,0],[1,7],[2,1],[3,6],[4,8],[5,6]]' title='Test-Spline Chart' x-zoom x-label="Iterations" y-label="Awesomeness Index" export="true"></highcharts-chart>
        <highcharts-chart type="bar" data='[[0,0],[1,7],[2,1],[3,6],[4,8],[5,6]]' title='Test-Spline Chart' x-zoom x-label="Iterations" y-label="Awesomeness Index" export="true"></highcharts-chart>
        <highcharts-chart type="column" data='[[0,0],[1,7],[2,1],[3,6],[4,8],[5,6]]' title='Test-Spline Chart' x-zoom x-label="Iterations" y-label="Awesomeness Index" export="true"></highcharts-chart>
        <highcharts-chart type="area" data='[[0,0],[1,7],[2,1],[3,6],[4,8],[5,6]]' title='Test-Spline Chart' x-zoom x-label="Iterations" y-label="Awesomeness Index" export="true"></highcharts-chart>
        <highcharts-chart type="spline" data='[[0,0],[1,7],[2,1],[3,6],[4,8],[5,6]]' title='Test-Spline Chart' x-zoom x-label="Iterations" y-label="Awesomeness Index"export="true"></highcharts-chart>
        `;
    }
}
customElements.define('my-chart', MyChart);