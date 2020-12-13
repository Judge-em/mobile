<template>
	<nb-container>
		<status-bar :barStyle="'light-content'"></status-bar>
		<nb-container :style="{ backgroundColor: '#fff' }">
			<nb-header>
				<nb-body>
					<nb-title> {{ item.name }} </nb-title>
				</nb-body>
			</nb-header>
			<nb-content padder>
				<nb-grid>
					<nb-row>
						<nb-text>{{ item.description }}</nb-text></nb-row
					>
					<nb-row
						v-for="(category, index) in categories"
						:key="index"
					>
						<nb-grid>
							<nb-row
								><nb-text>{{ category.name }}</nb-text></nb-row
							>
							<nb-row>
								<nb-button
									transparent
									v-for="star in 5"
									:key="star"
									:onPress="() => setRating(star, index)"
								>
									<nb-icon
										:type="isReached(star, index)"
										name="star"
									/>
								</nb-button>
							</nb-row>
						</nb-grid>
					</nb-row>
				</nb-grid>
				<view :style="{ marginTop: 10 }">
					<nb-text v-if="votingProgress.progress">{{
						`Voted:${votingProgress.progress}/${votingProgress.max} `
					}}</nb-text>
					<nb-button block :onPress="vote">
						<nb-text>Vote </nb-text>
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
		items: () => store.state.items,
		categories: () => store.state.categories,
		profileId: () => store.state.profileId,
		lastGameConfig: () => store.state.lastGameConfig,
		votingProgress: () => store.state.votingProgress,
		connection: () => store.state.connection,
	},
	data() {
		return {
			item: {},
			currentId: "",
			input: "",
			colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
			rating: {
				playerProfileId: "",
				itemId: "",
				categoryRatings: [{ categoryId: 0, score: 0 }],
			},
			loading: false,
		};
	},
	mounted() {
		this.currentId = this.lastGameConfig.lastItemId;
		if (this.currentId === null) this.$router.push({ name: "Home" });
		this.rating.itemId = this.currentId;
		this.rating.playerProfileId = this.profileId;
		this.rating.categoryRatings = this.categories.map((item) => {
			return { categoryId: item.id, score: 0 };
		});
	},
	methods: {
		setRating(rate, index) {
			console.log(rate, index);
			this.rating.categoryRatings[index].score = rate;
		},
		vote() {
			console.log("ttt");
			if (!this.loading) {
				this.loading = true;
				let valid = true;
				for (const rating of this.rating.categoryRatings) {
					if (rating.score === 0) valid = false;
				}
				console.log({ valid });
				if (valid) {
					this.connection.invoke(
						"AddRating",
						this.lastGameConfig.code,
						this.rating,
					);
				} else {
					Toast.show({
						text: "The rate grade should be between 0 and 5",
						type: "warning",
						duration: 3000,
					});
				}
				setTimeout(() => {
					this.loading = false;
				}, 2000);
			}
		},
		isReached(star, index) {
			console.log(index);
			if (this.rating.categoryRatings[index])
				return this.rating.categoryRatings[index].score < star
					? "Feather"
					: "FontAwesome";
			return "Feather";
		},
	},
	watch: {
		currentId(newVal) {
			this.item = this.items.find((item) => item.id === newVal);
			store.dispatch("SET_VOTING_PROGRESS", {
				maxVotes: null,
				votingCounter: null,
			});
		},
		lastGameConfig: {
			deep: true,
			handler(newVal) {
				this.currentId = newVal.lastItemId;
				this.rating.itemId = this.currentId;
				this.rating.categoryRatings.forEach(
					(category) => (category.score = 0),
				);
			},
		},
	},
	destroyed() {
		store.dispatch("END_GAME");
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
