import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import 'highcharts-chart/highcharts-chart.js';
import "./exporting.js";
import '@granite-elements/granite-bootstrap/granite-bootstrap.js';

class MyChart extends PolymerElement {
    static get template() {
        return html`
        <style include="granite-bootstrap">
        highcharts-chart{
            width: 300px;
            heigth: 300px;
        }
        </style>

        <div class="container">
  
      
            <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <highcharts-chart type="pie" data='[[0,0],[1,7],[2,1],[3,6],[4,8],[5,6]]' title='Test-Spline Chart' x-zoom x-label="Iterations" y-label="Awesomeness Index" export="true"></highcharts-chart>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <highcharts-chart type="line" data='[[0,0],[1,7],[2,1],[3,6],[4,8],[5,6]]' title='Test-Spline Chart' x-zoom x-label="Iterations" y-label="Awesomeness Index" export="true"></highcharts-chart>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <highcharts-chart type="bar" data='[[0,0],[1,7],[2,1],[3,6],[4,8],[5,6]]' title='Test-Spline Chart' x-zoom x-label="Iterations" y-label="Awesomeness Index" export="true"></highcharts-chart>
                </div>
                 <div class="col-lg-6 col-md-6 col-sm-12">
                    <highcharts-chart type="column" data='[[0,0],[1,7],[2,1],[3,6],[4,8],[5,6]]' title='Test-Spline Chart' x-zoom x-label="Iterations" y-label="Awesomeness Index" export="true"></highcharts-chart>
                </div>
            </div>

            <div>
                <highcharts-chart type="pie" data='[[0,0],[1,7],[2,1],[3,6],[4,8],[5,6]]' title='Test-Spline Chart' x-zoom x-label="Iterations" y-label="Awesomeness Index" export="true"></highcharts-chart>
                <highcharts-chart type="line" data='[[0,0],[1,7],[2,1],[3,6],[4,8],[5,6]]' title='Test-Spline Chart' x-zoom x-label="Iterations" y-label="Awesomeness Index" export="true"></highcharts-chart>
                <highcharts-chart type="bar" data='[[0,0],[1,7],[2,1],[3,6],[4,8],[5,6]]' title='Test-Spline Chart' x-zoom x-label="Iterations" y-label="Awesomeness Index" export="true"></highcharts-chart>
                <highcharts-chart type="column" data='[[0,0],[1,7],[2,1],[3,6],[4,8],[5,6]]' title='Test-Spline Chart' x-zoom x-label="Iterations" y-label="Awesomeness Index" export="true"></highcharts-chart>
            </div>
        </div>


        
        
        `;
    }
}
customElements.define('my-chart', MyChart);