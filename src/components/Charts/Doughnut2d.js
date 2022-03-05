import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Chart from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";

ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const Doughnut2D = ({data}) => {
  const chartConfigs = {
  type: "doughnut2d", 
  width: "100%", 
  height: "400", 
  dataFormat: "json", 
  dataSource: {
    chart: {
      caption: "Starts Per Language",
      theme: "candy",
      showPercentValues: 0,
      doughnutRadius: '45%'
    },
    data
  }
};
  return <ReactFC {...chartConfigs} />
}

export default Doughnut2D
