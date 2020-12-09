import axios from "axios";
import store from "../store";
const baseURL = "https://judge-em-api.herokuapp.com/api";

axios.interceptors.request.use(
	(config) => {
		const token = store.state.token;
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error),
);

export async function send(method, path, data, params) {
	const response = await axios({
		method,
		url: `${baseURL}/${path}`,
		data,
		params,
	});
	console.log(response.data);
	return response.data;
}

export function fetchPosts(type) {
	return `${type}`;
}
