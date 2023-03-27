<template>
  <Button class="">
    <p class="tracking-tighter">{{ props.buttonText }}</p>
  </Button>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import { Button, Block, Page, Card, Preloader } from "konsta/vue";

const props = defineProps({
  buttonText: {
    type: String,
    required: true,
  },
});
</script>

<style scoped></style>
