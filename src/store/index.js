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
	},
});

export default store;