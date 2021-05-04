import { instance } from "./index";

// 테스트용 시간표 불러오기
function fetchTestTimeTable() {
  return instance.get("/api/test1");
}

// 내 시간표 불러오기
function fetchMyTimeTable() {
  return instance.get("/timetable");
}

// 내 수업 추가하기
function PostMyClass(classData) {
  return instance.post("/schedule", classData);
}

// 내 수업 지우기
function DeleteMyClass(id) {
  return instance.delete(`/schedule/${id}`);
}

export { fetchTestTimeTable, fetchMyTimeTable, PostMyClass, DeleteMyClass };
