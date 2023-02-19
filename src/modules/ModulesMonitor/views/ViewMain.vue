<script setup lang="ts">
import { showSpinner } from "@/composables/capacitorjs-native-spinner";
import { viewComponentLoadingScreenMethods } from "@/views/ViewComponentLoadingScreen";
import { Card, Block, Button, Page } from "konsta/vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { componentCardKumbung1DOM } from "../components/ComponentCardKumbung1";
import { componentCardKumbung2DOM } from "../components/ComponentCardKumbung2";

const router = useRouter();

async function goToKumbung1() {
  showSpinner();
  router.push("/monitor/kumbung1");
}

async function goToKumbung2() {
  showSpinner();
  router.push("/monitor/kumbung2");
}

const myDiv = ref();
onMounted(() => {
  // set the main card height to fill the screen when the content inside can't
  if (myDiv.value.offsetHeight < window.innerHeight * 0.9) {
    myDiv.value.style.height = "1000px";
  }
});
</script>

<template>
  <div class="h-fit flex flex-col justify-between" ref="myDiv">
    <Card class="flex-1 pb-32 shadow-card2">
      <div class="max-w-screen-md mx-auto">
        <h1 class="font-bold text-3xl text-md-light-primary">Monitor</h1>
        <p class="text-justify text-md tracking-tighter opacity-70">
          Halaman ini menampilkan data terkini dari setiap kumbung jamur. Klik
          salah satu kumbung jamur di bawah untuk mulai memonitor.
        </p>
        <div v-for="i in 1" class="space-y-5 mt-7">
          <componentCardKumbung1DOM />
          <componentCardKumbung2DOM />
        </div>
      </div>
    </Card>
  </div>
</template>
