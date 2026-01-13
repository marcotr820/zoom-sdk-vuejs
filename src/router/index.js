import { createRouter, createWebHistory } from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";
import Meeting from "../components/Meeting.vue";
import PruebaCard1 from "../components/PruebaCard1.vue";
import Prueba2 from "../components/Prueba2.vue";

const router = createRouter({
  // Usa un string vacío '' o '/' para indicar que la app corre en la raíz
  history: createWebHistory(), 
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
    },
    {
      path: '/prueba1',
      name: 'prueba1',
      component: PruebaCard1
    },
    {
      path: '/prueba2',
      name: 'prueba2',
      component: Prueba2
    }
  ]
})

export default router;