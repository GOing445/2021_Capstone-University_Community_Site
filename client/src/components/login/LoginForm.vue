<template>
	<v-container fill-height fluid class="login_form">
		<v-row align="center" justify="center">
			<v-col align="center">
				<v-img
					:src="require('@/assets/logo.svg')"
					class="mb-8"
					contain
					height="70"
				/>
				<v-card outlined max-width="400" height="300">
					<h1 class="mt-3 login_text">로그인</h1>
					<social-button
						v-for="button in socialButtons"
						:key="button.text"
						:backgroundColor="button.backgroundColor"
						:textColor="button.textColor"
						:text="button.text"
						:img="button.img"
					/>
					<p>회원가입 | 이용약관 | 문의하기</p>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import SocialButton from '@/components/login/SocialButton';

export default {
	components: { SocialButton },
	data() {
		return {
			socialButtons: [
				{
					text: '네이버 아이디로 로그인',
					backgroundColor: '#1ec800',
					textColor: 'white--text',
					img: 'naver',
				},
				{
					text: '카카오 아이디로 로그인',
					backgroundColor: '#fee500',
					textColor: 'brown--text text--darken-4',
					img: 'kakao',
				},
				{
					text: '구글 아이디로 로그인',
					backgroundColor: '#dc4335',
					textColor: 'white--text',
					img: 'google',
				},
			],
		};
	},
};
</script>

<style scoped>
.login_form {
	background-color: #eeeeee;
}

.login_text {
	color: #404040;
}
</style>
