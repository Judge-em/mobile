<template>
	<nb-container>
		<status-bar :barStyle="'light-content'"></status-bar>
		<nb-container :style="{ backgroundColor: '#fff' }">
			<nb-header>
				<nb-body>
					<nb-title> WELCOME IN LOBBY </nb-title>
				</nb-body>
			</nb-header>
			<nb-content padder>
				<nb-form>
					<nb-item v-for="(user, index) in users" :key="index">
						<nb-text>{{ user }}</nb-text>
					</nb-item>
				</nb-form>
				<view :style="{ marginTop: 10 }">
					<nb-button block :onPress="exitRoom">
						<nb-text>Exit Room </nb-text>
					</nb-button>
				</view>
			</nb-content>
		</nb-container>
	</nb-container>
</template>

<script>
import { Dimensions, Platform } from "react-native";
import { Toast } from "native-base";
import store from "../../store";

export default {
	props: {
		navigation: {
			type: Object,
		},
	},
	computed: {
		users() {
			console.log(store.state.lobby);
			return store.state.lobby;
		},
		currentItem: () => store.state.lastGameConfig.lastItemId,
	},
	data() {
		return {};
	},
	mounted() {},
	methods: {
		exitRoom() {
			store.dispatch("END_GAME");
			this.navigation.navigate("Home");
		},
	},
	watch: {
		currentItem(newVal) {
			if (newVal !== null) {
				console.log("triggered");
				this.navigation.navigate("Room");
			}
		},
	},
};
</script>

<style>
.imageContainer {
	display: flex;
	flex: 1;
	justify-content: center;
}
.text-color-primary {
	color: blue;
	font-family: Roboto;
}
.logoContainer {
	flex: 1;
	margin-bottom: 30;
}
.logo {
	position: absolute;
	width: 280;
	height: 100;
}
.text-container {
	align-items: center;
	margin-bottom: 50;
	background-color: transparent;
}
.text-color-white {
	color: white;
}
.button-container {
	background-color: #6faf98;
	align-self: center;
}
</style>
