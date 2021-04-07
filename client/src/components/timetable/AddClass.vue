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
							prepend-icon="mdi-notebook-multiple"
							label="과목명(필수)"
							single-line
							required
							dense
						></v-text-field>
					</v-row>
					<v-row>
						<v-text-field
							v-model="classroom"
							:rules="classroomRules"
							:counter="10"
							prepend-icon="mdi-google-classroom"
							label="강의실"
							single-line
							dense
						></v-text-field>
					</v-row>
					<v-row>
						<v-chip-group
							mandatory
							active-class="primary--text"
							v-model="selectedDay"
						>
							<v-chip v-for="day in weekday" :key="day">
								{{ day }}
							</v-chip>
						</v-chip-group>
					</v-row>
					<v-row class="mt-5">
						<v-textarea
							v-model="memo"
							height="150"
							label="메모"
							:counter="100"
							:rules="memoRules"
							filled
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
			<v-btn color="error" dark @click="$router.go(-1)">
				취소
			</v-btn>
			<v-btn color="primary" dark @click="sendMessage">
				등록
			</v-btn>
		</v-card-actions>
	</div>
</template>

<script>
export default {
	data() {
		return {
			valid: true,
			title: '',
			classroom: '',
			weekday: ['월', '화', '수', '목', '금'],
			selectedDay: 0,
			memo: '',
			titleRules: [
				v => !!v || '과목명을 입력해주세요',
				v => (v && v.length <= 10) || '과목명은 10자 이내여야 합니다.',
			],
			classroomRules: [
				v => v.length <= 10 || '강의실 이름은 10자 이내여야 합니다.',
			],
			memoRules: [v => v.length <= 100 || '메모는 100자 이내여야 합니다.'],
		};
	},
};
</script>

<style></style>
