import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "vuetify/lib/util/colors";
Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    dark: false,
    themes: {
      light: {
        mainTheme: colors.blue,
        mainBackground: colors.blue.lighten4,
        navTextColor: colors.grey.lighten5,
        textColor: colors.grey.darken3,
        BtnColor: colors.blue,
        radioBtn: colors.teal.accent3,
        containerCardBackground: colors.blue.lighten5
      },
      dark: {
        mainTheme: colors.blueGrey.darken4,
        mainBackground: colors.blueGrey.darken4,
        navTextColor: colors.teal.accent3,
        textColor: colors.teal.accent3,
        BtnColor: colors.teal.accent3,
        radioBtn: colors.teal.accent3,
        containerCardBackground: colors.blueGrey.darken3
      }
    }
  }
});

export default vuetify;
