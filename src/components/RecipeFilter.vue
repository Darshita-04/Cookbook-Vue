<template>
  <div>
    <input :id="label" type="checkbox" :checked="modelValue" @change="$emit('update:modelValue', $event.target.checked)" />
    <label :for="label" class="filter-checkbox">{{ label }}</label>
  </div>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  modelValue: { type: Boolean, default: false }
})
defineEmits(['update:modelValue']);
</script>

<style scoped>
.filter-checkbox {
  padding: 6px 10px;
  text-align: center;
  font-size: 0.9rem;
  cursor: pointer;
  border: 1px solid var(--vt-c-white-mute);
  border-radius: 20px;
  display: inline-block;
  color: var(--vt-c-black);
  text-transform: capitalize;
  font-weight: 500;
  transition: all 0.3s ease-in
}
.filter-checkbox:hover,
.filter-checkbox:focus-within,
input[type="checkbox"]:checked + label {
  background-color: var(--vt-c-yellow);
  border-color: var(--vt-c-yellow);
  outline: none;
}
input[type="checkbox"]:focus + label {
    outline: 2px solid var(--vt-c-black-mute);
}
input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
</style>
