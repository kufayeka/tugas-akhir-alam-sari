<script setup lang="ts">
import { bottomNavbarVisible } from "@/composables/app-navigation-event-bus";
import { hideSpinner } from "@/composables/capacitorjs-native-spinner";
import {
  setLandscape,
  setPortrait,
} from "@/composables/capacitorjs-screen-controller";
import useDelay from "@/composables/use-delay";
import { Card, Block, Button, Page } from "konsta/vue";
import { onBeforeMount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import GoogleChart from "../components/Grafik";
import GoogleChartExample from "../components/GoogleChartExample.vue";

const router = useRouter();

function goBackToMonitor() {
  setPortrait().then(async () => {
    router.push("/monitor/main");
    bottomNavbarVisible.value = true;
  });
}

const { delay } = useDelay();
const x = ref();

const pageStyle = ref({
  opacity: "0",
  transition: "opacity 0.5s ease-in-out",
});

onMounted(async () => {
  await delay(0.5);
  await setLandscape()
    .then(async (s) => {
      x.value = s.result;
      if (s.result == "success") {
        await delay(1);
        pageStyle.value.opacity = "1";
        await hideSpinner();
      }
    })
    .catch(() => {
      pageStyle.value.opacity = "1";
    });
});
</script>

<template>
  <Page class="pb-16" :style="pageStyle">
    <!-- <GoogleChart /> -->
    <GoogleChartExample />
    <!-- <Button @click="goBackToMonitor()">Back</Button> -->
  </Page>
</template>
