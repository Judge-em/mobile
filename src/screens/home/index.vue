<template>
	<nb-container>
		<status-bar :barStyle="'light-content'"></status-bar>
		<image-background :source="launchScreenBg" class="imageContainer">
			<nb-container v-if="loaded" :style="{ backgroundColor: '#fff' }">
				<nb-header>
					<nb-body>
						<nb-title> JOIN TO ROOM </nb-title>
					</nb-body>
				</nb-header>
				<nb-content padder>
					<nb-form>
						<nb-item :error="!valid">
							<nb-input
								placeholder="Code"
								v-model="code"
								auto-capitalize="none"
							/>
						</nb-item>
						<nb-item :error="!valid">
							<nb-input
								placeholder="Nickname"
								v-model="nickname"
								auto-capitalize="none"
							/>
						</nb-item>
					</nb-form>
					<view :style="{ marginTop: 10 }">
						<nb-button block :on-press="join">
							<nb-text>Join </nb-text>
						</nb-button>
					</view>
				</nb-content>
			</nb-container>
			<nb-spinner v-if="!loaded"></nb-spinner>
		</image-background>
	</nb-container>
</template>

<script>
import { Dimensions, Platform } from "react-native";
import launchScreenBg from "../../../assets/launchscreen-bg.png";
import { Toast } from "native-base";
import store from "../../store";
import launchscreenLogo from "../../../assets/logo-kitchen-sink.png";

export default {
	props: {
		navigation: {
			type: Object,
		},

		loaded: false,
	},
	computed: {
		logging_in() {
			return store.state.logging_in;
		},
	},
	data() {
		return {
			launchScreenBg,
			launchscreenLogo,
			stylesObj: {
				logoContainerStyle: {
					marginTop: Dimensions.get("window").height / 8,
				},
				btnContainer: {
					backgroundColor: "#6faf98",
					alignSelf: "center",
				},
			},
			nickname: "",
			code: "",
			valid: true,
		};
	},
	created() {
		store.dispatch("START_CONNECTION");
	},
	mounted() {
		this.valid = true;
		this.loaded = true;
	},
	methods: {
		join() {
			// this.valid = true;
			if (this.code && this.nickname) {
				store.dispatch("JOIN_TO_ROOM", {
					code: this.code,
					nickname: this.nickname,
				});
				store.dispatch("SET_GAME_CONFIG", {
					code: this.code,
					nickname: this.nickname,
					lastItemId: null,
				});
				this.navigation.navigate("Lobby");
			} else {
				this.valid = false;
				Toast.show({
					text: "Form filled out incorrectly",
					type: "danger",
					duration: 3000,
				});
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
