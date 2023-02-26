export function Logout() {
	localStorage.removeItem("accessToken");
	localStorage.removeItem("user");
	window.location = "http://localhost:3000/home";
}