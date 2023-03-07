export default {
  data() {
    return {
      reportFlags: {
        buildingCondition: "buildingCondition",
        electricity: "electricity",
        carEntrance: "carEntrance",
        water: "water",
        hospital: "hospital",
        fuelStation: "fuelStation",
      },
      ReportsState: {
        buildingCondition: {
          Intact: "intact",
          Damaged: "damaged",
          NoData: "no_data",
        },
        electricity: {
          Stable: "stable",
          Intermittent: "intermittent",
          NoData: "no_data",
        },
        carEntrance: {
          Accessible: "accessible",
          Inaccessible: "inaccessible",
          NoData: "no_data",
        },
        water: {
          Stable: "stable",
          Intermittent: "intermittent",
          NoData: "no_data",
        },
        fuelStation: {
          Closed: "closed",
          Open: "open",
          NoData: "no_data",
        },
        hospital: {
          Closed: "closed",
          Open: "open",
          NoData: "no_data",
        },
      },
    };
  },
  methods: {
    GetStateColor(field, status) {
      let red = "red";
      let green = "green";
      let gray = "gray";
      try {
        let a = {
          buildingCondition: {
            intact: green,
            damaged: red,
            no_data: gray,
          },
          electricity: {
            stable: green,
            intermittent: red,
            no_data: gray,
          },
          carEntrance: {
            accessible: green,
            inaccessible: red,
            no_data: gray,
          },
          water: {
            stable: green,
            intermittent: red,
            no_data: gray,
          },
          fuelStation: {
            closed: red,
            open: green,
            no_data: gray,
          },
          hospital: {
            closed: red,
            open: green,
            no_data: gray,
          },
        };
        return a[field][status] ?? red;
      } catch (err) {
        console.error(`Поля ${field} зі статусом ${status} не знайдено`);
        return red;
      }
    },
    getTextColorClass(field, status) {
      let color = this.GetStateColor(field, status);

      if (color === "red") return "text-red-c-500";
      else if (color === "green") return "text-green-c-500";
      else if (color === "yellow") return "text-yellow-custom-400";
      else if (color === "gray") return "text-gray-c-500";
      else return "text-red-c-500";
    },
    getSVGColorClass(field, status) {
      let color = this.GetStateColor(field, status);

      let colors = {
        red: "fill-red-c-500",
        green: "fill-green-c-500",
        yellow: "fill-yellow-custom-400",
        gray: "fill-gray-c-500",
      };
      return colors[color] ?? colors.red;
    },
    GetStatusTranslation(status) {
      try {
        let a = {
          intact: this.$t("reportTools.intact"),
          damaged: this.$t("reportTools.damaged"),
          no_data: this.$t("reportTools.noData"),
          stable: this.$t("reportTools.stable"),
          intermittent: this.$t("reportTools.intermittent"),
          accessible: this.$t("reportTools.accessible"),
          inaccessible: this.$t("reportTools.inaccessible"),
          closed: this.$t("reportTools.closed"),
          open: this.$t("reportTools.open"),
        };
        return a[status];
      } catch (err) {
        console.error(`Поля зі статусом ${status} не знайдено`);
        return this.$t("general.error");
      }
    },
    GetFlagToolTip(field) {
      let translation = {
        buildingCondition: this.$t("tooltips.buildingCondition"),
        hospital: this.$t("tooltips.hospital"),
        carEntrance: this.$t("tooltips.carEntrance"),
        electricity: this.$t("tooltips.electricity"),
        fuelStation: this.$t("tooltips.fuelStation"),
        water: this.$t("tooltips.water"),
      };
      return translation[field] || this.$t("general.error");
    },
    ReportsData() {
      return [
        {
          name: this.reportFlags.buildingCondition,
          options: [
            {
              value: this.ReportsState.buildingCondition.Intact,
              i18n: "intact",
              class:
                "peer-checked:border-green-c-200 peer-checked:text-green-c-500",
            },
            {
              value: this.ReportsState.buildingCondition.Damaged,
              i18n: "damaged",
              class:
                "peer-checked:border-red-c-200 peer-checked:text-red-c-500",
            },
            {
              value: this.ReportsState.buildingCondition.NoData,
              i18n: "noData",
              class:
                "peer-checked:border-gray-c-500 peer-checked:text-gray-c-800",
            },
          ],
        },
        {
          name: this.reportFlags.electricity,
          options: [
            {
              value: this.ReportsState.electricity.Stable,
              i18n: "stable",
              class:
                "peer-checked:border-green-c-200 peer-checked:text-green-c-500",
            },
            {
              value: this.ReportsState.electricity.Intermittent,
              i18n: "intermittent",
              class:
                "peer-checked:border-red-c-200 peer-checked:text-red-c-500",
            },
            {
              value: this.ReportsState.electricity.NoData,
              i18n: "noData",
              class:
                "peer-checked:border-gray-c-500 peer-checked:text-gray-c-800",
            },
          ],
        },
        {
          name: this.reportFlags.carEntrance,
          options: [
            {
              value: this.ReportsState.carEntrance.Accessible,
              i18n: "roadwayAccessible",
              class:
                "peer-checked:border-green-c-200 peer-checked:text-green-c-500",
            },
            {
              value: this.ReportsState.carEntrance.Inaccessible,
              i18n: "inaccessible",
              class:
                "peer-checked:border-red-c-200 peer-checked:text-red-c-500",
            },
            {
              value: this.ReportsState.carEntrance.NoData,
              i18n: "noData",
              class:
                "peer-checked:border-gray-c-500 peer-checked:text-gray-c-800",
            },
          ],
        },
        {
          name: this.reportFlags.water,
          options: [
            {
              value: this.ReportsState.water.Stable,
              i18n: "stable",
              class:
                "peer-checked:border-green-c-200 peer-checked:text-green-c-500",
            },
            {
              value: this.ReportsState.water.Intermittent,
              i18n: "intermittent",
              class:
                "peer-checked:border-red-c-200 peer-checked:text-red-c-500",
            },
            {
              value: this.ReportsState.water.NoData,
              i18n: "noData",
              class:
                "peer-checked:border-gray-c-500 peer-checked:text-gray-c-800",
            },
          ],
        },
        {
          name: this.reportFlags.fuelStation,
          options: [
            {
              value: this.ReportsState.fuelStation.Open,
              i18n: "open",
              class:
                "peer-checked:border-green-c-200 peer-checked:text-green-c-500",
            },
            {
              value: this.ReportsState.fuelStation.Closed,
              i18n: "closed",
              class:
                "peer-checked:border-red-c-200 peer-checked:text-red-c-500",
            },
            {
              value: this.ReportsState.fuelStation.NoData,
              i18n: "noData",
              class:
                "peer-checked:border-gray-c-500 peer-checked:text-gray-c-800",
            },
          ],
        },
        {
          name: this.reportFlags.hospital,
          options: [
            {
              value: this.ReportsState.hospital.Open,
              i18n: "open",
              class:
                "peer-checked:border-green-c-200 peer-checked:text-green-c-500",
            },
            {
              value: this.ReportsState.hospital.Closed,
              i18n: "closed",
              class:
                "peer-checked:border-red-c-200 peer-checked:text-red-c-500",
            },
            {
              value: this.ReportsState.hospital.NoData,
              i18n: "noData",
              class:
                "peer-checked:border-gray-c-500 peer-checked:text-gray-c-800",
            },
          ],
        },
      ];
    },
    getTooltipText(reportFlag) {
      try {
        let a = {
          buildingCondition: this.$t("reportTools.buildingCondition"),
          electricity: this.$t("reportTools.electricity"),
          carEntrance: this.$t("reportTools.carEntrance"),
          water: this.$t("reportTools.water"),
          fuelStation: this.$t("reportTools.fuelStation"),
          hospital: this.$t("reportTools.hospital"),
        };
        return a[reportFlag];
      } catch (err) {
        return "Tooltip content error";
      }
    },
  },
};
