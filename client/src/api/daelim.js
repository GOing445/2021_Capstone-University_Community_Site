import { instance } from "./index";

// 대림대 식단표
function daelimDietaryTable() {
  return instance.get("daerim/diet");
}

// 대림대 학사공지
function daelimNotice(pageNo) {
  return instance.get(`daerim/announce/${pageNo}`);
}

export { daelimDietaryTable, daelimNotice };
