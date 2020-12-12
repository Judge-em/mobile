import Vue from "vue-native-core";
import Vuex from "vuex";
import * as actions from "./actions";
import * as mutations from "./mutations";

Vue.use(Vuex);

const store = new Vuex.Store({
	actions,
	mutations,

	state: {
		token: null,
		logging_in: false,
		connection: null,
		master: null,
		user: null,
		lastGameConfig: {
			code: "",
			nickname: "",
			lastItemId: null,
		},
		categories: [],
		items: [],
		lobby: [],
		votingProgress: { max: null, progress: null },
		summary: {},
	},
});

export default store;
