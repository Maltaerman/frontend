export default function guest(instance) {
  return {
    getCode(tel) {
      return instance.post(`/guest/request-otp?phone_number=${tel}`);
    },
    sendAddressRequest({ phone_number, otp, lat, lng }) {
      return instance.post("/guest/request-location", {
        phone_number,
        otp,
        lat,
        lng,
      });
    },
  };
}
