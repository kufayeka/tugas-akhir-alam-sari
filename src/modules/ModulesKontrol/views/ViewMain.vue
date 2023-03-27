<script setup lang="ts">
import { Block, Button, Card, Page } from "konsta/vue";
import { ref, onMounted } from "vue";

import ComponentTargetKelembabanPanel from "../components/ComponentTargetKelembabanPanel.vue";
import ComponentDataRecordIntervalPanel from "../components/ComponentDataRecordIntervalPanel.vue";
import ComponentSprinklerIntervalPanel from "../components/ComponentSprinklerIntervalPanel.vue";
import ComponentPIDParameterPanel from "../components/ComponentPIDParameterPanel.vue";

const myDiv = ref();
onMounted(() => {
  // set the main card height to fill the screen when the content inside can't
  if (myDiv.value.offsetHeight < window.innerHeight * 0.9) {
    myDiv.value.style.height = "1000px";
  }
});
</script>

<template>
  <div class="h-fit flex flex-col justify-between">
    <Card class="flex-1 pb-32 shadow-card2">
      <div class="max-w-screen-md mx-auto pb-32">
        <h1 class="font-bold text-3xl text-md-light-primary">Kontrol</h1>
        <div class="space-y-3">
          <p class="text-justify text-md tracking-tighter opacity-80">
            Berikut adalah beberapa parameter pengaturan dari sistem kumbung
            jamur.
          </p>
          <p class="text-justify text-md tracking-tighter opacity-80">
            Untuk mengubah nilai parameter tertentu. Klik kotak yang berisi
            angka untuk mengubah nilai dan klik tombol "Simpan" untuk menyimpan
            nilai terbaru.
          </p>
        </div>
        <div class="space-y-5 mt-7 mx-3">
          <ComponentTargetKelembabanPanel />
          <ComponentDataRecordIntervalPanel />
          <ComponentSprinklerIntervalPanel />
          <ComponentPIDParameterPanel />
        </div>
      </div>
    </Card>
  </div>
</template>
