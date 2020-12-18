<template>
	<nb-container>
		<image-background :source="launchScreenBg" class="imageContainer">
			<nb-grid>
				<nb-row
					:style="{
						justifyContent: 'center',
						alignItems: 'center',
					}"
					><nb-h2
						class="white"
						:style="{ color: 'white', fontWeight: 'bold' }"
						>RANKING</nb-h2
					></nb-row
				>
				<nb-row :size="5" :style="{ display: 'flex' }">
					<nb-col
						:style="{
							marginLeft: 20,
							marginRight: 20,
						}"
					>
						<nb-item
							v-for="(item, index) in ranking"
							:key="index"
							:style="{
								backgroundColor: 'white',
								height: 40,
								marginBottom: 10,
								borderRadius: 15,
							}"
						>
							<nb-grid>
								<nb-col
									><nb-text :style="{ paddingLeft: 10 }">{{
										item.name
									}}</nb-text></nb-col
								>
								<nb-col></nb-col>
								<nb-col>
									<nb-grid
										><nb-col
											><nb-text>{{
												item.rating.toFixed(2)
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

						<nb-button rounded block :onPress="exitRoom">
							<nb-text>Exit Room </nb-text>
						</nb-button>
					</nb-col>
				</nb-row>
			</nb-grid>
		</image-background>
	</nb-container>
</template>

<script>
import launchScreenBg from "../../../assets/launchscreen-bg.png";

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
			launchScreenBg,
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
</style>
