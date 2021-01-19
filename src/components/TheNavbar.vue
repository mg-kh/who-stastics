<template>
  <v-app-bar app color="mainTheme" dense>
    <div class="d-flex align-center">
      <v-toolbar-title>
        <router-link
          class="navTextColor--text text-decoration-none"
          :to="{ name: 'Home' }"
          >WHO
          <span class="font-weight-light text-caption"
            >STASTISTICS</span
          ></router-link
        >
      </v-toolbar-title>
    </div>

    <v-spacer></v-spacer>

    <v-btn icon small class="mr-3" @click="changeTheme">
      <v-icon class="navTextColor--text" v-if="!$vuetify.theme.dark"
        >mdi-weather-night</v-icon
      >
      <v-icon class="navTextColor--text" v-else>mdi-weather-sunny</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    changeTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("isDark", this.$vuetify.theme.dark);
    }
  }
};
</script>
