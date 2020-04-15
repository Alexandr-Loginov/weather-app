import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import * as d3 from 'd3';

import { IWeatherWrapper } from '../../models';

@Component({
    selector: 'app-temperature-chart',
    templateUrl: './temperature-chart.component.html',
    styleUrls: ['./temperature-chart.component.scss'],
})
export class TemperatureChartComponent implements OnChanges {
    @ViewChild('chart', { static: true })
    chartElement: ElementRef;

    parseDate = d3.timeParse('%H:%M:%S');

    @Input()
    temperature: any[] = [];

    private svgElement: HTMLElement;
    private chartProps: any;

    constructor() {}

    ngOnChanges(changes: SimpleChanges) {
        if (this.temperature && this.chartProps) {
            this.updateChart();
        } else {
            console.log('building');
            this.buildChart();
        }
    }

    formatDate() {
        this.temperature.forEach((ms) => {
            if (typeof ms.date === 'string') {
                ms.date = this.parseDate(ms.date);
            }
        });
    }

    updateChart() {
        let _this = this;
        this.formatDate();

        // Scale the range of the data again
        this.chartProps.x.domain(
            d3.extent(this.temperature, function (d) {
                if (d.date instanceof Date) {
                    return d.date.getTime();
                }
            })
        );

        this.chartProps.y.domain([
            0,
            d3.max(this.temperature, function (d) {
                return Math.max((d.data.main.temp - 273) * 1.5);
            }),
        ]);

        // Select the section we want to apply our changes to
        this.chartProps.svg.transition();

        // Make the changes to the line chart
        this.chartProps.svg
            .select('.line.line1') // update the line
            .attr('d', this.chartProps.valueline(this.temperature));

        this.chartProps.svg
            .select('.x.axis') // update x axis
            .call(this.chartProps.xAxis);

        this.chartProps.svg
            .select('.y.axis') // update y axis
            .call(this.chartProps.yAxis);
    }

    buildChart() {
        this.chartProps = {};
        this.formatDate();

        // Set the dimensions of the canvas / graph
        var margin = { top: 30, right: 20, bottom: 100, left: 50 },
            width = 600 - margin.left - margin.right,
            height = 370 - margin.top - margin.bottom;

        // Set the ranges
        this.chartProps.x = d3.scaleTime().range([0, width]);
        this.chartProps.y = d3.scaleLinear().range([height, 0]);

        // Define the axes
        var xAxis = d3.axisBottom(this.chartProps.x);
        var yAxis = d3.axisLeft(this.chartProps.y).ticks(5);

        let _this = this;

        // Define the line
        var valueline = d3
            .line<IWeatherWrapper>()
            .x(function (d) {
                if (d.date instanceof Date) {
                    return _this.chartProps.x(d.date.getTime());
                }
            })
            .y(function (d) {
                return _this.chartProps.y(d.data.main.temp - 273);
            });

        var svg = d3
            .select(this.chartElement.nativeElement)
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Scale the range of the data
        this.chartProps.x.domain(
            d3.extent(_this.temperature, function (d) {
                if (d.date instanceof Date) return (d.date as Date).getTime();
            })
        );
        this.chartProps.y.domain([
            0,
            d3.max(this.temperature, function (d) {
                return Math.max(d.data.main.temp - 273);
            }),
        ]);

        // Add the valueline path.
        svg.append('path')
            .attr('class', 'line line1')
            .style('stroke', 'black')
            .style('fill', 'none')
            .attr('d', valueline(_this.temperature));

        // Add the X Axis
        svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', `translate(0,${height})`)
            .call(xAxis);

        // Add the Y Axis
        svg.append('g').attr('class', 'y axis').call(yAxis);

        svg.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 0 - margin.left)
            .attr('x', 0 - height / 2)
            .attr('dy', '1em')
            .style('text-anchor', 'middle')
            .text('Temperature (C)');

        svg.append('text')
            .attr(
                'transform',
                'translate(' +
                    width / 2 +
                    ' ,' +
                    (height + margin.top + 20) +
                    ')'
            )
            .style('text-anchor', 'middle')
            .text('Time');

        // Setting the required objects in chartProps so they could be used to update the chart
        this.chartProps.svg = svg;
        this.chartProps.valueline = valueline;
        this.chartProps.xAxis = xAxis;
        this.chartProps.yAxis = yAxis;
    }
}
