import http from "./httpService";

export function getOtp(phoneNumber) {
  return http
    .post("/user/get-otp", { phoneNumber })
    .then(({ data }) => data.data);
}

export function checkOtp({ phoneNumber, otp }) {
  return http
    .post("/user/check-otp", { phoneNumber, otp })
    .then(({ data }) => data.data);
}

export function completeProfile(data) {
  return http
    .post("/user/complete-profile", data)
    .then(({ data }) => data.data);
}

export function getUserProfile() {
  return http.get("/user/profile").then(({ data }) => data.data);
}
