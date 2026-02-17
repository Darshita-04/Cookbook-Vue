<template>
  <button class="btn-primary" :type="type">
     <i>
      <slot name="icon"></slot>
    </i>
  </button>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps({
  type: {
    type: String,
    default: 'button', // default type will be button if not passed in props
  },
});
</script>

<style scoped>
.btn-primary {
  border: none;
  background-color: var(--vt-c-yellow);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-out;
}
.btn-primary:hover {
  background-color: var(--vt-c-yellow-hover);
}
.btn-primary:disabled {
  opacity: 0.5;
  cursor:not-allowed;
  pointer-events: none;
}
</style>
