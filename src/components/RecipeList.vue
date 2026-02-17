<template>
  <div class="recipe-list">
    <RecipeCard
      v-for="recipe in recipes"
      :key="recipe.id"
      :title="recipe.title"
      :description="recipe.summary"
      :image="recipe.image"
      :recipeId="recipe.id"
    />
  </div>
</template>

<script setup>
import RecipeCard from './RecipeCard.vue';
defineProps({
  recipes:{}
})
</script>

<style scoped>
.recipe-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}
@media(max-width:576px) {
  .recipe-list {
    grid-template-columns: 1fr;
  }
}
</style>

