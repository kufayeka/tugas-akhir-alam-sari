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
    <p
      class="font-bold text-md text-md-light-primary ml-3 mt-3 tracking-tighter"
    >
      Parameter Kontrol PID
    </p>

    <table class="w-full mt-3">
      <tbody>
        <tr>
          <td
            class="text-right font-semibold text-md text-black pr-4 tracking-tighter opacity-70"
          >
            Proporsional:
          </td>
          <td class="flex justify-center">
            <ComponentReuseableInputField v-model="inputValue" class="w-24" />
          </td>
        </tr>
        <tr>
          <td
            class="text-right font-semibold text-md text-black pr-4 tracking-tighter opacity-70"
          >
            Integral:
          </td>
          <td class="flex justify-center">
            <ComponentReuseableInputField v-model="inputValue" class="w-24" />
          </td>
        </tr>
        <tr>
          <td
            class="text-right font-semibold text-md text-black pr-4 tracking-tighter opacity-70"
          >
            Derivatif:
          </td>
          <td class="flex justify-center">
            <ComponentReuseableInputField v-model="inputValue" class="w-24" />
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
