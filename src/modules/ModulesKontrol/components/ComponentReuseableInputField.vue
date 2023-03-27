<template>
  <div class="rounded-input">
    <input
      v-model="inputValue"
      type="number"
      :placeholder="props.placeholderText"
      class="rounded-input-field"
    />
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, ref, watch } from "vue";

interface Props {
  placeholderText: string;
  modelValue: string;
}

const props: Props = {
  placeholderText: "",
  modelValue: "",
};

const emit = defineEmits(["update:modelValue"]);

const inputValue = ref(props.modelValue);

watch(inputValue, (newValue) => {
  emit("update:modelValue", newValue);
});
</script>

<style scoped>
.rounded-input {
  border-radius: 20px;
  border: 0px solid gray;
  padding: 0px;
}

.rounded-input-field {
  border-radius: 20px;
  border: 1px solid black;
  outline: none;
  font-size: 16px;
  width: 100%;
  height: 30px;
  text-align: center;
  background-color: white;
  color: black;
  font-weight: bold;
}
</style>
