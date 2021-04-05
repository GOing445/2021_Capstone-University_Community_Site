<template>
	<div>
		<v-subheader>시간표 추가</v-subheader>
		<v-card-text>
			<v-form ref="form" v-model="valid" lazy-validation>
				<v-container>
					<v-row>
						<v-text-field
							v-model="title"
							:rules="titleRules"
							:counter="10"
							label="과목명(필수)"
							single-line
							filled
							required
							dense
						></v-text-field>
					</v-row>
					<v-row>
						<v-chip-group mandatory active-class="primary--text">
							<v-chip v-for="day in weekday" :key="day">
								{{ day }}
							</v-chip>
						</v-chip-group>
					</v-row>
					<v-row class="mt-5">
						<v-textarea
							filled
							label="메모"
							:value="content"
							:counter="500"
							:rules="contentRules"
							height="150"
							no-resize
							required
						></v-textarea>
					</v-row>
				</v-container>
			</v-form>
		</v-card-text>
		<v-spacer></v-spacer>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn color="red" dark @click="$router.go(-1)">
				취소
			</v-btn>
			<v-btn color="green" dark @click="sendMessage">
				등록
			</v-btn>
		</v-card-actions>
	</div>
</template>

<script>
export default {
	data() {
		return {
			weekday: ['월', '화', '수', '목', '금'],
		};
	},
};
</script>

<style></style>
