import { defineComponent, ref } from "vue";
import { Button, Block, Page, Card, Preloader } from "konsta/vue";

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

export const componentCardKumbung2Methods = {};

const imageSrc = ref();

const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 100,
    allowEditing: false,
    resultType: CameraResultType.Uri,
  });

  // image.webPath will contain a path that can be set as an image src.
  // You can access the original file using image.path, which can be
  // passed to the Filesystem API to read the raw data of the image,
  // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
  var imageUrl = image.webPath;

  console.log("pic dir:", imageUrl);

  // Can be set to the src of an image now
  imageSrc.value = imageUrl;
};

export const componentCardKumbung2DOM = defineComponent({
  setup() {
    const router = useRouter();
    const { delay } = useDelay();

    async function goToGrafikView() {
      bottomNavbarVisible.value = false;
      showSpinner();
      await delay(1);
      router.push("/monitor/kumbung2");
    }

    return () => (
      <>
        <div
          class={"relative bg-white shadow-card1 rounded-md flex flex-col z-0"}
        >
          <img
            src={imgBg}
            class={"rounded-t-md object-cover w-full h-44 z-0"}
          />
          <div class="absolute top-2 left-0 right-0 px-2 flex justify-between items-center ">
            <div
              class={
                " bg-black-overlay rounded-3xl justify-center items-center border-0.5 border-white "
              }
            >
              <p class={"text-md text-white font-bold p-1 px-2 tracking-wider"}>
                Kumbung - 2
              </p>
            </div>
            <div
              class={
                " bg-black-overlay rounded-3xl justify-center items-center border-0.5 border-white"
              }
              onClick={() => takePicture()}
            >
              <img
                src={camIcon}
                class={"object-cover h-9 p-2 z-0"}
                style={{ filter: "invert(1)" }}
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
              <p class={styleValueDataKlimat}>70 %</p>
            </div>
            <div class={styleKolomDataKimat}>
              <p class={styleJudulDataKlimat}>Suhu</p>
              <p class={styleValueDataKlimat}>25 C</p>
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
            <Button
              class={"tracking-tighter "}
              onClick={() => goToGrafikView()}
            >
              Lihat Grafik Klimat
            </Button>
          </div>
        </div>
      </>
    );
  },
});
