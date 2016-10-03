import * as d3 from "d3";

class BarChart {

  /**
   * @param ele
   * @param data
   * @param opts
   *  width, height - size of svg
   *  domain - optional domain, defaults to 0,100
   *  range - optional range defaults to 0,width
     */
  constructor(ele, data, opts) {
    this.ele = ele;
    this.data = data;
    this.opts = opts;

    this.opts.width = this.opts.width || 24;
    this.opts.height = this.opts.height || 24;
  }

  getXScale() {
    return d3.scaleLinear()
      .domain(this.opts.domain || [0, 100]) //default to percentage
      .range(this.opts.range || [0, this.opts.width]);
  }

  getYScale(data) {
    return d3.scaleBand()
      .domain(d3.range(data.length))
      .rangeBands([bottom_margin, h - top_margin], .5);
  }

  getSvg() {
    return d3.select(this.ele)
      .append("svg:svg")
      .attr("width", this.opts.width)
      .attr("height", this.opts.height)
      .attr("class", "barchart")
  }

  render() {
    console.log('data', this.data);

    //margins
    const
      left_margin = 60,
      right_margin = 60,
      top_margin = 30,
      bottom_margin = 0;

    const svg = this.getSvg();

    var bars = svg.selectAll("g.bar")
      .data(this.data)
      .enter()
        .append("svg:g")
        .attr("class", "bar")
        .attr("transform", function(d, i) {
          return "translate(0, " + y(i) + ")";
        });

    bars.append("svg:rect")
      .attr("x", right_margin)
      .attr("width", function(d) {
        return (x(d.value));
      })
      .attr("height", y.rangeBand())
      .attr("fill", color(0))
      .attr("stroke", color(0));


    //Labels
    var labels = vis.selectAll("g.bar")
      .append("svg:text")
      .attr("class", "label")
      .attr("x", 0)
      .attr("text-anchor", "right")
      .text(function(d) {
        return d.label;
      });

    /*this.ele.innerHTML = `
      <svg class="chart" width="200" height="50" aria-labelledby="title desc" role="img">
          <title id="title">A bar chart showing information</title>
          <desc id="desc">4 apples; 8 bananas; 15 kiwis; 16 oranges; 23 lemons</desc>
          <g class="bar">
            <rect width="40" height="19"></rect>
            <text x="45" y="9.5" dy=".35em">Math</text>
          </g>
          <g class="bar">
            <rect width="80" height="19" y="20"></rect>
            <text x="85" y="28" dy=".35em">English</text>
          </g>
        </svg>`;*/
  }


}

export default BarChart;
