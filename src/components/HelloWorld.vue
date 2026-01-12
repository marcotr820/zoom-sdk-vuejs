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
    <iframe v-for="id in activeMeetingIds" :key="id"
      class="grid-item"
      :src="getMeetingUrl(id)"
      frameborder="0"
      width="100%"
      height="50%"
    ></iframe>
  </div>

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
  scale: 0.75;
  border: 5px;
}


</style>
