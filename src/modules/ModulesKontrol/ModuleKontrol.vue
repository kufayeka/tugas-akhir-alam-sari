<script setup lang="ts">
import { Card, Block, Button, Page } from "konsta/vue";
import { appNavigationEventBus } from "@/composables/app-navigation-event-bus";
import { onBeforeMount, onMounted } from "vue";
import ViewMain from "./views/ViewMain.vue";
</script>

<template>
  <Page class="pb-20 z-0">
    <ViewMain />
  </Page>
</template>

<style></style>

<style scoped></style>
