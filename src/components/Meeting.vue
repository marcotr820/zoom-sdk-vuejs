<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { ZoomMtg } from '@zoom/meetingsdk';

const route = useRoute();
const meetingNumber = route.params.id; // Captura el ID de la URL

// Configuración (Idealmente esto vendría de una API o config global)
const authEndpoint = import.meta.env.VITE_API_URL;
const role = 1; // Host
const userName = 'Usuario Vue';

onMounted(async () => {
  // 1. Indispensable: Preparar el terreno
  // ZoomMtg.setZoomJSLib('https://source.zoom.us/4.0.0/lib', '/av'); // Usa la versión que tengas en package.json
  ZoomMtg.preLoadWasm();
  ZoomMtg.prepareWebSDK();

  // 2. Cargar idioma
  ZoomMtg.i18n.load('es-ES');

  // 3. Obtener la firma automáticamente al cargar la pestaña
  await getSignature();
});

async function getSignature() {
  await fetch(authEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      meetingNumber: meetingNumber.toString(),
      role: role,
      videoWebRtcMode: 1,
    })
  }).then((response) => {
    return response.json()
  }).then((data) => {
    console.log(data)
    startMeeting(data.signature, data.pass)
  }).catch((error) => {
    console.log(error)
  })
}

function startMeeting(signature, pass) {
  document.getElementById('zmmtg-root').style.display = 'block';

  // Forzar la carga del idioma antes del init
  ZoomMtg.i18n.load('es-ES');

  ZoomMtg.init({
    leaveUrl: 'https://www.google.com',
    patchJsMedia: true,
    leaveOnPageUnload: true,
    success: (success) => {
      console.log(success);
      ZoomMtg.join({
        signature: signature,
        meetingNumber: meetingNumber,
        passWord: pass,
        userName: userName,
        userEmail: '',
        tk: '',
        zak: '',
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
</script>

<template>
  <div class="preparing-sdk">
    <p>Iniciando sesión de Zoom para la reunión: {{ meetingNumber }}</p>
    <span>Cargando módulos de video...</span>
  </div>

  

</template>

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