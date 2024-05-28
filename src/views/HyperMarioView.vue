<template>
  <div class="hyper-mario">
    <div v-if="playing" class="hyper-mario__game">
      <div class="hyper-mario__col hyper-mario__col--2">
        <audio
          class="hyper-mario__bg-music"
          ref="bgMusic"
          src="./assets/audio/music/mario_theme.mp3"
          loop
        ></audio>
        <div class="hyper-mario__cvs-wrapper">
          <canvas
            ref="canvasRef"
            class="hyper-mario__canvas"
            :width="canvasWidth"
            :height="canvasHeight"
          ></canvas>
        </div>
      </div>
      <div class="hyper-mario__col hyper-mario__col--1">
        <div class="hyper-mario__controls-row">
          <button @click="toggleMute" :class="{ muted: isMuted }">
            <span v-if="!isMuted"
              ><v-icon name="gi-sound-on" scale="2.4"
            /></span>
            <span v-if="isMuted"
              ><v-icon name="gi-sound-off" scale="2.4"
            /></span>
          </button>
        </div>
        <div class="hyper-mario__controls-row">
          <div class="hyper-mario__controls hyper-mario__controls--1">
            <span>{{ `Влево - ` }}</span
            ><span><v-icon name="bi-arrow-left-square" scale="1.8" /></span>
          </div>
          <span>{{ ` | ` }}</span>
          <div class="hyper-mario__controls hyper-mario__controls--2">
            <span><v-icon name="bi-arrow-right-square" scale="1.8" /></span>
            <span>{{ ` - Вправо` }}</span>
          </div>
        </div>
        <div class="hyper-mario__controls-row">
          <div class="hyper-mario__controls hyper-mario__controls--3">
            <span>Прыжок</span
            ><span><v-icon name="ri-space" scale="1.8" /></span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!playing" class="ui retro-font">
      <span>{{ `Лучший счёт -  ${bestScore}` }}</span>
      <button @click="startGame" class="hyper-mario__play-btn">
        <span>Играть</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from "vue";
import Game from "@/game";

const canvasRef = ref<HTMLCanvasElement | null>(null);

const bgMusic = ref<HTMLAudioElement | null>(null);

const isMuted = ref<boolean>(false);
const playing = ref<boolean>(false);

const canvasWidth = 800;
const canvasHeight = 600;

const bestScore = ref(0);

const endGame = (newScore: number) => {
  if (newScore > bestScore.value) {
    bestScore.value = newScore;
    localStorage.setItem("bestScore", newScore.toString());
  }
  playing.value = false;
};

const toggleMute = () => {
  if (bgMusic.value) {
    bgMusic.value.muted = !bgMusic.value.muted;
    isMuted.value = bgMusic.value.muted;
  }
};

const startGame = () => {
  if (!playing.value) {
    playing.value = true;
    nextTick(() => {
      if (canvasRef.value) {
        const gameInstance = new Game();
        
        gameInstance.init(
          canvasRef.value,
          canvasWidth,
          canvasHeight,
          bgMusic.value,
          endGame
        );
      } else {
        console.error("Canvas element is not yet available");
      }
    });
  }
};

onMounted(() => {
  const storedBestScore = localStorage.getItem("bestScore");
  if (storedBestScore !== null) {
    bestScore.value = parseInt(storedBestScore, 10);
  }
});
</script>

<style lang="scss" scoped>
.ui {
  display: flex;
  flex-direction: column;
  gap: 30px;

  font-size: 1.5rem;

  button {
    color: #ffdf00;
    align-self: center;
    transition: 0.1s ease-out;
    padding: 10px;

    &:hover {
      opacity: 0.75;
    }
  }
}

.hyper-mario {
  background: #111111;
  position: relative;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 25px;

  &__game {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;
    justify-content: flex-end;
    padding: 25px;
  }

  &__cvs-wrapper {
    border: 10px solid rgb(75, 75, 75);
    box-shadow: 0 0 15px 10px rgba(255, 255, 255, 0.05);
    border-radius: 10px;
  }

  &__col--1 {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 20px;

    font-size: 1.2rem;
  }

  &__controls-row {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  &__controls {
    display: flex;
    align-items: center;

    svg {
      fill: #ffdf00;
    }
  }

  &__controls--1,
  &__controls--2 {
    gap: 5px;
  }

  &__controls--3 {
    flex-direction: column;
    gap: 5px;
  }
}

.muted {
  color: #ef3038;
}
</style>
