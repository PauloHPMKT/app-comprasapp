<script setup lang="ts">
import { reactive, ref } from 'vue';
import { Icon } from '@iconify/vue';
import Input from './Input.vue';
import MainButton from './MainButton.vue';
import Overlay from './Overlay.vue';
import EmojiPicker from 'vue3-emoji-picker'
import '/node_modules/vue3-emoji-picker/dist/style.css';
import chooseCategory from '../assets/img/choose-category.png';

interface CategoryProps {
  name: string;
  icon: string;
}

const emit = defineEmits(['create-category']);

const showEmojiPicker = ref(false);
const showNewCategoryModal = ref(false);
const category = reactive<CategoryProps>({
  name: '',
  icon: ''
});

function onSelectEmoji(emoji: { i: string }) {
  category.icon = emoji.i;
  showEmojiPicker.value = false;
}

function isOpen() {
  showNewCategoryModal.value = true
}

function createCategory() {
  emit('create-category', {
    name: category.name,
    icon: category.icon
  });
  showNewCategoryModal.value = false;
  category.name = '';
  category.icon = '';
}

defineExpose({
  isOpen
})
</script>

<template>
  <Overlay v-if="showNewCategoryModal">
    <div class="bg-white rounded-lg shadow-md w-[90%] sm:w-[450px] text-center relative p-4">
      <Icon
        icon="material-symbols-light:close-small-rounded"
        @click="showNewCategoryModal = false"
        class="absolute top-0 right-0 cursor-pointer w-11 h-11"
      />
      <div class="flex flex-col items-center justify-center my-6">
        <h3 class="text-[#121212] text-2xl font-bold">Nova categoria</h3>
        <p class="text-[12px] text-gray-400">
          Crie categorias para seus produtos.<br />
          Basta adicionar um nome e escolher um emoji para representá-la.
        </p>
        <img :src="chooseCategory" alt="Emojis de categorias" class="mt-4" />
      </div>
      <div class="justify-center items-center gap-2">
        <div class="flex flex-col justify-center items-center gap-2 mb-4 w-full">
          <div class="flex items-center gap-2 w-full">
            <Input
              placeholder="Nome da categoria"
              v-model="category.name"
              class="border-2 relative border-gray-300 bg-white rounded-lg pl-2 pr-4 h-11 w-[90%]"
            />
            <div
              @click="showEmojiPicker = !showEmojiPicker"
              class="flex items-center justify-center w-12 h-11 border-2 border-gray-300 rounded-lg bg-white cursor-pointer"
            >
              {{ category.icon || "😀" }}
            </div>
          </div>
          <MainButton
            @click="createCategory"
            class="bg-red-600 w-full text-white font-normal rounded-lg h-11 flex items-center justify-center px-4"
          >
            Criar
          </MainButton>
        </div>
        <EmojiPicker
          v-if="showEmojiPicker"
          :native="true"
          @select="onSelectEmoji"
          class="absolute z-10 top-16 left-0 w-[350px] bg-white rounded-2xl shadow-lg"
        />
      </div>
    </div>
  </Overlay>
</template>
