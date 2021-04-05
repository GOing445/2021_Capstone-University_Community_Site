/*
 * 날짜포맷 yyyy-MM-dd 변환
 */
function formatDate(date) {
	let year = date.getFullYear();
	let month = 1 + date.getMonth();
	month = month >= 10 ? month : '0' + month;
	let day = date.getDate();
	day = day >= 10 ? day : '0' + day;
	return year + '-' + month + '-' + day;
}

export { formatDate };
