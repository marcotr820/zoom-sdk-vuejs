<template>
  <div class="grid-container">
    <div v-for="id in activeMeetingIds" :key="id" class="grid-item">
      <div class="card-header">
        <span class="meeting-title">Tittle</span>
        <span class="status-badge">READY</span>
      </div>
      <div class="card-body">
        <!-- <iframe 
          :src="getMeetingUrl(id)"
          width="100%"
          height="100%"
        ></iframe> -->
      </div>
      <div class="card-footer">
          <button class="icon-btn">🎤</button>
          <button class="main-btn"></button>
          <button class="icon-btn">❌</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activeMeetingIds = ref([
  { id: 6607020734, name: 'Audiencia Sincronización Técnica' },
  { id: 5281246458, name: 'Sala Revisión de Diseño' },
  { id: 528124645822, name: 'Sala Revisión de Diseño 2' },
  // { id: 528124645823, name: 'Sala Revisión de Diseño 3' },
  // { id: 528124645824, name: 'Sala Revisión de Diseño 4' },
]);
</script>
<style scoped>
/* footer#wc-footer {
    display: none;
}
.footer-theme-container {
  display: none;
} */
 .grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 por fila */
  /* gap: 10px; */
  width: 100%;
}

.grid-item {
  background-color: pink;
  width: 100%;
  height: 575px; /* ajusta según necesidad */
  scale: 0.7;
  border: 5px;
}
/**/
/* Cabecera Verde */
.card-header {
  background-color: #4a6741; /* Verde oliva de la imagen */
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
}
/* Área del Video / Iframe */
.card-body {
  flex-grow: 1;
  position: relative;
  background-color: #34495e;
  height: 100%;
}
/* Footer con Controles Circulares */
.card-footer {
  background-color: #444; /* Gris más oscuro */
  padding: 15px;
  display: flex;
  justify-content: space-around;
}

.card-footer > button {
 margin: 0;
}
</style>