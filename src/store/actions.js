import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { Toast } from "native-base";
import { AsyncStorage } from "react-native";
import { send } from "../helpers/fetch";
import messageType from "../helpers/messageType";

export function SET_SESSION({ commit }, token) {
	commit("LOGIN_SUCCESFULL", token);
	AsyncStorage.setItem("token", token);
	return true;
}

export function RESTORE_SESSION({ commit, dispatch }) {
	AsyncStorage.getItem("token").then((val) => {
		if (val) {
			dispatch("SET_SESSION", val);
		}
	});
}

export function DESTROY_SESSION({ commit, dispatch }) {
	AsyncStorage.removeItem("token").then(() => {
		dispatch("SET_SESSION", null);
	});
}

export function SET_GAME_CONFIG({ commit }, config) {
	commit("SET_GAME_CONFIG", config);
}

export function SET_LAST_ITEM_ID({ commit }, id) {
	commit("SET_LAST_ITEM_ID", id);
}

export async function LOGIN({ commit, dispatch }) {
	const { token } = await send("POST", "login/guest");
	if (token) {
		dispatch("SET_SESSION", token);
	}
}

export async function START_CONNECTION({ commit, state }) {
	console.log(state.token);
	const connection = new HubConnectionBuilder()
		.withUrl(`https://judge-em-api.herokuapp.com/hubs/game`, {
			accessTokenFactory: () => state.token,
		})
		.configureLogging(LogLevel.Information)
		.build();

	connection.on("RefreshCurrentItemId", (itemId) => {
		commit("SET_CURRENT_ITEM", itemId);
	});
	connection.on("RefreshItemList", (items) => {
		commit("SET_ITEMS", items);
	});
	connection.on("RefreshVotingProgress", (voteCounter, maxVotes) => {
		commit("SET_VOTING_PROGRESS", { progress: voteCounter, max: maxVotes });
	});
	connection.on("SendMessage", (content, type) => {
		Toast.show({
			text: content,
			type: messageType[type],
			duration: 3000,
		});
		console.log({ content, type });
	});

	connection.on("ShowSummary", (summary) => {
		commit("SET_SUMMARY", summary);
	});
	connection.on("RefreshCategories", (categories) => {
		commit("SET_CATEGORIES", categories);
	});
	connection.on("SendPlayerProfileId", (profileId) => {
		commit("SET_PROFILE_ID", profileId);
	});

	connection.on("RefreshPlayersList", (playerList) => {
		commit("SET_USERS_IN_LOBBY", playerList);
	});

	connection.on("AllowGameControl", (masterId) => {
		commit("SET_GAME_MASTER", masterId);
	});

	connection.on("RequestCurrentItemId", (gameCode) => {
		console.log("notImplemented");
	});

	commit("SET_CONNECTION", connection);

	let startedPromise = null;

	function start() {
		startedPromise = connection.start().catch((err) => {
			console.error("Failed to connect with hub", err);
			return new Promise((resolve, reject) =>
				setTimeout(() => start().then(resolve).catch(reject), 5000),
			);
		});
		return startedPromise;
	}
	start();
	connection.onclose(() => start());
}

export function JOIN_TO_ROOM({ commit, state }, { code, nickname }) {
	state.connection.invoke("ConnectToGame", code.toUpperCase(), nickname);
}

export function END_GAME({ state, commit }) {
	console.log("22222", state.lastGameConfig);
	state.connection.invoke("DisconnectFromGame", state.lastGameConfig.code);
	commit("CLEAR_CONFIG");
}

export function LOGOUT({ commit, state }, callback) {
	return new Promise((resolve, reject) => {
		AsyncStorage.removeItem("token").then(() => {
			callback();
			resolve();
		});
	});
}
