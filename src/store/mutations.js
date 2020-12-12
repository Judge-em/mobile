export function LOGGING_IN(state, status) {
	state.logging_in = status;
}

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
