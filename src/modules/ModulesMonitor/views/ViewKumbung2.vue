<script setup lang="ts">
import { Card, Block, Button, Page } from "konsta/vue";
import { useRouter } from "vue-router";
import { appNavigationEventBus } from "@/composables/app-navigation-event-bus";
import { onMounted } from "vue";
import { viewComponentLoadingScreenMethods } from "@/views/ViewComponentLoadingScreen";
import { hideSpinner } from "@/composables/capacitorjs-native-spinner";
const router = useRouter();

function goBackToMonitor() {
  router.push("/monitor/main");
}

onMounted(() => {
  hideSpinner();
});
</script>

<template>
  <div>Kumbung 2</div>
  <Button @click="goBackToMonitor()">Back</Button>
</template>
