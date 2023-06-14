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

// App Navigation
import {
  appNavigationEventBus,
  arrTabView,
  arrTabViewPointer,
  bottomNavbarVisible,
  filterSwipeAction,
} from "@/composables/app-navigation-event-bus";
import { useSwipe } from "@vueuse/core";

// Capacitor
import { App as CapacitorApp } from "@capacitor/app";
import { SplashScreen } from "@capacitor/splash-screen";

// Konsta
import { App, Button } from "konsta/vue";
import router from "./router";
import { useRoute } from "vue-router";
import { setPortrait } from "./composables/capacitorjs-screen-controller";

import useDelay from "@/composables/use-delay";
import { mqttConnect } from "./service/capacitorjs-mqtt-bridge";
import {
  mqttConnectCompleteListener,
  mqttConnectinLostEventListener,
} from "./composables/capacitorjs-mqtt-bridge-event-bus";

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

const activeTab = ref("");

const el = ref();
const { isSwiping, direction } = useSwipe(el);

watch(
  [isSwiping, direction],
  ([oldSwipe, oldDirection], [newSwipe, newDirection]) => {
    // guard the swipe action when kumbung1 or 2 is still open
    if (route.name === "kumbung1" || route.name === "kumbung2") {
    } else {
      filterSwipeAction(newSwipe, newDirection);
    }
  }
);

appNavigationEventBus.on((x) => {
  activeTab.value = x;
});

const route = useRoute();

CapacitorApp.addListener("backButton", async (x) => {
  console.log("Back Button Pressed. canGoBack Status:", x.canGoBack);

  console.log("current route:", route.name);

  if (route.name === "kumbung1" || route.name === "kumbung2") {
    setPortrait().then(() => {
      router.push("/monitor/main");
      bottomNavbarVisible.value = true;
    });
  }
});

const isMqttConnected = ref(0);

mqttConnectCompleteListener.on((x: any) => {
  isMqttConnected.value = 1;
  useDelay()
    .delay(2)
    .then(() => {
      isMqttConnected.value = 3;
    });
});

mqttConnectinLostEventListener.on((x: any) => {
  isMqttConnected.value = 2;
});

onMounted(async () => {
  await SplashScreen.hide();
  mqttConnect();
});

onUpdated(async () => {});
</script>

<template>
  <App theme="material" safe-areas ref="el">
    <ModuleMonitor v-show="activeTab === arrTabView[0]" />
    <ModuleKontrol v-show="activeTab === arrTabView[1]" />
    <ModuleInfo v-show="activeTab === arrTabView[2]" />

    <div
      class="absolute top-0 w-full bg-primary flex justify-center"
      :class="{
        'transition-opacity ease-in duration-1000 opacity-100':
          isMqttConnected == 1,
        'transition-opacity ease-in duration-500 opacity-0':
          isMqttConnected == 3,
      }"
    >
      <p class="text-justify text-sm tracking-tighter opacity-80 text-white">
        Terhubung dengan server :)
      </p>
    </div>

    <div
      v-show="isMqttConnected == 2"
      class="absolute top-0 w-full bg-red-700 flex justify-center"
    >
      <p class="text-justify text-sm tracking-tighter opacity-80 text-white">
        Tidak terhubung dengan server :(
      </p>
    </div>
    <ComponentBottomNavbar />
  </App>
</template>

<style>
.fade-out {
  opacity: 0;
  transition: opacity 2s;
}
</style>
