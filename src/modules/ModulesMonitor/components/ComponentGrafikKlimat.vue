<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import data_json from "../assets/steadyStateTest.json";
import { Button } from "konsta/vue";

// import GoogleChart from "./Grafik";

const render = () => {};

// Define code to run when the component is mounted using the "onMounted" function
onMounted(() => {});
</script>

<template>
  Ini Grafik
  <div class="w-full">
    <!-- <GoogleChart /> -->
    <Button @click="render()">Render Chart</Button>
  </div>
</template>

<style>
.myChart {
  max-width: 650px;
  margin: 35px auto;
}
</style>
