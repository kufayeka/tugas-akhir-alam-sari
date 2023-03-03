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
          <img
            src={String(imageUrl.value)}
            class={"rounded-t-md object-cover w-full h-44 z-0"}
          />
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
