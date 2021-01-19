<template>
  <v-app>
    <the-navbar></the-navbar>
    <v-main class="mainBackground">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import TheNavbar from "@/components/TheNavbar";
export default {
  name: "App",
  components: {
    TheNavbar
  },
  mounted() {
    if (localStorage.getItem("isDark") === "true") {
      this.$vuetify.theme.dark = true;
    } else {
      this.$vuetify.theme.dark = false;
    }
  }
};
</script>
