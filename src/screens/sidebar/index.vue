<template>
	<nb-container>
		<nb-content class="sidebar-content-wrapper" :bounces="false">
			<image
				:source="drawerCover"
				class="drawer-cover"
				:style="stylesObj.drawerCoverObj"
			/>
			<nb-h2 class="drawer-image" :style="stylesObj.drawerImageObj"
				>JUDGE'EM</nb-h2
			>
			<nb-list>
				<nb-list-item
					v-if="isLogged"
					button
					noBorder
					:onPress="() => logout()"
				>
					<nb-left>
						<nb-icon
							active
							name="key"
							:style="{ color: '#777', fontSize: 26, width: 30 }"
						/>
						<nb-text> Logout </nb-text>
					</nb-left>
				</nb-list-item>
			</nb-list>
		</nb-content>
	</nb-container>
</template>

<script>
import { Dimensions, Platform } from "react-native";
import drawerCover from "../../../assets/drawer-cover.png";
import drawerImage from "../../../assets/logo-kitchen-sink.png";
import store from "../../store";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
export default {
	props: {
		navigation: {
			type: Object,
		},
	},
	data() {
		return {
			drawerCover,
			drawerImage,
			stylesObj: {
				drawerCoverObj: {
					height: deviceHeight / 3.5,
				},
				drawerImageObj: {
					left:
						Platform.OS === "android"
							? deviceWidth / 10
							: deviceWidth / 9,
					top:
						Platform.OS === "android"
							? deviceHeight / 13
							: deviceHeight / 12,
				},
				badgeText: {
					fontSize: Platform.OS === "android" ? 11 : 13,
					marginTop: Platform.OS === "android" ? -3 : 0,
					fontWeight: "400",
				},
			},
		};
	},
	computed: {
		isLogged: () => !!store.state.token,
	},
	methods: {
		handleListItemClick(dataObj) {
			this.navigation.navigate(dataObj.route);
		},
		logout() {
			store.dispatch("DESTROY_SESSION");
			this.navigation.navigate("Login");
		},
	},
};
</script>

<style>
.sidebar-content-wrapper {
	flex: 1;
	background-color: #fff;
}
.drawer-cover {
	flex: 1;
	align-self: stretch;
	position: relative;
	margin-bottom: 10;
}
.drawer-image {
	align-self: center;
	position: absolute;
	color: white;
	height: 75;
	width: 210;
}
.list-item-badge-container {
	border-radius: 3;
	height: 25;
	width: 72;
}
.list-item-badge-text {
	/* font-weight: 400; // not-working  */
	/* font-weight: bold; // working */
	text-align: center;
}
</style>
