import * as d3 from "d3";

import { get } from 'lodash';

class StackedBarGraph {

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
    this.opts = opts || {};

    this.opts.width = this.opts.width || 24;
    this.opts.height = this.opts.height || 24;
  }

  getXScale() {
    return d3.scaleLinear()
      .domain(get(this.opts, 'x.domain') || [0, 100]) //default to percentage
      .range(get(this.opts, 'x.range') || [0, this.opts.width]);
  }

  getYScale(data) {
    return d3.scaleLinear()
      .domain(get(this.opts, 'y.domain') || [0, 100]) //default to percentage
      .range(get(this.opts, 'y.range') || [0, this.opts.height]);
  }

  createSvg() {
    console.log('here I am', this.data);
    return d3.select(this.ele)
      .append("svg:svg")
      .attr("width", this.opts.width)
      .attr("height", this.opts.height)
      .attr("class", "stacked-bar-graph")
  }

  render() {
    const x = this.getXScale(),
          y = this.getYScale();

    const svg = this.createSvg();


  }
}

export default StackedBarGraph;
