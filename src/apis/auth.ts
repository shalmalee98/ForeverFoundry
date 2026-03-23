export function login(email: string) {
  localStorage.setItem("user", JSON.stringify({ email }));
}

export function getUser() {
  return JSON.parse(localStorage.getItem("user") || "null");
}
