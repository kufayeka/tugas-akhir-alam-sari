<script setup lang="ts">
import { onMounted, ref, onBeforeMount, onUpdated } from "vue";
import { useRoute } from "vue-router";
import {
  connect,
  disconnect,
  publish,
  subscribe,
} from "./service/capacitorjs-mqtt-bridge";
import {
  mqttConnectionEventListener,
  mqttMessageArrivedEventListener,
} from "./composables/capacitorjs-mqtt-bridge-event-bus";
import { appNavigationEventBus } from "@/composables/app-navigation-event-bus";
import { App, Page } from "konsta/vue";
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-creative";
import "@/assets/swiper-style.css";

import { SplashScreen } from "@capacitor/splash-screen";

// import required modules
import { EffectCreative, Pagination } from "swiper";

import ComponentBottomNavbar from "@/components/ComponentBottomNavbar.vue";
import ModuleMonitor from "@/modules/ModulesMonitor/ModuleMonitor.vue";
import ModuleKontrol from "@/modules/ModulesKontrol/ModuleKontrol.vue";
import ModuleInfo from "@/modules/ModulesInfo/ModuleInfo.vue";
import {
  viewComponentLoadingScreenDOM,
  viewComponentLoadingScreenMethods,
} from "@/views/ViewComponentLoadingScreen";

const conn = ref({});
const mssg = ref({});
const tabView = ref("");
const topicA = "brrr1";
const topicB = "brrr2";
const topicC = "brrr3";
const topicAMsg = ref("");
const topicBMsg = ref("");
const topicCMsg = ref("");

const modules = [EffectCreative, Pagination];

function mqttConnect() {
  connect();
}

function mqttDisconnect() {
  disconnect();
}

function mqttPublish1() {
  publish("brrr1", "this is 1", 2, true);
}

function mqttPublish2() {
  publish("brrr2", "this is 2", 2, true);
}

function mqttPublish3() {
  publish("brrr3", "this is 3", 2, true);
}

mqttConnectionEventListener.on((x) => {
  conn.value = x.connected;

  if (conn.value == true) {
    // tambah if... subscribe hanya pas connect...
    subscribe("brrr1", 2);
    subscribe("brrr2", 2);
    subscribe("brrr3", 2);
  }
});

mqttMessageArrivedEventListener.on((x) => {
  mssg.value = x.message;
  filterMessages(x.message);
});

function filterMessages(x: any) {
  switch (x.topic) {
    case topicA:
      topicAMsg.value = x.message;
      break;
    case topicB:
      topicBMsg.value = x.message;
      break;
    case topicC:
      topicCMsg.value = x.message;
      break;
  }
}

appNavigationEventBus.on((x) => {
  tabView.value = x;
});

window.addEventListener("load", async () => {
  // Hide the splash screen once the webview component is fully loaded
  console.log("Webview component loaded");
});

onMounted(async () => {
  mqttConnect();
  await SplashScreen.hide();
});

onUpdated(async () => {});
</script>

<template>
  <App theme="material">
    <viewComponentLoadingScreenDOM />
    <ModuleMonitor v-show="tabView === 'tabMonitor'" />
    <ModuleKontrol v-show="tabView === 'tabKontrol'" />
    <ModuleInfo v-show="tabView === 'tabInfo'" />
    <ComponentBottomNavbar />
  </App>
</template>

<style></style>
