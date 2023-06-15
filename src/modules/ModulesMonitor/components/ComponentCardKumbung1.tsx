import { defineComponent, ref } from "vue";
import { Button, Block, Page, Card, Preloader } from "konsta/vue";
import dayjs from "dayjs";

import imgBg from "../assets/image.png";
import camIcon from "../assets/camIcon.png";

import {
  styleKolomDataKimat,
  styleJudulDataKlimat,
  styleValueDataKlimat,
} from "@/composables/tailwind-component-styles";

import { useRouter } from "vue-router";
import { showSpinner } from "@/composables/capacitorjs-native-spinner";
import useDelay from "@/composables/use-delay";
import { bottomNavbarVisible } from "@/composables/app-navigation-event-bus";
import { Camera, CameraResultType } from "@capacitor/camera";
import { mqttMessageArrivedEventListener } from "@/composables/capacitorjs-mqtt-bridge-event-bus";
import { realtimeDataMQTTTopic } from "@/service/capacitorjs-mqtt-bridge";

export const componentCardKumbung1Methods = {};

const imageUrl = ref(localStorage.getItem("imageUrlKumbung1") || null);

const isHovered = ref(false);

const takePicture = async () => {
  isHovered.value = true;

  setTimeout(() => {
    isHovered.value = false;
  }, 300);

  const image = await Camera.getPhoto({
    quality: 100,
    allowEditing: false,
    promptLabelHeader: "Foto Kumbung Jamur 1",
    promptLabelPhoto: "Ambil foto dari galeri",
    promptLabelPicture: "Ambil foto (kamera)",
    resultType: CameraResultType.Uri,
  });

  var imageUrlPath = image.webPath;

  // save image path to local storage
  localStorage.setItem("imageUrlKumbung1", String(imageUrlPath));

  // update image
  imageUrl.value = localStorage.getItem("imageUrlKumbung1");
};

const msg = ref();
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

export const componentCardKumbung1DOM = defineComponent({
  setup() {
    const router = useRouter();
    const { delay } = useDelay();

    async function goToGrafikView() {
      bottomNavbarVisible.value = false;
      showSpinner();
      await delay(1);
      router.push("/monitor/kumbung1");
    }

    return () => (
      <>
        <div
          class={"relative bg-white shadow-card1 rounded-md flex flex-col z-0"}
        >
          <div class="relative">
            <img
              src={String(imageUrl.value)}
              class={"rounded-t-md object-cover w-full h-44 z-0"}
            />
            {!imageUrl.value && (
              <div class="text-sm absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center text-gray-500">
                <p class={"text-xs"}>
                  Foto kosong. Silahkan ambil foto kumbung jamur.
                </p>
              </div>
            )}
          </div>
          <div class="absolute top-2 left-0 right-0 px-2 flex justify-between items-center ">
            <div
              class={
                " bg-black-overlay rounded-3xl justify-center items-center border-0.5 border-white "
              }
            >
              <p class={"text-md text-white font-bold p-1 px-2 tracking-wider"}>
                Kumbung - 1
              </p>
            </div>
            <div
              class={`rounded-3xl justify-center items-center border-0.5 border-white bg-${
                isHovered.value ? "white" : "black-overlay"
              }`}
              onClick={() => takePicture()}
            >
              <img
                src={camIcon}
                class={"object-cover h-9 p-2 z-0"}
                style={{
                  filter: isHovered.value ? "invert(0)" : "invert()",
                }}
              />
            </div>
          </div>

          <div
            class={
              "flex flex-row bg-white shadow-card1 p-1 justify-between z-10 px-7"
            }
          >
            <div class={styleKolomDataKimat}>
              <p class={styleJudulDataKlimat}>Kelembaban</p>
              <p class={styleValueDataKlimat}>{sensor1Humidity.value} %</p>
            </div>
            <div class={styleKolomDataKimat}>
              <p class={styleJudulDataKlimat}>Suhu</p>
              <p class={styleValueDataKlimat}>{sensor1Temperature.value} C</p>
            </div>
            <div class={styleKolomDataKimat}>
              <p class={styleJudulDataKlimat}>Sprinkler</p>
              <p class={styleValueDataKlimat}>ON</p>
            </div>
          </div>
          <div
            class={
              "flex flex-row bg-white shadow-md p-3 justify-between rounded-b-md z-0"
            }
          >
            <Button class={"tracking-tighter "}>
              <p onClick={() => goToGrafikView()} class={"w-full"}>
                Lihat Grafik Klimat
              </p>
            </Button>
          </div>
        </div>
      </>
    );
  },
});
