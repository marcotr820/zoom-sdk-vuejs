import { createRouter, createWebHistory } from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";
import Meeting from "../components/Meeting.vue";

const router = createRouter({
  // Usa un string vacío '' o '/' para indicar que la app corre en la raíz
  history: createWebHistory(import.meta.env.BASE_URL), 
  routes: [
    {
      path: '/',
      name: 'home',
      component: HelloWorld
    },
    {
      path: '/meeting/:id',
      name: 'meeting',
      component: Meeting
    }
  ]
})

export default router;