<script setup lang="ts">
// Vue
import {
  onMounted,
  ref,
  onBeforeMount,
  onUpdated,
  watch,
  defineAsyncComponent,
} from "vue";

// CapacitorJS MQTT Bridge
import {
  mqttConnect,
  mqttDisconnect,
  subscribe,
  publish,
} from "@/service/capacitorjs-mqtt-bridge";
import { mqttMessageArrivedEventListener } from "@/composables/capacitorjs-mqtt-bridge-event-bus";

// App Navigation
import {
  appNavigationEventBus,
  arrTabView,
  arrTabViewPointer,
  filterSwipeAction,
} from "@/composables/app-navigation-event-bus";
import { useSwipe } from "@vueuse/core";

// Capacitor
import { SplashScreen } from "@capacitor/splash-screen";

// Konsta
import { App, Button } from "konsta/vue";

// Async Components
const ComponentBottomNavbar = defineAsyncComponent(
  () => import("@/components/ComponentBottomNavbar.vue")
);
const ModuleMonitor = defineAsyncComponent(
  () => import("@/modules/ModulesMonitor/ModuleMonitor.vue")
);
const ModuleKontrol = defineAsyncComponent(
  () => import("@/modules/ModulesKontrol/ModuleKontrol.vue")
);
const ModuleInfo = defineAsyncComponent(
  () => import("@/modules/ModulesInfo/ModuleInfo.vue")
);

const conn = ref(false);
const mssg = ref({});
const activeTab = ref("");
const topicA = "brrr1";
const topicB = "brrr2";
const topicC = "brrr3";
const topicAMsg = ref("");
const topicBMsg = ref("");
const topicCMsg = ref("");

window.addEventListener("load", async () => {
  // Hide the splash screen once the webview component is fully loaded
  console.log("Webview component loaded");
});

const el = ref();
const { isSwiping, direction } = useSwipe(el);

watch(
  [isSwiping, direction],
  ([oldSwipe, oldDirection], [newSwipe, newDirection]) => {
    filterSwipeAction(newSwipe, newDirection);
  }
);

appNavigationEventBus.on((x) => {
  activeTab.value = x;
});

onMounted(async () => {
  await SplashScreen.hide();
});

onUpdated(async () => {});
</script>

<template>
  <App theme="material" ref="el">
    <ModuleMonitor v-show="activeTab === arrTabView[0]" />
    <ModuleKontrol v-show="activeTab === arrTabView[1]" />
    <ModuleInfo v-show="activeTab === arrTabView[2]" />
    <ComponentBottomNavbar />
  </App>
</template>

<style></style>
