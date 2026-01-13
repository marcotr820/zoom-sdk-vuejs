<script setup>
import { ZoomMtg } from '@zoom/meetingsdk';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

var authEndpoint = import.meta.env.VITE_API_URL
var meetingNumber = '5281246458'
var passWord = 'vJlRNkJ09kb4D6nEbsDmpX2FkyyEGc.1'
var role = 1
var userName = 'Vue.js'
var userEmail = ''
var registrantToken = ''
var zakToken = ''
var leaveUrl = 'http://localhost:5173/'

function getSignature() {
  fetch(authEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      meetingNumber: meetingNumber,
      role: role,
      videoWebRtcMode: 1,
    })
  }).then((response) => {
    return response.json()
  }).then((data) => {
    console.log(data)
    startMeeting(data.signature)
  }).catch((error) => {
    console.log(error)
  })
}

function startMeeting(signature) {
  document.getElementById('zmmtg-root').style.display = 'block';

  // Forzar la carga del idioma antes del init
  ZoomMtg.i18n.load('es-ES');

  ZoomMtg.init({
    leaveUrl: 'http://localhost:5173/',
    patchJsMedia: true,
    leaveOnPageUnload: true,
    success: (success) => {
      console.log(success);
      ZoomMtg.join({
        signature: signature,
        meetingNumber: meetingNumber,
        passWord: passWord,
        userName: userName,
        userEmail: userEmail,
        tk: registrantToken,
        zak: zakToken,
        success: (success) => {
          console.log(success);
        },
        error: (error) => {
          console.log(error);
        }
      });
    },
    error: (error) => {
      console.log(error);
    }
  });
}

const router = useRouter();

const abrirReunion = (idReunion) => {
  // 1. Resolvemos la ruta para obtener la URL completa (href)
  // 'Meeting' es el nombre que le diste a la ruta en tu archivo index.js del router
  const routeData = router.resolve({ 
    name: 'meeting', 
    params: { id: idReunion } 
  });

  // 2. Abrimos la URL en una pestaña nueva (_blank)
  window.open(routeData.href, '_blank');
};

const activeMeetingIds = ref([
  // `${import.meta.env.VITE_CLIENT_URL}/meeting/6607020734`,
]);

// Lista de reuniones disponibles en la tabla
const meetings = ref([
  { id: 6607020734, name: 'Audiencia Sincronización Técnica' },
  { id: 5281246458, name: 'Sala Revisión de Diseño' },
]);

const openMeeting = (id) => {
  if (!activeMeetingIds.value.includes(id)) {
    activeMeetingIds.value.push(id);
  }
};

const getMeetingUrl = (id) => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/meeting/${id}`;
};

const closeMeeting = (id) => {
  // 1. Buscar el elemento en el DOM
  const iframe = document.querySelector(`iframe[src*="${id}"]`) /*as HTMLIFrameElement*/;

  if (iframe) {
    // 2. Obligar al navegador a abandonar la URL de Zoom
    iframe.src = "about:blank";
  }

  // 3. Pequeño delay para que el navegador procese la salida antes de quitar el componente
  setTimeout(() => {
    activeMeetingIds.value = activeMeetingIds.value.filter(mId => mId !== id);
  }, 200);

  // activeMeetingIds.value = activeMeetingIds.value.filter(mId => mId !== id);
};

</script>

<template>
  <span>Zoom Meeting SDK Vue.js Sample</span>

  <button @click='getSignature'>Join Meeting</button>

  <button @click="abrirReunion(6607020734)">mia</button>

  <button @click="abrirReunion(5281246458)">camargo</button>

  <hr>

    <section>
      <!-- <h2>Mis Reuniones</h2> -->
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="meeting in meetings" :key="meeting.id">
            <td>{{ meeting.id }}</td>
            <td>{{ meeting.name }}</td>
            <td>
              <button @click="openMeeting(meeting.id)">Ver en Iframe</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

  <hr />

  <div class="grid-container">
    <div v-for="id in activeMeetingIds" :key="id" class="grid-item">
      <div class="card-header">
        <span class="meeting-title">Tittle</span>
        <span class="status-badge">READY</span>
      </div>
      <div class="card-body">
        <iframe 
          :src="getMeetingUrl(id)"
          width="100%"
          height="100%"
        ></iframe>
      </div>
      <div class="card-footer">
          <button class="icon-btn">🎤</button>
          <button class="main-btn"></button>
          <button class="icon-btn">❌</button>
      </div>
    </div>
  </div>

  <!-- <section class="iframe-grid">
    <div v-for="id in activeMeetingIds" :key="id" :id="id" class="iframe-container">
      <div class="iframe-header">
        <span>Reunión #{{ id }}</span>
        <button @click="closeMeeting(id)">Cerrar</button>
      </div>
      <iframe
        :src="getMeetingUrl(id)"
        frameborder="0"
        width="100%"
        height="400px"
      ></iframe>
    </div>
  </section> -->

</template>

<style scoped>
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
