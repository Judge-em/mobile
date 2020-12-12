<template>
	<nb-container>
		<status-bar :barStyle="'light-content'"></status-bar>
		<image-background :source="launchScreenBg" class="imageContainer">
			<nb-card class="mb-15">
				<nb-card-item bordered>
					<nb-left>
						<nb-body>
							<nb-text>LOG IN TO JUDGE'EM</nb-text>
						</nb-body>
					</nb-left>
				</nb-card-item>

				<nb-card-item>
					<nb-body>
						<nb-button
							:onPress="loginAsGuest"
							block
							:style="{ margin: 15, marginTop: 10 }"
						>
							<nb-text>Log in as Guest</nb-text>
						</nb-button>
					</nb-body>
				</nb-card-item>
			</nb-card>
		</image-background>
	</nb-container>
</template>

<script>
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { Dimensions, Platform } from "react-native";
import launchScreenBg from "../../../assets/launchscreen-bg.png";
import store from "../../store";

export default {
	props: {
		navigation: {
			type: Object,
		},
	},
	data() {
		return {
			launchScreenBg,
		};
	},
	mounted() {},
	computed: {
		token() {
			return store.state.token;
		},
	},
	watch: {
		token(newVal) {
			console.log({ newVal });
			if (newVal !== null) this.navigation.navigate("Home");
		},
	},
	methods: {
		loginAsGuest() {
			if (store.dispatch("LOGIN")) this.navigation.navigate("Home");
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
