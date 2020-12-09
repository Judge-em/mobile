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
						<nb-button block :style="{ margin: 15, marginTop: 10 }">
							<nb-text>Log in as Guest</nb-text>
						</nb-button>
						<nb-button
							:style="stylesObj.btnContainer"
							:onPress="handleLetGoBtnPress"
						>
							<nb-text> Lets Go!</nb-text>
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
import launchscreenLogo from "../../../assets/logo-kitchen-sink.png";
import axios from "axios";

export default {
	props: {
		navigation: {
			type: Object,
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
				logoStyle: {
					left: Platform.OS === "android" ? 40 : 50,
					top: Platform.OS === "android" ? 35 : 60,
				},
				btnContainer: {
					backgroundColor: "#6faf98",
					alignSelf: "center",
				},
			},
			somevar: "",
		};
	},
	mounted() {
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
		handleLetGoBtnPress() {
			this.navigation.openDrawer();
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
