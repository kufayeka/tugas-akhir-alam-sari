<script setup lang="ts">
import { ref } from "vue";
import {
  connect,
  disconnect,
  publish,
  subscribe,
} from "./plugins/capacitorjs-mqtt-bridge";
import {
  mqttConnectionEventListener,
  mqttMessageArrivedEventListener,
} from "./composables/capacitorjs-mqtt-bridge-event-bus";
import { bottomNavbarEventBus } from "@/composables/bottom-navbar-event-bus";
import { kApp, kPage, kNavbar, kBlock, kButton, kCard } from "konsta/vue";
import ComponentBottomNavbar from "./components/ComponentBottomNavbar.vue";

const conn = ref({});
const mssg = ref({});
const view = ref("");
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
  publish("brrr1", "this is 1", 2, false);
}

function mqttPublish2() {
  publish("brrr2", "this is 2", 2, false);
}

function mqttPublish3() {
  publish("brrr3", "this is 3", 2, false);
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

var y = ref(0);

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

bottomNavbarEventBus.on((x) => {
  view.value = x;
});
</script>

<template>
  <kApp theme="material" :touch-ripple="true">
    <kPage>
      <kNavbar title="My App" />
      <kBlock class="space-y-2">
        <p>Here comes my app</p>
        <div>my pussy so wet rn - {{ conn }}</div>
        <div>Messages: {{ mssg }}</div>
        <kButton raised rounded clear class="border" @click="mqttConnect()"
          >Connect</kButton
        >
        <kButton raised rounded clear class="border" @click="mqttDisconnect()"
          >Disconnect</kButton
        >
        <kButton raised rounded clear class="border" @click="mqttPublish1()"
          >Send Msg 1</kButton
        >
        <kButton raised rounded clear class="border" @click="mqttPublish2()"
          >Send Msg 2</kButton
        >
        <kButton raised rounded clear class="border" @click="mqttPublish3()"
          >Send Msg 3</kButton
        >
        {{ view }}
        <kCard raised> Im a bad bitch... im a cunt. </kCard>
        <div>topic A: {{ topicAMsg }}</div>
        <div>topic B: {{ topicBMsg }}</div>
        <div>topic C: {{ topicCMsg }}</div>
      </kBlock>
      <ComponentBottomNavbar />
    </kPage>
  </kApp>
</template>

<style scoped></style>
