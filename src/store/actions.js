import { AsyncStorage } from "react-native";
import { send } from "./fetch";

export function FETCH_LIST_DATA({ commit, dispatch }, { type }) {
	commit("FETCHING_LISTS");
	return fetchPosts(type).then((posts) => {
		return commit("SET_POSTS", { posts });
	});
}

export async function LOGIN({ commit }) {
	commit("LOGGING_IN", true);
	const { token } = await send("POST", "login/guest");
	if (token) {
		commit("LOGIN_SUCCESFULL", token);
		AsyncStorage.setItem("token", token);
		return true;
	}
}

export function SET_USER({ commit, state }, { userObj }) {
	return commit("LOGIN_SUCCESFULL", { userObj });
}

export function LOGOUT({ commit, state }, callback) {
	return new Promise((resolve, reject) => {
		AsyncStorage.removeItem("email").then(() => {
			callback();
			resolve();
		});
	});
}
