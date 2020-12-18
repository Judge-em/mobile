<template>
	<nb-container>
		<status-bar :barStyle="'light-content'"></status-bar>
		<image-background :source="launchScreenBg" class="imageContainer">
			<nb-grid>
				<nb-row
					:size="2"
					:style="{
						justifyContent: 'center',
						alignItems: 'flex-end',
					}"
					><nb-h2
						class="white"
						:style="{ color: 'white', fontWeight: 'bold' }"
						>LOGIN AS</nb-h2
					></nb-row
				>
				<nb-row :size="3" :style="{ display: 'flex' }">
					<nb-col
						:style="{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-around',
							alignItems: 'space-around',
						}"
					>
						<nb-button
							:onPress="loginAsGuest"
							rounded
							large
							:style="{
								margin: 15,
								backgroundColor: 'rgba(255,255,255,0.8)',
								marginTop: 10,
								height: 150,
								width: 150,
								borderRadius: 300,

								justifyContent: 'center',
							}"
						>
							<nb-text
								class="bold"
								:style="{
									color: '#371c7a',
								}"
								>Guest</nb-text
							>
						</nb-button>
					</nb-col>
				</nb-row>
				<nb-row :size="2" :style="{ display: 'flex' }">
					<nb-col
						:style="{
							flexDirection: 'row',
							justifyContent: 'space-around',
						}"
						><nb-grid>
							<nb-row
								:style="{
									justifyContent: 'center',
									marginBottom: -100,
								}"
							>
								<nb-h1
									class="white bold"
									:style="{
										paddingTop: 20,
										fontSize: 40,
									}"
									>JUDGE'EM</nb-h1
								>
							</nb-row>
							<nb-row :style="{ justifyContent: 'center' }">
								<nb-text class="white"
									>judge things with your friends</nb-text
								>
							</nb-row>
						</nb-grid>
					</nb-col>
				</nb-row>
			</nb-grid>
		</image-background>
	</nb-container>
</template>

<script>
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
	computed: {
		token() {
			return store.state.token;
		},
	},
	watch: {
		token(newVal) {
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
.white {
	color: white;
}
.bold {
	font-weight: bold;
}
</style>
