<script setup lang="ts">
import { bottomNavbarVisible } from "@/composables/app-navigation-event-bus";
import { showSpinner } from "@/composables/capacitorjs-native-spinner";
import { Card, Block, Button, Page } from "konsta/vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { componentCardKumbung1DOM } from "../components/ComponentCardKumbung1";
import { componentCardKumbung2DOM } from "../components/ComponentCardKumbung2";

// CapacitorJS MQTT Bridge
import {
  mqttConnect,
  mqttDisconnect,
  realtimeDataMQTTTopic,
} from "@/service/capacitorjs-mqtt-bridge";
import {
  mqttConnectFailedEventListener,
  mqttMessageArrivedEventListener,
} from "@/composables/capacitorjs-mqtt-bridge-event-bus";
import dayjs from "dayjs";

const router = useRouter();

async function goToKumbung1() {
  showSpinner();
  router.push("/monitor/kumbung1");
}

async function goToKumbung2() {
  showSpinner();
  router.push("/monitor/kumbung2");
}

const sensor1Temperature = ref(0);
const sensor1Humidity = ref(0);
const sensor2Temperature = ref(0);
const sensor2Humidity = ref(0);
const timestamp = ref("");

mqttMessageArrivedEventListener.on((x: any) => {
  var topic = x.topic;
  var message = x.message;

  if (topic == realtimeDataMQTTTopic) {
    var readings = JSON.parse(message);
    sensor1Temperature.value = parseFloat(
      readings.sensor1.temperature.toFixed(2)
    );
    sensor1Humidity.value = parseFloat(readings.sensor1.humidity.toFixed(2));
    sensor2Temperature.value = parseFloat(
      readings.sensor2.temperature.toFixed(2)
    );
    sensor2Humidity.value = parseFloat(readings.sensor2.humidity.toFixed(2));
    timestamp.value = dayjs(readings.timestamp).format("DD-MM-YYYY (HH:mm:ss)");
  }
});

const myDiv = ref();
onMounted(() => {
  // set the main card height to fill the screen when the content inside can't
  if (myDiv.value.offsetHeight < window.innerHeight * 0.9) {
    myDiv.value.style.height = "1000px";
  }
});
</script>

<template>
  <div class="h-fit flex flex-col justify-between" ref="myDiv">
    <Card class="flex-1 pb-32 shadow-card2">
      <div class="max-w-screen-md mx-auto">
        <div class="font-bold text-3xl text-md-light-primary">
          Monitor
          <p class="text-justify text-sm tracking-tighter opacity-80">
            Data Terakhir Diperbarui : {{ timestamp }}
          </p>
        </div>
        <p class="text-justify text-md tracking-tighter opacity-80">
          Halaman ini menampilkan data terkini dari setiap kumbung jamur.
        </p>
        <div class="space-y-5 mt-7">
          <componentCardKumbung1DOM />
          <componentCardKumbung2DOM />
        </div>
      </div>
    </Card>
  </div>
</template>
