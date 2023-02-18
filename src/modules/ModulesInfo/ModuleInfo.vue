<script setup lang="ts">
import { Block, Button, Card, Page } from "konsta/vue";
import { ref, onMounted } from "vue";
const myDiv = ref();
onMounted(() => {
  // set the main card height to fill the screen when the content inside can't
  if (myDiv.value.offsetHeight < window.innerHeight * 0.9) {
    myDiv.value.style.height = "90vh";
  }
});
</script>

<template>
  <div class="h-fit flex flex-col justify-between" ref="myDiv">
    <Card class="flex-1 pb-16 shadow-card2">
      <div class="max-w-screen-md mx-auto">
        <h1 class="font-bold text-3xl text-md-light-primary">Info</h1>
        <Block
          class="bg-white shadow-card1 rounded-xl h-40 p-2 active:opacity-90 active:scale-98 transition duration-50 ease-in-out"
        >
          <p>link github buat source code aplikasi + source code raspi</p>
        </Block>
      </div>
    </Card>
  </div>
</template>
