import { defineComponent, h } from "vue";

import { GChart } from "vue-google-charts";

import data_json from "../assets/steadyStateTest.json";

export const type = "AreaChart";

interface Data {
  id: number;
  temperatur: number;
  kelembaban: number;
  createdAt: string;
  updatedAt: string;
}

const jsonData: Data[] = data_json.data;

export let data: any[] = [];

// Push the header row
data.push(["createdAt", "temperatur", "kelembaban"]);

// Push the data rows
for (const val of jsonData) {
  const { temperatur, kelembaban, createdAt } = val;
  data.push([createdAt, temperatur, kelembaban]);
}

export const options = {
  title: "Grafik Klimat",
  hAxis: { title: "createdAt", titleTextStyle: { color: "#333" } },
  vAxis: { minValue: 0 },
  chartArea: { width: "80%", height: "70%" },
};

export default defineComponent({
  name: "GoogleChart",
  components: {
    GChart,
  },
  setup() {
    return () =>
      h(GChart, {
        data,
        options,
        type,
      });
  },
});
