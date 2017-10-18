define(function(){

  const ChartBuilder = Object.create(null, {

    drawBar: {
      value: function(options){
        let { pane, paneHeight, series, xScale, yScale } = this.cache(options);

        let group = pane.append('g')
            .classed(this.cls.bar, true)
            .classed(this.cls.barHovered, true);

        group
            .selectAll('rect')
            .data(series)
            .enter()
            .append("rect")
            .attr("x", d => xScale(d.x))
            .attr("y", d => paneHeight - yScale(d.y))
            .attr("width", xScale.bandwidth())
            .attr("height", d => yScale(d.y));

        return group;
      }
    },

    drawLine: {
      value: function(options){
        let { pane, series, xScale, yScale } = this.cache(options);

        let line = d3.line()
            .x(d => xScale(d.x))
            .y(d => yScale(d.y));

        let group = pane.append('g')
            .classed(this.cls.line, true);

        group
            .append('path')
            .datum(series)
            .attr('d', line);

        return group;
      }
    },

    drawPoints: {
      value: function(options){
        let { pane, pointHitRadius, pointRadius, series, xScale, yScale } = this.cache(options);

        let points = pane
            .selectAll(`.${this.cls.point}`)
            .data(series)
            .enter()
            .append('g')
            .classed(this.cls.point, true)
            .classed(this.cls.pointHovered, true)
            .attr('transform', function(d, i) {
              let tx = xScale(d.x), ty = yScale(d.y);
              return "translate(" + tx + "," + ty + ")";
            });

        // handles
        points.append('circle')
            .classed(this.cls.pointHandle, true)
            .attr('r', pointHitRadius)
            .attr('cx', 0)
            .attr('cy', 0);

        // dot's
        points.append('circle')
            .classed('dot', true)
            .attr('r', pointRadius)
            .attr('cx', 0)
            .attr('cy', 0);

        return points;
      }
    },

    drawXAxis: {
      value: function(options){
        let { pane, tickFormat, xScale, translate = [0,0] } = this.cache(options);
        
        let xGenerator = d3.axisBottom(xScale)
            .tickFormat(tickFormat)
            .tickSize(2);

        let xAxis = pane
            .append("g")
            .classed(this.cls.axis, true)
            .classed(this.cls.axisX, true)
            .attr("transform", `translate(${translate.join(',')})`);

        xAxis.call(xGenerator);

        return xAxis;
      }
    },

    drawYAxis: {
      value: function(options){
        let { pane, tickFormat, yScale, translate = [0,0] } = this.cache(options);

        let yGenerator = d3.axisRight(yScale)
            .tickFormat(tickFormat)
            .tickSize(0);

        let yAxis = pane
            .append("g")
            .classed(this.cls.axis, true)
            .classed(this.cls.axisY, true)
            .attr("transform", `translate(${translate.join(',')})`);

        yAxis.call(yGenerator);

        yAxis.select('.domain').remove();
        yAxis.selectAll('.tick').each(function (val, i, nodeList) {
          // console.log(this);
        });

        return yAxis;
      }
    },

    /* Cache */
    pane: { value: null, writable: true },
    series: { value: null, writable: true },
    xScale: { value: null, writable: true },
    yScale: { value: null, writable: true },
    cache: {
      value: function(options){
        (options.pane && (this.pane = options.pane)) || (options.pane = this.pane);
        (options.series && (this.series = options.series)) || (options.series = this.series);
        (options.xScale && (this.xScale = options.xScale)) || (options.xScale = this.xScale);
        (options.yScale && (this.yScale = options.yScale)) || (options.yScale = this.yScale);
        return options;
      }
    },
    
    /* CSS classes */
    cls: {
      value: {
        axis: 'c-chart__axis',
        axisX: 'c-chart__axis--x',
        axisY: 'c-chart__axis--y',
        bar: 'bar',
        barHovered: 'bar--hovered',
        canvas: 'c-chart__canvas',
        line: 'line',
        tick: 'tick',
        pane: 'c-chart__pane',
        point: 'point',
        pointHandle: 'handle',
        pointHovered: 'point--hovered'
      }
    },
  
    getTickSize: {
      value: function(options){
        let { pane, text, is_axis_x = false, is_axis_y = false } = this.cache(options);

        let axis = pane
            .append('g')
            .classed(this.cls.axis, true)
            .classed(this.cls.axisX, is_axis_x)
            .classed(this.cls.axisY, is_axis_y);

        let tick = axis.append('g')
            .classed(this.cls.tick, true);

        tick.append('text').text(text);

        let result = tick.node().getBBox();
        axis.remove();
        return _.pick(result, 'width', 'height');
      }
    }
  });

  return ChartBuilder;
});