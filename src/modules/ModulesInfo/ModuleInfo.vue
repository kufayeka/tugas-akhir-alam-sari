<script setup lang="ts">
import { Block, Button, Card, Page } from "konsta/vue";
import { ref, onMounted } from "vue";

import {
  styleKolomDataKimat,
  styleJudulDataKlimat,
  styleValueDataKlimat,
  styleTitleLgMedium,
  styleTextRegular,
} from "@/composables/tailwind-component-styles";

const myDiv = ref();
onMounted(() => {
  // set the main card height to fill the screen when the content inside can't
  if (myDiv.value.offsetHeight < window.innerHeight * 0.9) {
    myDiv.value.style.height = "90vh";
  }
});
</script>

<template>
  <Page class="pb-20 z-0">
    <div class="h-fit flex flex-row justify-center" ref="myDiv">
      <div class="max-w-screen-md mx-8 mt-8">
        <h1 class="font-bold text-3xl text-md-light-primary">Info</h1>
        <div class="flex-1 pb-32">
          <div class="flex justify-center items-center my-5">
            <p :class="styleTitleLgMedium">Parameter Kontrol PID</p>
          </div>

          <p :class="styleTextRegular" class="text-justify py-2">
            Proporsional(P): Parameter proporsional (P) akan mengatur respons
            sistem terhadap selisih antara target dan nilai aktual kelembaban.
            Semakin besar nilai P, semakin responsif sistem terhadap perubahan
            kelembaban, sehingga sistem akan menyesuaikan output (selang waktu
            nyala pompa air sprinkler) lebih cepat.
          </p>
          <p :class="styleTextRegular" class="text-justify py-2">
            Integral(I): Parameter integral (I) akan mengakumulasi selisih
            antara target dan nilai aktual kelembaban dalam suatu periode waktu
            tertentu. Semakin besar nilai I, semakin cepat sistem akan
            menyesuaikan output (interval nyala pompa air sprinkler) jika ada
            kesalahan dalam mempertahankan kelembaban.
          </p>
          <p :class="styleTextRegular" class="text-justify py-2">
            Derivatif(D): Parameter derivatif (D) akan mengukur seberapa cepat
            nilai kelembaban berubah. Semakin besar nilai D, semakin cepat
            sistem akan menyesuaikan output (selang waktu nyala pompa air
            sprinkler) jika nilai kelembaban berubah tiba-tiba. Namun, nilai P,
            I, D yang terlalu besar/kecil dapat menyebabkan kelembaban menjadi
            tidak stabil atau overcompensate (selang waktu nyala pompa air
            sprinkler terlalu sering atau terlalu lama).
          </p>
          <p :class="styleTextRegular" class="text-justify py-2">
            Namun, nilai P, I, D yang terlalu besar/kecil dapat menyebabkan
            kelembaban menjadi tidak stabil atau overcompensate (selang waktu
            nyala pompa air sprinkler terlalu sering atau terlalu lama).
          </p>
        </div>
      </div>
    </div>
  </Page>
</template>
