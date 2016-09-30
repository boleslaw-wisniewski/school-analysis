class BarChart {

  constructor(ele) {
    this.ele = ele;
  }

  render() {
    this.ele.innerHTML = `
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
        </svg>`;
  }


}

export default BarChart;
