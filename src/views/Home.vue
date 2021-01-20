<template>
  <section>
    <v-container>
      <v-row>
        <v-col class="text-center">
          <v-card
            max-width="300"
            class="mx-auto py-10 mt-10"
            tile
            color="transparent"
            elevation="0"
          >
            <v-card-title class="justify-center">
              <span
                class="textColor--text text-uppercase text-subtitle-1 font-weight-bold"
                >who statistics
                <router-link :to="{ name: 'Dashboard' }"
                  ><span class="textColor--text accent-3 text-caption"
                    >visualizer</span
                  ></router-link
                >
              </span>
            </v-card-title>
            <v-card-text>
              <router-link
                :to="{ name: 'Dashboard' }"
                class="text-decoration-none"
              >
                <v-avatar size="150" color="white" rounded>
                  <lottie-animation
                    path="./home-lottie.json"
                  ></lottie-animation>
                </v-avatar>
              </router-link>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn
                tile
                large
                :to="{ name: 'Dashboard' }"
                dark
                class="px-3 BtnColor"
              >
                Find Out
                <v-icon small class="ml-2">mdi-arrow-right</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import LottieAnimation from "lottie-vuejs/src/LottieAnimation.vue";
export default {
  name: "Home",
  components: {
    LottieAnimation
  }
};
</script>
