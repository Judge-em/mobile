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
						<nb-item>
							<nb-input
								placeholder="Code"
								v-model="code"
								auto-capitalize="none"
							/>
						</nb-item>
						<nb-item last>
							<nb-input
								placeholder="Nickname"
								v-model="nickname"
								auto-capitalize="none"
								secure-text-entry
							/>
						</nb-item>
					</nb-form>
					<view :style="{ marginTop: 10 }">
						<nb-button block :on-press="join">
							<nb-spinner v-if="logging_in" size="small" />
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
import axios from "axios";

export default {
	props: {
		navigation: {
			type: Object,
		},
		nickname: "",
		code: "",
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
		};
	},
	created() {
		store.dispatch("START_CONNECTION");
	},
	mounted() {
		this.loaded = true;
		// let test = "";
		// axios
		// 	.post("https://judge-em-api.herokuapp.com/api/login/guest")
		// 	.then((response) => {
		// 		test = response.data.token;
		// 		console.log(response.data);
		// 	});
		// console.log(test);
		// const connection = new HubConnectionBuilder()
		// 	.withUrl(`https://judge-em-api.herokuapp.com/hubs/game`, {
		// 		accessTokenFactory: () => test,
		// 	})
		// 	.configureLogging(LogLevel.Information)
		// 	.build();
		// let startedPromise = null;
		// function start() {
		// 	startedPromise = connection.start().catch((err) => {
		// 		console.error("Failed to connect with hub", err);
		// 		return new Promise((resolve, reject) =>
		// 			setTimeout(() => start().then(resolve).catch(reject), 5000),
		// 		);
		// 	});
		// 	return startedPromise;
		// }
		// connection.onclose(() => start());
		// start();
	},
	methods: {
		join() {
			if (this.code && this.nickname) {
				store.dispatch("JOIN_TO_ROOM", {
					code: this.code,
					nickname: this.nickname,
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
