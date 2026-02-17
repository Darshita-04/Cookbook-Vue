<template>
  <!-- recipe details -->
  <Transition name="fade">
    <div>
      <div v-if="error" class="error-message">{{error}}</div>
        <section v-if="recipe" class="recipe-detail-page">
          <div class="recipe-image">
            <img :src="recipe.image" alt="">
            <BaseButton class="btn-back" @click="router.back();">
              <template #icon>
                <IconArrow />
              </template>
            </BaseButton>
          </div>
          <div class="recipe-details">
            <h1>{{ recipe.title }}</h1>
            <p class="health-info">
              <span v-if="recipe.vegan"><img src="/img/vegan.png" alt="">Vegan</span>
              <span v-if="recipe.vegetarian"><img src="/img/vegetarian.png" alt="">Vegetarian</span>
              <span v-if="recipe.glutenFree"><img src="/img/nogluten.png" alt="">Gluten Freen</span>
              <span v-if="recipe.dairyFree"><img src="/img/nodairy.png" alt="">Dairy Free</span>
              <span v-if="recipe.veryHealthy"><img src="/img/healthy.png" alt="">Very healthy</span>
            </p>
            <section class="meta-info">
              <span>Ready in {{ recipe.readyInMinutes }} mins </span>
            </section>
            <section class="ingredients">
              <div class="heading">
                <h2>Ingredients</h2>
                <span>Servings: {{ recipe.servings }}</span>
              </div>
              <ul>
                <li v-for="ing in recipe.extendedIngredients" :key="ing.id">
                  {{ ing.name }} <span>{{ ing.amount }} {{ ing.unit }}</span>
                </li>
              </ul>
            </section>
            <section class="instructions">
              <h2>Instructions</h2>
              <div v-html="recipe.instructions"></div>
              <ol>
                  <li v-for="step in recipe.analyzedInstructions[0]?.steps" :key=step.number>{{ step.step }}</li>
              </ol>
            </section>
          </div>
        </section>
        <PageLoader v-else-if="loading" />
      </div>
  </Transition>
</template>

<script setup>
import BaseButton from '@/components/BaseButton.vue';
import IconArrow from '@/components/icons/IconArrow.vue';
import PageLoader from '@/components/PageLoader.vue';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';


const router = useRouter();
const route = useRoute();
const recipe = ref(null);
const loading = ref(true);
const error = ref(null)

const API_KEY = import.meta.env.VITE_API_KEY2;

onMounted(async () => {
  // get id from URL
  const recipeId = route.params.id;
    try {
    error.value = null;
    const params = new URLSearchParams({
      apiKey: API_KEY,
      includeNutrition: true
    })
    const res = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?${params}`)
    if (!res.ok) {
      if (res.status === 402) {
        error.value = "API limit reached for today. Please try again tomorrow or upgrade your plan.";
      } else if (res.status === 401) {
        error.value = "Invalid API Key.";
      } else {
        error.value = `Server error: ${res.status}`;
      }
      return;
    }
    const data = await res.json()
    recipe.value = data;
    console.log(recipe.value)
  } catch (err) {
    console.error('Failed to fetch recipes', err)
    error.value = "Failed to fetch recipes";
  } finally {
    loading.value = false;
  }
});
</script>


<style scoped>
.recipe-detail-page {
  display: flex;
  min-height: 100vh;
  font-size: 20px;
  line-height: 30px;
}
.recipe-image {
  width: 40%;
  height: 100vh;
  position: sticky;
  top: 0;
}
.recipe-image img{
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.recipe-details{
  width:60%;
  padding: 50px;
}
h1{
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1;
}
.ingredients {
  border: 1px solid var(--vt-c-black-mute);
  border-radius: 20px;
  margin: 10px 0 20px;
}
.heading {
  padding: 20px;
  border-bottom: 1px solid var(--vt-c-black-mute);
  display: flex;
  justify-content: space-between;
}
h2 {
  font-weight: 700;
  font-size: 24px;
}
.ingredients li {
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  font-weight: 700;
}
.ingredients li:not(:last-child) {
  border-bottom: 1px solid var(--vt-c-text-dark-2);
}
.ingredients ul {
  list-style: none;
  padding: 0;
}
.instructions :deep(ol) {
  margin-top: 10px;
  padding-left: 20px;
}
.instructions :deep(li){
  margin-bottom: 10px;
}
.health-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 20px 0;
  flex-wrap: wrap;
}
.health-info span {
  display: flex;
  align-items: center;
  gap: 6px;
}
.health-info img{
  width:24px
}
.btn-back {
  position: absolute;
  left:30px;
  top:30px;
}
.btn-back svg {
  transform: rotate(180deg);
}
.error-message {
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:20px;
  height: 100vh;
}
@media(max-width:1199px) {
  .recipe-detail-page {
    flex-direction: column;
    font-size: 18px;
    line-height: 26px;
  }
  .recipe-image{
    width: auto;
    height: auto;
    position: relative;
  }
  .recipe-image img {
    height: auto;
  }
  .recipe-details {
    width: 100%;
    padding: 40px 20px;
  }
  h1 {
    font-size: 2.5rem;
  }
  .btn-back{
    left: 20px;
    top: 20px;
  }
}
</style>
