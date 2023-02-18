<script setup lang="ts">
import { hideSpinner } from "@/composables/capacitorjs-native-spinner";
import { viewComponentLoadingScreenMethods } from "@/views/ViewComponentLoadingScreen";
import { Card, Block, Button, Page } from "konsta/vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

function goBackToMonitor() {
  router.push("/monitor/main");
}

const isLoading = ref(false);

onMounted(() => {
  hideSpinner();
});
</script>

<template>
  <Page class="pb-16">
    <Button @click="goBackToMonitor()">Back</Button>
  </Page>
</template>
