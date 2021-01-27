export default {
  install() {
    const changeCountryCode = country => {
      switch (country) {
        case "Thailand":
          return "th";

        case "Myanmar":
          return "mm";

        case "Cambodia":
          return "kh";

        case "Lao People's Democratic Republic":
          return "la";

        case "Viet Nam":
          return "vn";

        case "Malaysia":
          return "my";

        case "Indonesia":
          return "id";

        case "Philippines":
          return "ph";

        case "Singapore":
          return "sg";

        case "Brunei Darussalam":
          return "bn";

        case "Timor-Leste":
          return "tl";
      }
    };
    return changeCountryCode;
  }
};
