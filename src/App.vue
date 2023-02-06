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
import {
  IonApp,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonContent,
} from "@ionic/vue";

const conn = ref({});

const mssg = ref({});

function mqttConnect() {
  connect();
}

function mqttDisconnect() {
  disconnect();
}

function mqttPublish1() {
  publish("brrr1", "this is 1", 0, false);
}

function mqttPublish2() {
  publish("brrr2", "this is 2", 0, false);
}

function mqttPublish3() {
  publish("brrr3", "this is 3", 0, false);
}

mqttConnectionEventListener.on((e) => {
  conn.value = e.connected;

  // tambah if... subscribe hanya pas connect...
  subscribe("brrr1", 1);
  subscribe("brrr2", 1);
  subscribe("brrr3", 1);
});

mqttMessageArrivedEventListener.on((e) => {
  mssg.value = e.message;
});

function filterMessages() {
  // switch(x) {
  //   case
  // }
}

const beforeTabChange = () => {
  // do something before tab change
};

const afterTabChange = () => {
  // do something after tab change
};
</script>

<template>
  <IonApp>
    <IonPage>
      <IonContent>
        <div>my pussy so wet rn - {{ conn }}</div>
        <div>Messages: {{ mssg }}</div>
        <button @click="mqttConnect()">Connect</button>
        <button @click="mqttDisconnect()">Disconnect</button>
        <button @click="mqttPublish1()">Send Msg 1</button>
        <button @click="mqttPublish2()">Send Msg 2</button>
        <button @click="mqttPublish3()">Send Msg 3</button>
      </IonContent>
    </IonPage>
  </IonApp>
</template>

<style scoped></style>
