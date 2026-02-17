
<template>
  <main>

    <!-- Recipe Search -->
    <Transition name="fade">
      <section class="hero" v-if="!hasSearched">
        <ContainerLayout>
          <template #children>
            <h1>Discover New Recipes</h1>
            <p>Explore global cuisines and uncover the nutritional profile of every ingredient.</p>
            <RecipeSearch @search="onSearch" v-model="searchQuery" />
          </template>
        </ContainerLayout>
      </section>
    </Transition>

    <!-- recipe listing  -->
    <Transition name="fade">
      <section class="recipes" v-if="hasSearched">
        <div v-if="error" class="error-message">{{error}}</div>
        <PageLoader v-else-if="loading"  />
        <ContainerLayout v-else>
          <template #children>
            <div class="grid" >
              <aside>
                <div>
                  <RecipeSearch @search="onSearch" v-model="searchQuery" class="secondary-search"/>
                  <!-- Filters -->
                  <div class="filters">
                    <RecipeFilter
                      v-for="cuisine in cuisines"
                      :key="cuisine.label"
                      :label="cuisine.label"
                      v-model="cuisine.checked"
                      @update:modelValue="onFilterChange"
                    />
                  </div>
                </div>
              </aside>
              <main>
                  <!-- RecipeList -->
                  <RecipeList :recipes="recipes" />
                  <div v-if="recipes.length === 0 && !loading" class="no-results">
                    No results found for "{{ searchQuery }}"
                  </div>
                  <!-- Pagination -->
                  <PaginationControl
                  v-if="totalResults > recipesPerPage"
                    :currentPage="currentPage"
                    :totalPages="Math.ceil(totalResults / recipesPerPage)"
                    @changePage="page => {
                      currentPage = page
                      fetchRecipes()
                    }"
                  />
              </main>
            </div>
          </template>
        </ContainerLayout>
      </section>
    </Transition>



  </main>
</template>


<script setup>
import RecipeSearch from '@/components/RecipeSearch.vue';
import RecipeList from '@/components/RecipeList.vue';
import RecipeFilter from '@/components/RecipeFilter.vue';
import PaginationControl from '@/components/PaginationControl.vue';
import ContainerLayout from '@/components/ContainerLayout.vue';
import PageLoader from '@/components/PageLoader.vue';
import { ref, reactive } from 'vue';

const searchQuery = ref('');
const hasSearched = ref(false)
const recipes = ref([])
const cuisines = reactive([
  { label: 'italian', checked: false },
  { label: 'indian', checked: false },
  { label: 'mexican', checked: false },
  { label: 'chinese', checked: false },
  { label: 'thai', checked: false },
  { label: 'french', checked: false },
  { label: 'japanese', checked: false },
  { label: 'korean', checked: false },
  { label: 'greek', checked: false },
  { label: 'spanish', checked: false }
])
const currentPage = ref(1)
const totalResults = ref(0)
const loading = ref(false)
const error = ref(null)
const recipesPerPage = 5

// filtering from quisines
const activeCuisines = () => cuisines.filter(c => c.checked).map(c => c.label)

const API_KEY = import.meta.env.VITE_API_KEY2;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const fetchRecipes = async () => {
  if (!searchQuery.value) return

  loading.value = true;
  error.value = null;
  try {
    const offset = (currentPage.value - 1) * recipesPerPage
    const params = new URLSearchParams({
      apiKey: API_KEY,
      query: searchQuery.value,
      cuisine: activeCuisines().join(','),
      offset: offset.toString(),
      number: recipesPerPage.toString(),
      addRecipeInformation: 'true'
    })
    const res = await fetch(`${BASE_URL}?${params}`)
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
    recipes.value = data.results || []
    totalResults.value = data.totalResults
  } catch (err) {
    console.error('Failed to fetch recipes', err)
    error.value = "Failed to fetch recipes";
  } finally {
    loading.value = false
  }
}

// call when form is submitted
const onSearch = async (query) => {
  if (!query) return;
  searchQuery.value = query
  hasSearched.value = true;
  await fetchRecipes()
}

// auto-refetch when filters change
const onFilterChange = () => {
  if(!searchQuery.value) return;
  fetchRecipes()
}

</script>


<style scoped>
.hero {
  padding: 100px 0;
  background: linear-gradient(rgb(255 255 255 / 40%), rgb(160 160 160 / 20%)), url(/img/hero.jpg) no-repeat;
  text-align: center;
  color: var(--vt-c-black);
  height:100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;
}
h1 {
  font-size: 5rem;
  font-weight:800;
  margin-bottom:30px
}
p{
  font-size: 24px;
  margin-bottom:40px
}
.fade-enter-active {
  transition: all 0.3s ease-out;
}
.fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.recipes {
  background: var(--vt-c-white);
  border-radius: 20px;
  padding: 30px;
  overflow: auto;
  height: 100vh;
}
.recipes::-webkit-scrollbar {
  width: 0;
  display: none;
}
aside {
  background: #fff;
  z-index: 999;
  padding: 0 0 20px;
}
aside > div {
  position: sticky;
  top: 0;
}
.grid {
  display: grid;
  grid-template-columns: minmax(290px, 350px) 2fr;
  gap: 30px;
}
.filters {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 10px;
}
.error-message {
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:20px;
  height: 100vh;
}
@media(max-width:1199px) {
  h1 {
    font-size: 3.5rem;
  }
  p{
    font-size: 20px;
    margin-bottom: 30px;
  }
  .grid {
    display: block;
  }
  .recipes {
    padding: 0 20px 40px;
  }
  aside {
    padding: 40px 0 20px;
  }
}
@media(max-width:576px) {
  h1 {
    font-size: 2.5rem;
  }
  p{
    font-size: 20px;
    margin-bottom: 30px;
  }
  .recipes {
      padding: 0 0 40px;
      inset: 0;
  }
  aside {
    padding: 30px 0 20px;
  }
}
</style>
