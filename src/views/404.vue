<template>
  <section>
    <v-container>
      <v-row>
        <v-col cols="12 d-flex align-center">
          <v-card class="containerCardBackground ma-auto mt-10 ">
            <v-card-text class="pb-0">
              <lottie-animation path="./404-lottie.json"></lottie-animation>
            </v-card-text>
            <v-card-text class="text-center pt-0">
              <router-link
                class="textColor--text accent-3"
                :to="{ name: 'Home' }"
                >Go Home</router-link
              >
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import LottieAnimation from "lottie-vuejs/src/LottieAnimation.vue";
export default {
  components: {
    LottieAnimation
  }
};
</script>
