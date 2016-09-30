
class PieChart {

  constructor(ele) {
    this.ele = ele;
  }

  render() {
    this.ele.innerHTML = `
      <svg width="100" height="100" class="chart">
        <circle r="25" cx="50" cy="50" class="pie"/>
      </svg>`;
  }

}

export default PieChart;
