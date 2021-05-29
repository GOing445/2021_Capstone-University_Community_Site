import { instance } from "./index";

// 친구 신청 대기 목록 보기
function fetchWaitingFriends(id) {
  return instance.get(`friends/invite/${id}`);
}

// 친구 수락
function acceptFriend(id) {
  return instance.post(`friends/${id}`);
}

// 친구 추가 요청
function requestFriend(id) {
  return instance.post(`friends/${id}/request`);
}

// 친구 사이 확인
function checkBetweenFriends(id) {
  return instance.post(`friends/${id}`);
}

// 친구 삭제
function deleteFriend(id) {
  return instance.delete(`friends/${id}`);
}

export {
  fetchWaitingFriends,
  acceptFriend,
  requestFriend,
  checkBetweenFriends,
  deleteFriend,
};
