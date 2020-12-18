<template>
	<nb-container>
		<nb-container :style="{ backgroundColor: '#fff' }">
			<nb-header>
				<nb-body>
					<nb-title> JOIN TO ROOM </nb-title>
				</nb-body>
			</nb-header>
			<nb-container>
				<nb-grid>
					<nb-row></nb-row>
					<nb-row
						:size="1"
						:style="{
							justifyContent: 'center',
							alignItems: 'flex-end',
						}"
						><nb-col>
							<nb-row
								:style="{
									justifyContent: 'center',
									alignItems: 'flex-end',
								}"
							>
								<nb-h3>Type code to room and</nb-h3>
							</nb-row>
							<nb-row
								:style="{
									justifyContent: 'center',
									alignItems: 'flex-start',
								}"
							>
								<nb-h2 :style="{ fontWeight: 'bold' }"
									>JOIN TO YOUR FRIENDS</nb-h2
								>
							</nb-row>
						</nb-col>
					</nb-row>
					<nb-row :size="1">
						<nb-col
							><nb-form
								:style="{ paddingLeft: 30, paddingRight: 30 }"
							>
								<nb-item
									:error="!valid"
									rounded
									:style="{ marginBottom: 10 }"
								>
									<nb-icon name="key" />
									<nb-input
										placeholder="Code"
										v-model="code"
										auto-capitalize="none"
									/>
								</nb-item>
								<nb-item :error="!valid" rounded>
									<nb-icon name="star" />
									<nb-input
										placeholder="Nickname"
										v-model="nickname"
										auto-capitalize="none"
									/>
								</nb-item> </nb-form
						></nb-col>
					</nb-row>
					<nb-row :size="1">
						<nb-col :style="{ alignItems: 'flex-start' }">
							<nb-button
								block
								:on-press="join"
								rounded
								:style="{
									marginLeft: 30,
									marginRight: 30,
									marginTop: 30,
								}"
							>
								<nb-text>Join </nb-text>
							</nb-button>
						</nb-col>
					</nb-row>
					<nb-row></nb-row>
				</nb-grid>
			</nb-container>
		</nb-container>
	</nb-container>
</template>

<script>
import { Toast } from "native-base";
import store from "../../store";

export default {
	props: {
		navigation: {
			type: Object,
		},
	},
	computed: {
		logging_in() {
			return store.state.logging_in;
		},
	},
	data() {
		return {
			nickname: "",
			code: "",
			valid: true,
		};
	},
	created() {
		store.dispatch("START_CONNECTION");
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
