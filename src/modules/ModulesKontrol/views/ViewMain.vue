<script setup lang="ts">
import { Block, Button, Card, Page } from "konsta/vue";
import { ref, onMounted } from "vue";

import ComponentReuseableInputField from "../components/ComponentReuseableInputField.vue";
import ComponentReuseableGreenButton from "../components/ComponentReusableGreenButton.vue";

import ComponentTargetKelembabanPanel from "../components/ComponentTargetKelembabanPanel.vue";
import ComponentDataRecordIntervalPanel from "../components/ComponentDataRecordIntervalPanel.vue";
import ComponentSprinklerIntervalPanel from "../components/ComponentSprinklerIntervalPanel.vue";
import ComponentPIDParameterPanel from "../components/ComponentPIDParameterPanel.vue";
import { mqttMessageArrivedEventListener } from "@/composables/capacitorjs-mqtt-bridge-event-bus";
import { parameterSettingMQTTTopic } from "@/service/capacitorjs-mqtt-bridge";

import { MqttBridge } from "capacitor-mqtt-native-plugin";

const myDiv = ref();
onMounted(() => {
  // set the main card height to fill the screen when the content inside can't
  if (myDiv.value.offsetHeight < window.innerHeight * 0.9) {
    myDiv.value.style.height = "1000px";
  }
});

const setPointInput = ref();
const intervalDataLoggerInput = ref();
const sprinklerIntervalFromInput = ref();
const sprinklerIntervalToInput = ref();
const PID_P_input = ref();
const PID_I_input = ref();
const PID_D_input = ref();

mqttMessageArrivedEventListener.on((x: any) => {
  var topic = x.topic;
  var message = JSON.stringify(x.message);

  if (topic == parameterSettingMQTTTopic) {
    var settings = JSON.parse(message);
    var settings_parsed = JSON.parse(settings);

    setPointInput.value = settings_parsed.pid_settings.set_point;

    PID_P_input.value = settings_parsed.pid_settings.kp;
    PID_I_input.value = settings_parsed.pid_settings.ki;
    PID_D_input.value = settings_parsed.pid_settings.kd;

    sprinklerIntervalFromInput.value =
      settings_parsed.pid_settings.interval_from;
    sprinklerIntervalToInput.value = settings_parsed.pid_settings.interval_to;

    intervalDataLoggerInput.value =
      settings_parsed.data_logger_settings.interval;
  }
});

function simpanPengaturan() {
  var topic = parameterSettingMQTTTopic;
  var qos = 2;
  var retained = true;

  var payload = JSON.stringify({
    pid_settings: {
      set_point: setPointInput.value,
      kp: PID_P_input.value,
      ki: PID_I_input.value,
      kd: PID_D_input.value,
      interval_from: sprinklerIntervalFromInput.value,
      interval_to: sprinklerIntervalToInput.value,
    },
    data_logger_settings: {
      interval: intervalDataLoggerInput.value,
    },
  });

  MqttBridge.publish({ topic, payload, qos, retained })
    .then((result: any) => {
      // The message is published successfully
    })
    .catch((errorMessage: any) => {
      // The message fails to publish
    });
}

const showWarning = true;
</script>

<template>
  <div class="h-fit flex flex-col justify-between" ref="el">
    <div v-show="showWarning" class="black-overlay z-20"></div>

    <div v-show="showWarning" class="warning-box z-20">
      <p
        class="flex justify-center font-semibold text-center text-sm tracking-tighter opacity-80"
      >
        Pengubahan Parameter Berhasil !
      </p>
    </div>

    <Card class="flex-1 pb-32 shadow-card2">
      <div class="max-w-screen-md mx-auto">
        <h1 class="font-bold text-3xl text-md-light-primary">Kontrol</h1>
        <div class="space-y-3">
          <p class="text-justify text-md tracking-tighter opacity-80">
            Berikut adalah beberapa parameter pengaturan dari sistem kumbung
            jamur.
          </p>
          <p class="text-justify text-md tracking-tighter opacity-80">
            Untuk mengubah nilai parameter tertentu. Klik kotak yang berisi
            angka untuk mengubah nilai dan klik tombol "Simpan" untuk menyimpan
          </p>
        </div>
        <div class="space-y-5 mt-7 mx-3">
          <div
            class="relative bg-white shadow-card2 rounded-md flex flex-col z-0"
          >
            <p
              class="font-bold text-md text-md-light-primary ml-3 mt-3 tracking-tighter"
            >
              Target Kelembaban
            </p>

            <table class="w-full mt-7">
              <tbody>
                <tr>
                  <td
                    class="text-right font-semibold text-md text-black pr-4 tracking-tighter opacity-80"
                  >
                    Kumbung 1:
                  </td>
                  <td class="flex justify-center">
                    <div class="rounded-input">
                      <input
                        v-model="setPointInput"
                        type="number"
                        class="rounded-input-field"
                      />
                    </div>
                  </td>
                  <td
                    class="text-right font-semibold text-md text-black pr-4 tracking-tighter opacity-80"
                  >
                    % RH
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="flex flex-row justify-center py-3 mt-5">
              <ComponentReuseableGreenButton
                class="w-36"
                button-text="Simpan"
                @click="simpanPengaturan"
              />
            </div>
          </div>

          <div
            class="relative bg-white shadow-card2 rounded-md flex flex-col z-0"
          >
            <p
              class="font-bold text-md text-md-light-primary ml-3 mt-3 tracking-tighter"
            >
              Selang Waktu Pencatatan Data Klimat (Temperatur, Kelembaban)
            </p>

            <table class="w-full mt-7">
              <tbody>
                <tr>
                  <td
                    class="text-right font-semibold text-md text-black pr-4 tracking-tighter opacity-80"
                  >
                    Interval:
                  </td>
                  <td class="flex justify-center">
                    <div class="rounded-input">
                      <input
                        v-model="intervalDataLoggerInput"
                        type="number"
                        class="rounded-input-field"
                      />
                    </div>
                  </td>
                  <td
                    class="text-right font-semibold text-md text-black pr-4 tracking-tighter opacity-80"
                  >
                    Detik
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="flex flex-row justify-center py-3 mt-5">
              <ComponentReuseableGreenButton
                class="w-36"
                button-text="Simpan"
                @click="simpanPengaturan"
              />
            </div>
          </div>

          <div
            class="relative bg-white shadow-card2 rounded-md flex flex-col z-0"
          >
            <p
              class="font-bold text-md text-md-light-primary ml-3 mt-3 tracking-tighter"
            >
              Selang Waktu ON & OFF Maksimal Sprinkler
            </p>

            <table class="w-full mt-7">
              <tbody>
                <tr>
                  <td
                    class="text-right font-semibold text-md text-black pr-4 tracking-tighter opacity-80"
                  >
                    ON:
                  </td>
                  <td class="flex justify-center">
                    <div class="rounded-input">
                      <input
                        v-model="sprinklerIntervalFromInput"
                        type="number"
                        class="rounded-input-field"
                      />
                    </div>
                  </td>
                  <td
                    class="text-right font-semibold text-md text-black pr-4 tracking-tighter opacity-80"
                  >
                    Detik
                  </td>
                </tr>
                <tr>
                  <td
                    class="text-right font-semibold text-md text-black pr-4 tracking-tighter opacity-80"
                  >
                    OFF:
                  </td>
                  <td class="flex justify-center">
                    <div class="rounded-input">
                      <input
                        v-model="sprinklerIntervalToInput"
                        type="number"
                        class="rounded-input-field"
                      />
                    </div>
                  </td>
                  <td
                    class="text-right font-semibold text-md text-black pr-4 tracking-tighter opacity-80"
                  >
                    Detik
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="flex flex-row justify-center py-3 mt-5">
              <ComponentReuseableGreenButton
                class="w-36"
                button-text="Simpan"
                @click="simpanPengaturan"
              />
            </div>
          </div>

          <div
            class="relative bg-white shadow-card2 rounded-md flex flex-col z-0"
          >
            <p
              class="font-bold text-md text-md-light-primary ml-3 mt-3 tracking-tighter"
            >
              Parameter Kontrol PID
            </p>

            <table class="w-full mt-7">
              <tbody>
                <tr>
                  <td
                    class="text-right font-semibold text-md text-black pr-4 tracking-tighter opacity-80"
                  >
                    Proporsional:
                  </td>
                  <td class="flex justify-center">
                    <div class="rounded-input">
                      <input
                        v-model="PID_P_input"
                        type="number"
                        class="rounded-input-field"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td
                    class="text-right font-semibold text-md text-black pr-4 tracking-tighter opacity-80"
                  >
                    Integral:
                  </td>
                  <td class="flex justify-center">
                    <div class="rounded-input">
                      <input
                        v-model="PID_I_input"
                        type="number"
                        class="rounded-input-field"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td
                    class="text-right font-semibold text-md text-black pr-4 tracking-tighter opacity-80"
                  >
                    Derivatif:
                  </td>
                  <td class="flex justify-center">
                    <div class="rounded-input">
                      <input
                        v-model="PID_D_input"
                        type="number"
                        class="rounded-input-field"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="flex flex-row justify-center py-3 mt-5">
              <ComponentReuseableGreenButton
                class="w-36"
                button-text="Simpan"
                @click="simpanPengaturan"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<style scoped>
.rounded-input {
  border-radius: 20px;
  border: 0px solid gray;
  padding: 0px;
}

.rounded-input-field {
  border-radius: 20px;
  border: 1px solid black;
  outline: none;
  font-size: 16px;
  height: 30px;
  width: 5rem;
  text-align: center;
  background-color: white;
  color: black;
  font-weight: bold;
}

.black-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10;
}

.warning-box {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  z-index: 20;
}
</style>
