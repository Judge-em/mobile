import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { Toast } from "native-base";
import { AsyncStorage } from "react-native";
import { send } from "../helpers/fetch";
import messageType from "../helpers/messageType";

export function RESTORE_SESSION({ commit, dispatch }) {
	AsyncStorage.getItem("token").then((val) => {
		if (val) {
			dispatch("SET_SESSION", val);
		}
	});
}

export async function SET_SESSION({ commit }, token) {
	commit("LOGIN_SUCCESFULL", token);
	AsyncStorage.setItem("token", token);
	return true;
}

export async function LOGIN({ commit, dispatch }) {
	commit("LOGGING_IN", true);
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
	// connection.on("RefreshItemList", (items) => {
	// 	gameHub.$emit("items-received", items);
	// });
	// connection.on("RefreshVotingProgress", (voteCounter, maxVotes) => {
	// 	gameHub.$emit("voting-progress-received", voteCounter, maxVotes);
	// });
	connection.on("SendMessage", (content, type) => {
		Toast.show({
			text: content,
			type: messageType[type],
			duration: 3000,
		});
		console.log({ content, type });
	});
	// connection.on("DisbandGame", (messsage) => {
	// 	console.log(messsage);
	// });
	// connection.on("ShowSummary", (summary) => {
	// 	gameHub.$emit("summary-received", summary);
	// });
	// connection.on("RefreshCategories", (category) => {
	// 	gameHub.$emit("categories-received", category);
	// });
	// connection.on("SendPlayerProfileId", (profileId) => {
	// 	gameHub.$emit("profile-received", profileId);
	// });

	// connection.on("RefreshPlayersList", (playerList) => {
	// 	gameHub.$emit("player-list-received", playerList);
	// });

	// connection.on("AllowGameControl", (masterId) => {
	// 	gameHub.$emit("master-id-received", masterId);
	// });

	// connection.on("RequestCurrentItemId", (gameCode) => {
	// 	gameHub.$emit("master-requested", gameCode);
	// });

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

export function LOGOUT({ commit, state }, callback) {
	return new Promise((resolve, reject) => {
		AsyncStorage.removeItem("email").then(() => {
			callback();
			resolve();
		});
	});
}
