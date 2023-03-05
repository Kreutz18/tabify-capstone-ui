export function Logout() {
	localStorage.removeItem("accessToken");
	localStorage.removeItem("user");
	localStorage.removeItem("loggedIn");
	localStorage.removeItem("expiresIn");
	localStorage.removeItem("tokenType");
	window.location = "http://localhost:3000/home";
}