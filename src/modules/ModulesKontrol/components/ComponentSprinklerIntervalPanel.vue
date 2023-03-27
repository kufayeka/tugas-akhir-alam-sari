<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import ComponentReuseableInputField from "./ComponentReuseableInputField.vue";
import ComponentReuseableGreenButton from "./ComponentReusableGreenButton.vue";

const inputValue = ref("");

// Define code to run when the component is mounted using the "onMounted" function
onMounted(() => {});
</script>

<template>
  <div class="relative bg-white shadow-card2 rounded-md flex flex-col z-0">
    <p class="font-bold text-md text-md-light-primary ml-3 mt-3">
      Selang Waktu ON & OFF Maksimal Sprinkler
    </p>

    <table class="w-full mt-3">
      <tbody>
        <tr>
          <td class="text-right font-semibold text-md text-black pr-4">ON:</td>
          <td class="flex justify-center">
            <ComponentReuseableInputField v-model="inputValue" class="w-24" />
          </td>
          <td class="text-right font-semibold text-md text-black pr-4">
            Menit
          </td>
        </tr>
        <tr>
          <td class="text-right font-semibold text-md text-black pr-4">OFF:</td>
          <td class="flex justify-center">
            <ComponentReuseableInputField v-model="inputValue" class="w-24" />
          </td>
          <td class="text-right font-semibold text-md text-black pr-4">
            Menit
          </td>
        </tr>
      </tbody>
    </table>

    <p>Value: {{ inputValue }}</p>
    <div class="flex flex-row justify-center py-3">
      <ComponentReuseableGreenButton class="w-36" button-text="Simpan" />
    </div>
  </div>
</template>
