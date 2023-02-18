<script setup lang="tsx">
import { Card, Block, Button, Page } from "konsta/vue";
import { appNavigationEventBus } from "@/composables/app-navigation-event-bus";
</script>

<template>
  <Page class="pb-20 z-0">
    <RouterView />
  </Page>
</template>

<style scoped></style>
