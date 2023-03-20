import i18n from "../../libs/i18n/index.js";
import stringFormatter from "./StringFormatter.js";

export default {
  mixins : [stringFormatter],
  methods : {
    ReportAddressFull(report){
      let address = ""
      if(report.address)
        address += `${report.address}, `
      if(report.street_number)
        address += `${report.street_number}, `
      if(report.index)
        address += `${report.index}, `
      if(report.city)
        address += `${report.city}`
      let trim = 0;
      for (let i = address.length-1; i<=0; i--){
        if(address[i] === " " || address[i] === ",")
          trim++
        else
          break;
      }
      address = address.substring(0, address.length-trim);
      return address.length>0 ? address : this.$t("general.error");
    }
  }
}
