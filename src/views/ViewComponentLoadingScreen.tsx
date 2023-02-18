import { defineComponent, ref } from "vue";
import { Button, Block, Page, Card, Preloader } from "konsta/vue";
import useDelay from "@/composables/use-delay";
import {
  hideSpinner,
  showSpinner,
} from "@/composables/capacitorjs-native-spinner";

const { delay } = useDelay();

export const showLoadingScreen = ref(false);

export const viewComponentLoadingScreenMethods = {
  async hide() {
    // await delay(0.1);
    // showLoadingScreen.value = false;
    hideSpinner();
  },

  show() {
    // showLoadingScreen.value = true;
    showSpinner();
  },
};

export const viewComponentLoadingScreenDOM = defineComponent({
  setup() {
    return () => (
      <>
        {showLoadingScreen.value ? (
          <Page class={"z-10 flex items-center justify-center"}>
            <Preloader />
          </Page>
        ) : null}
      </>
    );
  },
});
