export default {
  methods: {
    TrimTurbo(string) {
      //This regex replaces any two or more spaces in a row with a single space.
      let newString = string.replace(/ {2,}/g, " ").trim();
      return newString;
    },
  },
};
