<template>
  <router-view />
</template>

<script setup lang="ts"></script>

<style lang="scss">
@import "./styles/global.scss";
@import "./styles/null.scss";

@import url("https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap");

@font-face {
  font-family: "PressStart";
  src: url("../public/assets/fonts/PressStart2P.ttf");
}

#app {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
