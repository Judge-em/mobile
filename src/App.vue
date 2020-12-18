<template>
	<root>
		<app-navigation></app-navigation>
	</root>
</template>

<script>
import store from "./store";
import {
	createAppContainer,
	createStackNavigator,
	createDrawerNavigator,
} from "vue-native-router";
import { Root } from "native-base";
import HomeScreen from "./screens/home/index.vue";
import LoginScreen from "./screens/login/index.vue";
import RankingScreen from "./screens/ranking/index.vue";
import LobbyScreen from "./screens/lobby/index.vue";
import RoomScreen from "./screens/room/index.vue";

import SideBarScreen from "./screens/sidebar/index.vue";

const Drawer = createDrawerNavigator(
	{
		Home: { screen: HomeScreen },
		Login: { screen: LoginScreen },
		Ranking: { screen: RankingScreen },
		Lobby: { screen: LobbyScreen },
		Room: { screen: RoomScreen },
	},
	{
		initialRouteName: "Login",
		contentOptions: {
			activeTintColor: "#e91e63",
		},
		contentComponent: SideBarScreen,
	},
);

const AppNavigation = createAppContainer(
	createStackNavigator(
		{
			Drawer: { screen: Drawer },
			Login: { screen: LoginScreen },
			Ranking: { screen: RankingScreen },
			Lobby: { screen: LobbyScreen },
			Room: { screen: RoomScreen },
		},
		{
			initialRouteName: "Drawer",
			headerMode: "none",
		},
	),
);
export default {
	created() {
		store.dispatch("RESTORE_SESSION");
	},
	components: { Root, AppNavigation },
};
</script>
