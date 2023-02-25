export  default {
  methods : {
    GetDate(dateStr){
      try {
        let date = dateStr;
        if (typeof dateStr !== typeof new Date()) {
          date = new Date(dateStr);
        }
        return date;
      }
      catch{
        return null;
      }
    },
    // return DD.MM.YYYY
    GetDateString(dateStr) {
      try {
        let date = this.GetDate(dateStr)
        if(!date)
          throw new Error("Date formatter error. Method: GetDate");
        let day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
        let month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`

        return `${day}.${month}.${date.getFullYear()}`
      }
      catch (err){
        console.error("Date formatter error. Method: GetDate");
        throw err;
      }
    },
    // return hh:mm DD.MM.YYYY
    GetDateTime(dateStr){
      try {
        let date = this.GetDate(dateStr)
        if(!date)
          throw new Error("Date formatter error. Method: GetDateTime");

        let hours = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`
        let minutes = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`
        let day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
        let month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`

        return `${hours}:${minutes} ${day}.${month}.${date.getFullYear()}`
      }
      catch (err){
        console.error("Date formatter error. Method: GetDateTime");
        throw err;
      }
    },
    // return MM dd, HH:mm
    GetDateTimeShort(dateStr){
      try {
        let date = this.GetDate(dateStr)
        if(!date)
          throw new Error("Date formatter error. Method: GetDateTime");

        let hours = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
        let minutes = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;

        return `${this.MonthLocalization(date.getMonth()).substring(0,3)} ${date.getDate()}, ${hours}:${minutes}`
      }
      catch (err){
        console.error("Date formatter error. Method: GetDateTimeShort");
        throw err;
      }
    },
    // num = [0...11]
    MonthLocalization(num){
      let month = [
        this.$t("month.jan"),
        this.$t("month.feb"),
        this.$t("month.mar"),
        this.$t("month.apr"),
        this.$t("month.may"),
        this.$t("month.jun"),
        this.$t("month.jul"),
        this.$t("month.aug"),
        this.$t("month.sep"),
        this.$t("month.oct"),
        this.$t("month.nov"),
        this.$t("month.dec"),
      ]
      return month[num] || "Error"
    },
    GetDayDateString(dateStr){
      try {
        let date = new Date(dateStr);
        if(this.isToday(date))
          return this.$t("day.today");
        else if(this.isYesterday(date))
          return this.$t("day.yesterday");
        else {
          return `${this.MonthLocalization(date.getMonth())} ${date.getDate()}`
        }
      }
      catch (err){
        return "Invalid date"
      }
    },
    isToday(someDate){
      const today = new Date();
      return someDate.getDate() === today.getDate() &&
        someDate.getMonth() === today.getMonth() &&
        someDate.getFullYear() === today.getFullYear()
    },
    isYesterday(date) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() - 1);
      if (tomorrow.toDateString() === date.toDateString())
        return true;
      return false;
    },
    isSameDay(date1, date2){
      try {
        return date1.getDate() === date2.getDate() &&
          date1.getMonth() === date2.getMonth() &&
          date1.getFullYear() === date2.getFullYear()
      }
      catch (err){
        console.error("isSameDay func error")
        throw err;
        return false
      }
    },

  },
}
