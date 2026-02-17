<template>
  <form @submit.prevent="onSearch" class="search-form">
    <input
      type="text" name="search"
      v-model.lazy="model"
      placeholder="What are you looking for?"
    />
    <BaseButton type="submit">
      <template #icon>
        <IconSearch />
      </template>
    </BaseButton>
  </form>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import BaseButton from './BaseButton.vue'
import IconSearch from './icons/IconSearch.vue'

const model = defineModel()
const emit = defineEmits(['search'])

// Emits the search query when the user submits the form
const onSearch = () => {
  if (model.value) {
    emit('search', model.value.trim())
  }
}
</script>

<style scoped>
.search-form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding: 10px;
  background: var(--vt-c-white-mute);
  border-radius: 100px;
  overflow: hidden;
}
.search-form input {
  flex: 1;
  border-radius: 6px;
  border: none;
  outline: none;
  height: 75px;
  font-size: 1.5rem;
  padding: .5rem 2rem;
  background: transparent;
  font-family: "SN Pro", sans-serif;
  width: 100%;
  border-radius: 75px;
}
.search-form button {
  width: 75px;
  height: auto;
}
.secondary-search.search-form input {
  height: 45px;
  font-size: 1.25rem;
  padding: .5rem 1rem;
}
.secondary-search.search-form button {
  width: 45px;
}
@media(max-width:576px) {
  .search-form input {
    height:45px;
    font-size: 1.25rem;
    padding: .5rem 1rem;
  }
  .search-form button {
    width: 45px;
  }
}
</style>
