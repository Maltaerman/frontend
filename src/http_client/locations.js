export default function (instance) {
  return {
    requestAddressReview({ lat, lng }) {
      return instance.post("locations/request-info", { lat, lng });
    },
    searchByMapCenter(payload) {
      return instance.post("locations/cord_search", payload);
    },
    exactSearch(lat, lng) {
      return instance.get(`locations/search?lat=${lat}&lng=${lng}`);
    },
    getLocationById(locationId) {
      return instance.get(`locations/location-info?location_id=${locationId}`);
    },
    getReportsRequests(payload) {
      return instance.get("locations/location-requests", { params: payload });
    },
    getAssignedRequests() {
      return instance.get("locations/assigned-locations");
    },
    submitLocationReport(payload) {
      return instance.put("locations/submit-report", payload);
    },
    assignRequest(location_id) {
      return instance.put(
        `locations/assign-location?location_id=${location_id}`
      );
    },
    removeAssignRequest(location_id) {
      return instance.put(
        `/locations/remove-assignment?location_id=${location_id}`
      );
    },
    getRequestCount() {
      return instance.get("/locations/pending-count");
    },
    getRecentReports(records) {
      return instance.get("/locations/recent-reports", {
        params: {
          records,
        },
      });
    },

    // position {lng : Number, lat : Number}
    getGeocodingOSM(position) {
      return instance.get("/geocode/reverse", {
        params: {
          geocoder: "osm",
          ...position,
        },
      });
    },
    addReportByAdmin(report) {
      return instance.post("/locations/add", report);
    },
  };
}
