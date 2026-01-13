<template>
  <div class="grid-container">
    <div class="grid-card" style="background: pink;">
      <div class="card-header">cabecera</div>
      <div class="card-body">body</div>
      <div class="card-footer">footer</div>
    </div>
    <div class="grid-card" style="background: skyblue;">2</div>
    <div class="grid-card" style="background: silver;">3</div>
  </div>
</template>
<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 2 por fila */
}
.grid-card {
  display: flex;
  flex-direction: column;
}
.card-body {
  height: 500px;
  background-color: aqua;
}
</style>