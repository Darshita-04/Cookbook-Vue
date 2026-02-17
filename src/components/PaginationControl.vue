<template>
  <div class="pagination">
    <!-- <button >Prev</button> -->
    <BaseButton type="button" class="btn-prev" @click="prevPage" :disabled="currentPage === 1">
      <template #icon>
        <IconArrowRight />
      </template>
    </BaseButton>

    <span>Page {{ currentPage }} / {{ totalPages }}</span>

    <BaseButton type="button" @click="nextPage" :disabled="currentPage >= totalPages">
      <template #icon>
        <IconArrowRight />
      </template>
    </BaseButton>
  </div>
</template>

<script setup>
import BaseButton from './BaseButton.vue';
import IconArrowRight from './icons/IconArrowRight.vue';


const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true }
})

const emit = defineEmits(['changePage'])

const prevPage = () => emit('changePage', props.currentPage - 1)
const nextPage = () => emit('changePage', props.currentPage + 1)
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  gap: 20px;
  color: var(--vt-c-black);
}
.btn-prev {
  transform: rotate(180deg);
}
</style>
