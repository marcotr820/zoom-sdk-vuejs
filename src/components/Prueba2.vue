<template>
  <div class="grid-container">
    <div v-for="n in 2" :key="n" class="grid-card" style="background: pink;">
      <div class="card-header">cabecera {{ n }}</div>
      <div class="card-body">
        <iframe 
          :src="getMeetingUrl()"
          width="100%"
          height="100%"
        ></iframe>
      </div>
      <div class="card-footer">footer</div>
    </div>
  </div>
</template>
<script setup>
  const getMeetingUrl = () => {
  return `${import.meta.env.VITE_CLIENT_URL}/meeting/6607020734`;
};
</script>
<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 por fila */
  gap: 15px;
}
.grid-card {
  display: flex;
  flex-direction: column;
  scale: .9;
}
.card-body {
  height: 570px;
  background-color: skyblue;
  overflow: hidden;
}
.card-header, .card-footer {
  background-color: oklch(62.3% 0.214 259.815);
}
</style>