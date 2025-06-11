import { DefineComponent } from 'vue';
import { component } from 'vue3-emoji-picker';

declare module 'vue3-emoji-picker' {
  const component: DefineComponent<{}, {}, any>;
}

export default component;
