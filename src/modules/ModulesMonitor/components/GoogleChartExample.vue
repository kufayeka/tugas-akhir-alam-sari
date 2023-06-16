<template>
  <div class="h-full w-full">
    <div
      id="main"
      class="w-full h-full"
      style="width: 700px; height: 450px"
    ></div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import Plotly from "plotly.js-dist-min";

onMounted(async () => {
  // Create the chart container
  const container = document.getElementById("main");

  const startDate = new Date("2023-06-16T00:00:00.000Z");
  const endDate = new Date("2023-06-17T00:00:00.000Z");
  const interval = 30; // Interval in minutes

  const response = await fetch(
    "http://203.189.122.131:7777/climate_data_records/mushroom_house/2/7"
  );
  const dataFromServer = await response.json();
  const data = generateData(dataFromServer);

  const layout = {
    title: {
      text: "Rekaman Data Klimat",
      x: 0.5, // Set the x position to center the title
      xanchor: "center", // Center align the title
    },
    xaxis: {
      type: "date",
    },
    yaxis: {
      range: [0, 100],
    },
    legend: {
      orientation: "h",
      yanchor: "bottom",
      y: 1.02,
      xanchor: "right",
      x: 1,
    },
    margin: {
      autoexpand: true,
    },
    autosize: true,
  };

  // Plot the chart
  Plotly.newPlot(
    container,
    [
      {
        x: data.map(({ timestamp }) => new Date(timestamp)),
        y: data.map(({ temp2 }) => temp2),
        name: "Temperatur (C)",
        type: "scatter",
        mode: "lines",
        line: {
          shape: "linear",
        },
        fill: "tozeroy",
        hovertemplate: "Waktu: %{x}<br>Temperatur: %{y}<extra></extra>",
      },
      {
        x: data.map(({ timestamp }) => new Date(timestamp)),
        y: data.map(({ hum2 }) => hum2),
        name: "Kelembaban (% RH)",
        type: "scatter",
        mode: "lines",
        line: {
          shape: "linear",
        },
        fill: "tozeroy",
        hovertemplate: "Waktu: %{x}<br>Kelembaban: %{y}<extra></extra>",
      },
    ],
    layout,
    {
      displaylogo: false,
    }
  );

  // Function to generate data based on the server response
  function generateData(serverData) {
    return serverData.map(({ timestamp, temp2, hum2 }) => ({
      timestamp: new Date(timestamp),
      temp2,
      hum2,
    }));
  }
});
</script>

<style></style>
