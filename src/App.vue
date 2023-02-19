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
  connect,
  disconnect,
  publish,
  subscribe,
} from "@/service/capacitorjs-mqtt-bridge";
import {
  mqttConnectionEventListener,
  mqttMessageArrivedEventListener,
} from "@/composables/capacitorjs-mqtt-bridge-event-bus";

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
import { App } from "konsta/vue";

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

// Define reactive variables with initial values
const conn = ref({});
const mssg = ref({});
const activeTab = ref("");
const topicA = "brrr1";
const topicB = "brrr2";
const topicC = "brrr3";
const topicAMsg = ref("");
const topicBMsg = ref("");
const topicCMsg = ref("");

// Functions for MQTT communication
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

// Event listeners for MQTT communication
mqttConnectionEventListener.on((x) => {
  conn.value = x.connected;

  if (conn.value == true) {
    // Subscribe to topics once connected
    subscribe("brrr1", 2);
    subscribe("brrr2", 2);
    subscribe("brrr3", 2);
  }
});

mqttMessageArrivedEventListener.on((x) => {
  mssg.value = x.message;
  filterMessages(x.message);
});

// Filter messages based on topic
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

// Event listener for navigation between tabs
appNavigationEventBus.on((x) => {
  activeTab.value = x;
});

// Event listener for page load
window.addEventListener("load", async () => {
  // Hide the splash screen once the webview component is fully loaded
  console.log("Webview component loaded");
  await SplashScreen.hide();
});

// Event listener for component mount
onMounted(async () => {
  mqttConnect();
});

// Event listener for component update
onUpdated(async () => {});

// Reactive variable for swipe detection
const el = ref();
const { isSwiping, direction } = useSwipe(el);

// Watch for changes in swipe direction
watch(
  [isSwiping, direction],
  ([oldSwipe, oldDirection], [newSwipe, newDirection]) => {
    filterSwipeAction(newSwipe, newDirection);
  }
);
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
