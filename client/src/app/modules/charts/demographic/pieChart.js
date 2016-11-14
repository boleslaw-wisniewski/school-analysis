class PieChart {

  constructor(ele) {
    this.ele = ele;
  }

  render() {
    this.ele.innerHTML = `
      <svg width="100" height="100" class="chart category-color-p-1">
        <circle r="25" cx="50" cy="50" class="pie"/>
      </svg>
      <svg width="100" height="100" class="chart category-color-p-2">
        <circle r="25" cx="50" cy="50" class="pie"/>
      </svg>
      <svg width="100" height="100" class="chart category-color-p-3">
        <circle r="25" cx="50" cy="50" class="pie"/>
      </svg>
      <svg width="100" height="100" class="chart category-color-p-4">
        <circle r="25" cx="50" cy="50" class="pie"/>
      </svg>`;
  }

}

export default PieChart;
