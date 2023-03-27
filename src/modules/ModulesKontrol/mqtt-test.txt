<script setup lang="ts">
import { Block, Button, Card, Page } from "konsta/vue";
import { ref, onMounted } from "vue";
import {
  mqttConnect,
  mqttDisconnect,
  subscribe,
  requestDatabaseRecords,
} from "@/service/capacitorjs-mqtt-bridge";

import {
  mqttConnectCompleteListener,
  mqttConnectinLostEventListener,
  mqttMessageArrivedEventListener,
} from "@/composables/capacitorjs-mqtt-bridge-event-bus";

const connectionStatusLog = ref([{}]);
const incomingMessagesLog = ref([{}]);

mqttConnectCompleteListener.on((x: any) => {
  var y = {
    status: "connected",
    reconnected: x.reconnected,
    serverURI: x.serverURI,
  };
  connectionStatusLog.value.push(y);
});

mqttConnectinLostEventListener.on((x: any) => {
  var y = {
    status: "disconnected",
    connectionStatus: x.connectionStatus,
    mqttReasonCode: x.reasonCode,
    message: x.message,
  };
  connectionStatusLog.value.push(y);
});

mqttMessageArrivedEventListener.on((x: any) => {
  var y = {
    status: "Received a new message",
    topic: x.topic,
    message: JSON.parse(x.message),
  };
  incomingMessagesLog.value.push(y);
});

const limitValue = ref();

const myDiv = ref();
onMounted(() => {
  // set the main card height to fill the screen when the content inside can't
  if (myDiv.value.offsetHeight < window.innerHeight * 0.9) {
    myDiv.value.style.height = "90vh";
  }
});
</script>

<template>
  <Page class="pb-20 z-0">
    <div class="h-fit flex flex-col justify-between" ref="myDiv">
      <Card class="flex-1 pb-32 shadow-card2">
        <div class="max-w-screen-md mx-auto">
          <h1 class="font-bold text-3xl text-md-light-primary">Kontrol</h1>
          <p class="text-justify text-md tracking-tighter opacity-70">
            Halaman ini menampilkan data terkini dari setiap kumbung jamur. Klik
            salah satu kumbung jamur di bawah untuk mulai memonitor.
          </p>
          <div class="space-y-7">
            <Button @click="mqttConnect()">Connect</Button>
            <Button @click="mqttDisconnect()">Disconnect</Button>
            <Button @click="subscribe()">Subscribe</Button>
            <input v-model="limitValue" />
            <p>limit={{ limitValue }}</p>
            <Button
              @click="
                requestDatabaseRecords({
                  grafik_kumbung: 1,
                  limit: Number(limitValue),
                })
              "
              >Request DB</Button
            >
          </div>
        </div>
      </Card>
    </div>
    <div>
      <b>Connection Status:</b>
      <div v-for="i in connectionStatusLog">
        <p>{{ i }}</p>
      </div>

      <b>Incoming Messages:</b>
      <div v-for="i in incomingMessagesLog">
        <p>{{ i }}</p>
      </div>
    </div>
  </Page>
</template>
