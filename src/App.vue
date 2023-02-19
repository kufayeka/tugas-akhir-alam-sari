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

const conn = ref(false);
const mssg = ref({});
const activeTab = ref("");
const topicA = "brrr1";
const topicB = "brrr2";
const topicC = "brrr3";
const topicAMsg = ref("");
const topicBMsg = ref("");
const topicCMsg = ref("");

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

const oldTab = ref();
const newTab = ref();

watch([activeTab], ([newActiveTab], [oldActiveTab]) => {
  oldTab.value = oldActiveTab;
  newTab.value = newActiveTab;
});

const fps = ref(0);
let lastTime = 0;
let frameCount = 0;

function measureFPS(timestamp: number) {
  if (lastTime === 0) {
    lastTime = timestamp;
  }
  const elapsed = timestamp - lastTime;
  if (elapsed >= 1000) {
    fps.value = Math.round(frameCount / (elapsed / 1000));
    lastTime = timestamp;
    frameCount = 0;
  }
  frameCount++;
  window.requestAnimationFrame(measureFPS);
}

onMounted(async () => {
  mqttConnect();
  await SplashScreen.hide();
  window.requestAnimationFrame(measureFPS);
});

onUpdated(async () => {});
</script>

<template>
  <p class="sticky top-0">FPS: {{ fps }}, MQTT: {{ conn }}</p>
  <App theme="material" ref="el">
    <ModuleMonitor v-show="activeTab === arrTabView[0]" />
    <ModuleKontrol v-show="activeTab === arrTabView[1]" />
    <ModuleInfo v-show="activeTab === arrTabView[2]" />
    <ComponentBottomNavbar />
  </App>
</template>

<style></style>
