
const baseUrl = process.env.REACT_APP_BACKENDURL;
export const localData = process.env.REACT_APP_LOCALDATA;

export const Constants = {
   baseUrl,
   createRoom: baseUrl + "/create-room",
   publicRooms: baseUrl + "/public-rooms",
   joinRoom: baseUrl + "/join-room",
   createMatch: baseUrl + "/create-match",
   joinMatch: baseUrl + "/join-match",
   matchResults: baseUrl + "/match-result",
}