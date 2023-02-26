<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import data_json from "../assets/steadyStateTest.json";

let series = ref();
series.value = [
  {
    name: "Temperatur (&#176;C)",
    type: "area",
    data: [10, 12, 14, 15, 16],
  },
  {
    name: "Kelembaban (%RH)",
    type: "area",
    data: [27, 23, 12, 19, 15],
  },
];

var chartOptions = {
  colors: ["#b84644", "#4576b5"],
  title: {
    text: "Grafik Klimat",
    align: "left",
  },
  chart: {
    id: "grafikKumbung1",
    type: "area",
    brush: {
      enabled: false,
      target: "grafikKumbung1",
      autoScaleYaxis: false,
    },
    toolbar: {
      show: true,
      tools: {
        download: false,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: 1,
  },
  grid: {
    row: {
      colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
      opacity: 0.8,
    },
  },
  xaxis: {
    type: "datetime",
    position: "bottom",
    labels: {
      show: true,
      datetimeUTC: false,
      datetimeFormatter: {
        year: "yyyy",
        month: "MMM 'yy",
        day: "dd MMM",
        hour: "HH:mm",
      },
    },
    axisBorder: {
      show: true,
      color: "#78909C",
      height: 1,
      width: "100%",
      offsetX: 0,
      offsetY: 0,
    },
    axisTicks: {
      show: true,
      borderType: "solid",
      color: "#78909C",
      height: 6,
      offsetX: 0,
      offsetY: 0,
    },
    tooltip: {
      enabled: false,
    },
  },
  yaxis: [
    {
      tickAmount: 5,
      min: 0,
      max: 100,
      axisBorder: {
        show: true,
        color: "#78909C",
        height: "100%",
        width: 1,
        offsetX: -1,
        offsetY: 0,
      },
      axisTicks: {
        show: true,
        borderType: "solid",
        color: "#78909C",
        height: 6,
        offsetX: 0,
        offsetY: 0,
      },
      labels: {
        show: true,
      },
      title: {
        //text: "Axe 1",
        style: {
          color: "#008FFB",
        },
      },
      tooltip: {
        enabled: true,
      },
    },
  ],
  tooltip: {
    x: {
      format: "d/M/yyyy HH:mm:s",
    },
  },
};

function testing() {
  let dataGrafikTemperatur = [];
  let dataGrafikKelembaban = [];
  let dataStoreJSON = data_json.data;

  let now = new Date();
  let yesterday_v1 = new Date(now.getTime() - 1000 * 60 * 60 * 24);
  let yesterday_v2 = now.getDate() - 1;
  let hourago = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 60);

  // //filter data 30 menit terakhir
  // let dataStoreFiltered = dataStoreJSON.filter(
  //   (x: { createdAt: string | number | Date }) => new Date(x.createdAt) >= now
  // );

  let dataStoreFiltered = dataStoreJSON;

  for (let obj of dataStoreFiltered) {
    dataGrafikTemperatur.push([obj.createdAt, obj.temperatur]);
    dataGrafikKelembaban.push([obj.createdAt, obj.kelembaban]);
  }

  console.log(dataGrafikTemperatur, dataGrafikKelembaban);

  series.value = [
    {
      name: "Temperatur (&#176;C)",
      type: "area",
      data: dataGrafikTemperatur,
    },
    {
      name: "Kelembaban (%RH)",
      type: "area",
      data: dataGrafikKelembaban,
    },
  ];
}

// Define code to run when the component is mounted using the "onMounted" function
onMounted(() => {
  testing();
});
</script>

<template>
  <apexchart :height="300" :options="chartOptions" :series="series" />
</template>
