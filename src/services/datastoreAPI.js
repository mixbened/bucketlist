import axios from "axios";

export default {
	login(payload) {
		return axios
			.post("/login", payload, { headers: { withCredentials: true } })
			.then(response => {
				return response.data;
			})
			.catch(err => {
				return "Authentication failed";
			});
	},
	logout() {
		return axios
			.get("/logout")
			.then(response => {
				return response.data;
			})
			.catch(err => {
				return "Error in Logout.";
			});
	},
	register(payload) {
		return axios
			.post("/user", payload)
			.then(response => {
				return response.data;
			})
			.catch(err => {
				return "Registration failed.";
			});
	}
};
