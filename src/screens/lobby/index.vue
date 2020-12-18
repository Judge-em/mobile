<template>
	<nb-container :style="{ backgroundColor: '#fff' }">
		<nb-header>
			<nb-body>
				<nb-title> WELCOME IN LOBBY {{ code.toUpperCase() }}</nb-title>
			</nb-body>
		</nb-header>
		<nb-content padder>
			<nb-text :style="{ fontSize: 18, fontWeight: 'bold' }"
				>Waiting for the master to start the game</nb-text
			>
			<nb-list :style="{ marginTop: 20 }">
				<nb-list-item
					v-for="(user, index) in users"
					:key="index"
					:style="{ height: 40 }"
				>
					<nb-text
						:style="{
							marginLeft: -40,
						}"
					>
						{{ user }}
					</nb-text>
				</nb-list-item>
			</nb-list>
			<nb-button block :onPress="exitRoom">
				<nb-text>Exit Room </nb-text>
			</nb-button>
		</nb-content>
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
			return store.state.lobby;
		},
		currentItem: () => store.state.lastGameConfig.lastItemId,
		code: () => store.state.lastGameConfig.code,
	},

	methods: {
		exitRoom() {
			store.dispatch("END_GAME");
			this.navigation.navigate("Home");
		},
	},
	watch: {
		currentItem(newVal) {
			if (newVal !== null) {
				this.navigation.navigate("Room");
			}
		},
	},
};
</script>

<style></style>
