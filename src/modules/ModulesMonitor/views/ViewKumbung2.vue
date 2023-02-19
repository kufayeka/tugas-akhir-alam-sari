<script setup lang="ts">
import { hideSpinner } from "@/composables/capacitorjs-native-spinner";
import {
  setLandscape,
  setPortrait,
} from "@/composables/capacitorjs-screen-controller";
import useDelay from "@/composables/use-delay";
import { viewComponentLoadingScreenMethods } from "@/views/ViewComponentLoadingScreen";
import { Card, Block, Button, Page } from "konsta/vue";
import { onBeforeMount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

function goBackToMonitor() {
  router.push("/monitor/main");
  setPortrait();
}

const isLoading = ref(false);

onBeforeMount(() => {});

const { delay } = useDelay();
const x = ref();

const pageStyle = ref({
  opacity: "0",
  transition: "opacity 0.5s ease-in-out",
});

onMounted(async () => {
  await delay(0.5);
  await setLandscape().then(async (s) => {
    x.value = s.result;
    if (s.result == "success") {
      await delay(1);
      pageStyle.value.opacity = "1";
      await hideSpinner();
    }
  });
});
</script>

<template>
  <Page class="pb-16" :style="pageStyle">
    <p>Kumbung 2</p>
    <Button @click="goBackToMonitor()">Back</Button>
  </Page>
</template>
