export function LOGIN_SUCCESFULL(state, token) {
	state.token = token;
	state.logging_in = false;
}

export function SET_CONNECTION(state, connection) {
	state.connection = connection;
}

export function SET_CURRENT_ITEM(state, itemId) {
	state.lastGameConfig.lastItemId = itemId;
}

export function SET_GAME_CONFIG(state, config) {
	state.lastGameConfig = config;
}

export function SET_LAST_ITEM_ID(state, itemId) {
	state.lastGameConfig.lastItemId = itemId;
}
export function SET_ITEMS(state, items) {
	state.items = items;
}
export function SET_VOTING_PROGRESS(state, votingProgress) {
	state.votingProgress = votingProgress;
}
export function SET_SUMMARY(state, summary) {
	state.summary = summary;
}
export function SET_CATEGORIES(state, categories) {
	state.categories = categories;
}
export function SET_PROFILE_ID(state, profileId) {
	state.profileId = profileId;
}
export function SET_USERS_IN_LOBBY(state, users) {
	state.lobby = users;
}
export function SET_GAME_MASTER(state, master) {
	state.master = master;
}
export function CLEAR_CONFIG(state) {
	state.profileId = "";
	state.master = false;
	state.lastGameConfig = {
		code: "",
		nickname: "",
		lastItemId: null,
	};
	state.categories = [];
	state.items = [];
	state.lobby = [];
	state.votingProgress = { max: null, progress: null };
	state.summary = null;
}
