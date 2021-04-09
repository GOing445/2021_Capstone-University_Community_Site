import { instance } from "./index";

// 내 시간표 불러오기
function fetchMyTimeTable() {
  return instance.get("/api/test1");
}

export { fetchMyTimeTable };
