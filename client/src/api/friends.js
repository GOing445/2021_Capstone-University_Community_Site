import { instance } from "./index";

// 친구 목록 보기
function fetchFriendsList() {
  return instance.get(`friends/list`);
}

// 친구추가 수락
function acceptFriend(user_id) {
  return instance.put(`friends/${user_id}`);
}

// 친구추가 요청
function requestFriend(user_name, inv_code) {
  return instance.post(`friends/${user_name}/${inv_code}`);
}

// 친구 삭제
function deleteFriend(user_id) {
  return instance.delete(`friends/${user_id}`);
}

// 대기중인 친구 목록 보기
function waitingFriends() {
  return instance.get(`friends/invite`);
}

// 친구 시간표 받기
function fetchFriendTimetable(id) {
  return instance.get(`timetable/${id}`);
}

export {
  fetchFriendsList,
  acceptFriend,
  requestFriend,
  deleteFriend,
  waitingFriends,
  fetchFriendTimetable,
};
