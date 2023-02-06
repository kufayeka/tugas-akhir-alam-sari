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
  IonHeader,
  IonToolbar,
  IonButton,
  IonFooter,
} from "@ionic/vue";
import { bottomNavbarEventBus } from "@/composables/bottom-navbar-event-bus";
import ComponentBottomNavbar from "./components/ComponentBottomNavbar.vue";

const conn = ref({});
const mssg = ref({});
const view = ref("");

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

mqttConnectionEventListener.on((x) => {
  conn.value = x.connected;

  if (conn.value == true) {
    // tambah if... subscribe hanya pas connect...
    subscribe("brrr1", 1);
    subscribe("brrr2", 1);
    subscribe("brrr3", 1);
  }
});

mqttMessageArrivedEventListener.on((x) => {
  mssg.value = x.message;
});

function filterMessages() {
  // switch(x) {
  //   case
  // }
}

bottomNavbarEventBus.on((x) => {
  view.value = x;
});
</script>

<template>
  <IonApp>
    <IonPage>
      <!-- <IonHeader>
        <IonToolbar>
          <IonLabel>test</IonLabel>
        </IonToolbar>
      </IonHeader> -->
      <IonContent>
        <div>my pussy so wet rn - {{ conn }}</div>
        <div>Messages: {{ mssg }}</div>
      </IonContent>
      <IonContent>
        <IonButton @click="mqttConnect()">Connect</IonButton>
        <IonButton @click="mqttDisconnect()">Disconnect</IonButton>
        <IonButton @click="mqttPublish1()">Send Msg 1</IonButton>
        <IonButton @click="mqttPublish2()">Send Msg 2</IonButton>
        <IonButton @click="mqttPublish3()">Send Msg 3</IonButton>
        {{ view }}
      </IonContent>
      <ComponentBottomNavbar />
    </IonPage>
  </IonApp>
</template>

<style scoped></style>
