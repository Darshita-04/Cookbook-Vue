<template>
  <div class="recipe-card">
    <RouterLink
      :to="{ name: 'RecipeDetail', params: { id: recipeId } }"
      class="recipe-link"
    >
    <div  class="recipe-image">
      <img v-if="image" :src="image" :alt="title"/>
      <BaseButton type="button">
        <template #icon>
          <IconArrow />
        </template>
      </BaseButton>
    </div>
    <h3 class="recipe-title">{{ title }}</h3>
  </RouterLink>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import BaseButton from './BaseButton.vue'
import IconArrow from './icons/IconArrow.vue'
defineProps({
  recipeId: { type:Number, required:true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  tags: { type: Array, default: () => [] }
})
</script>

<style scoped>
.recipe-link {
  text-decoration: none;
  display: block;
  background: transparent;
}
.recipe-image {
  position: relative;
  overflow: hidden;
  border-radius: 20px;
}
.recipe-image img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 20px;
  transition: all 0.3s linear;
}
.recipe-image:hover img {
  transform: scale(1.05);
}
.recipe-image button {
  opacity:0;
  transition: all 0.3s linear;
}
.recipe-image:hover button {
  opacity:1
}
.recipe-title {
  font-size: 24px;
  color: var(--vt-c-black);
  font-weight: 600;
  margin-top: 10px;
}
button {
  position: absolute;
  top: 30px;
  right: 30px;
}
@media(max-width:576px) {
  .recipe-image button {
    opacity: 1;
  }
  .recipe-title {
    font-size: 20px;
  }
}
</style>
