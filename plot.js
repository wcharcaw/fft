const f = 10;
const Fs = 200;
const T = 1 / Fs;

let s2 = [];
for (var t = 0; t < 50; t++) {
  s2.push([t, Math.sin(2 * Math.PI * f * t * T).toFixed(3)]);
}

var options = {
  chart: {
    type: "line",
  },
  stroke: {
    width: 1,
  },
  series: [
    {
      name: "sin",
      data: s3,
    },
  ],
  xaxis: {
    type: "numeric",
  },
};

var chart = new ApexCharts(document.querySelector("#chart"), options);

chart.render();
