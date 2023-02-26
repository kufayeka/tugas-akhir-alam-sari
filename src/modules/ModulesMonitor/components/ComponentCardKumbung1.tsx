import { defineComponent, ref } from "vue";
import { Button, Block, Page, Card, Preloader } from "konsta/vue";

import imgBg from "../assets/image.png";
import {
  styleKolomDataKimat,
  styleJudulDataKlimat,
  styleValueDataKlimat,
} from "@/composables/tailwind-component-styles";

import { useRouter } from "vue-router";
import { showSpinner } from "@/composables/capacitorjs-native-spinner";
import useDelay from "@/composables/use-delay";
import { bottomNavbarVisible } from "@/composables/app-navigation-event-bus";

export const componentCardKumbung1Methods = {};

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
        <div class={"bg-white shadow-card1 rounded-md flex flex-col z-0"}>
          <img
            src={imgBg}
            class={"rounded-t-md object-cover w-full h-36 z-0"}
          />
          <div
            class={
              "absolute z-10 bg-black-overlay rounded-3xl justify-center items-center ml-2 mt-2 border border-white "
            }
          >
            <p class={"text-md text-white font-bold p-1 px-2 tracking-wider"}>
              Kumbung - 1
            </p>
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
