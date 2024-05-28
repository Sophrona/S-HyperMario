<template>
  <main class="wrapper">
    <div class="font-preloader">Font Preloader</div>
    <div class="wrapper__bg"></div>
    <div class="wrapper__content wrapper__content--section1">
      <h1 class="text-secondary">
        Мини проект в выбранной среде программирования
      </h1>
    </div>
    <div class="wrapper__content wrapper__content--section2">
      <div class="wrapper__img-wrapper">
        <img src="../../public/assets/mario.png" alt="Mario" />
      </div>
      <nav class="wrapper__nav">
        <router-link to="/hyper-mario" class="custom-button">
          Перейти к проекту<span></span><span></span><span></span><span></span>
        </router-link>
      </nav>
    </div>
    <div class="wrapper__content wrapper__content--section3">
      <div class="wrapper__info">
        <div class="wrapper__info-section">
          <span class="text-secondary">Выполнил: </span>
          <span>Искаков В.А., ученик 10 класса</span>
        </div>
        <div class="wrapper__info-section">
          <span class="text-secondary">Научный руководитель: </span>
          <span>Чёрная Е.А, методист по информатике</span>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.font-preloader {
  position: absolute;
  top: 0;
  left: 0;
  visibility: hidden;
  font-family: "PressStart";
}

.wrapper {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;

  &__bg {
    position: fixed;
    top: -50%;
    left: -50%;
    right: -50%;
    bottom: -50%;
    width: 200%;
    height: 200vh;
    background: transparent url("../../public/assets/noise.png") repeat 0 0;
    background-repeat: repeat;
    animation: bg-animation 0.8s infinite;
    opacity: 0.6;
    visibility: visible;
  }

  &__font-preloader {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    font-family: "PressStart";
  }

  &__content {
    width: 100%;
    display: flex;

    &--section1 {
      flex: 1;
      align-items: center;
      justify-content: center;
      max-height: 300px;

      h1 {
        font-size: 3rem;
        max-width: 50%;
        text-align: center;
      }
    }

    &--section2 {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 25px;
      align-items: center;
      justify-content: center;
    }

    &--section3 {
      justify-content: flex-end;
      padding: 0 50px 50px 0;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  &__info-section {
    display: flex;
    flex-direction: column;
    gap: 10px;

    span {
      text-align: right;
    }
  }

  &__img-wrapper {
    margin-right: 40px;

    img {
      max-width: 350px;
      width: 100%;
      height: auto;
      filter: drop-shadow(12px 4px 8px rgba(255, 255, 255, 0.05))
        grayscale(0.25);
    }
  }
}

.custom-button {
  --c: #eb444d;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: var(--c);
  font-size: 16px;
  border: 0.2em solid var(--c);
  border-radius: 0.5em;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 0.1em;
  text-align: center;
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: 0.5s;
  padding: 15px;

  span {
    position: absolute;
    width: 25%;
    height: 100%;
    background-color: var(--c);
    transform: translateY(150%);
    border-radius: 50%;
    left: calc((var(--n) - 1) * 25%);
    transition: 0.5s;
    transition-delay: calc((var(--n) - 1) * 0.1s);
    z-index: -1;
  }

  &:hover {
    color: black;

    span {
      transform: translateY(0) scale(2);
    }
  }

  span:nth-child(1) {
    --n: 1;
  }

  span:nth-child(2) {
    --n: 2;
  }

  span:nth-child(3) {
    --n: 3;
  }

  span:nth-child(4) {
    --n: 4;
  }
}

@keyframes bg-animation {
  0% {
    transform: translate(0, 0);
  }
  10% {
    transform: translate(-5%, -5%);
  }
  20% {
    transform: translate(-10%, 5%);
  }
  30% {
    transform: translate(5%, -10%);
  }
  40% {
    transform: translate(-5%, 15%);
  }
  50% {
    transform: translate(-10%, 5%);
  }
  60% {
    transform: translate(15%, 0);
  }
  70% {
    transform: translate(0, 10%);
  }
  80% {
    transform: translate(-15%, 0);
  }
  90% {
    transform: translate(10%, 5%);
  }
  100% {
    transform: translate(5%, 0);
  }
}
</style>
