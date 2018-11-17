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
	},
	addBucket(payload) {
		return axios
			.post("/bucket", payload)
			.then(response => {
				return response.data;
			})
			.catch(err => {
				return "Add Bucket failed";
			});
	},
	getUser() {
		return axios
			.get(`/user`)
			.then(response => {
				return response.data;
			})
			.catch(err => console.log(`Error in getting User: ${err}`));
	},
	deleteBucket(payload) {
		return axios
			.delete(`/bucket/${payload}`)
			.then(response => {
				return response.data;
			})
			.catch(err => console.log(`Error in deleting Bucket: ${err}`));
	},
	addTodo(payload) {
		return axios
			.post("/todo", payload)
			.then(response => {
				return response.data;
			})
			.catch(err => console.log(`Error in adding Todo: ${err}`));
	}
};
