<template>
	<nb-container>
		<status-bar :barStyle="'light-content'"></status-bar>
		<nb-container :style="{ backgroundColor: '#fff' }">
			<nb-header>
				<nb-body>
					<nb-title> RANKING </nb-title>
				</nb-body>
			</nb-header>
			<nb-content padder>
				<nb-form>
					<nb-item v-for="(item, index) in ranking" :key="index">
						<nb-grid>
							<nb-col
								><nb-text>{{ item.name }}</nb-text></nb-col
							>
							<nb-col></nb-col>
							<nb-col>
								<nb-grid
									><nb-col
										><nb-text>{{
											item.rating
										}}</nb-text></nb-col
									>
									<nb-col
										><nb-icon
											v-if="index === 0"
											type="FontAwesome"
											name="trophy"
											:style="{
												color: '#999',
											}" /></nb-col
								></nb-grid>
							</nb-col>
						</nb-grid>
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
	created() {
		// this.ranking = [
		// 	{
		// 		name: "sdfgdfg",
		// 		rating: 2,
		// 	},
		// ];
		this.parsedData = JSON.parse(this.summary);
		this.parsedData.Items.forEach((item) => {
			let totalScore = 0;
			item.Ratings.forEach((rating) => {
				totalScore += rating.TotalScore;
			});
			this.ranking.push({
				rating: totalScore / item.Ratings.length,
				name: item.Name,
			});
		});

		this.ranking.sort((a, b) => b.rating - a.rating);
	},
	computed: {
		summary: () => store.state.summary.result,
	},
	data() {
		return {
			parsedData: {},
			ranking: [],
		};
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
