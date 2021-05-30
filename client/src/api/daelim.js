import { instance } from "./index";

// 대림대 식단표
function daelimDietaryTable() {
  return instance.get("daelim/diet");
}

// 대림대 학사공지
function daelimNotice(pageNo) {
  return instance.get(`daelim/announce/${pageNo}`);
}

export { daelimDietaryTable, daelimNotice };
