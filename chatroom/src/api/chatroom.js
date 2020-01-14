import { getCookie, setCookie } from '@/utils/BaseUtil'
import { APPID } from '@/global.js';

let uid = Number(getCookie('osudb_uid'));
let token = getCookie("osudb_c");
let roomid = Number(getCookie('roomid'));

// 1. 初始化Hummer
const hummer = new Hummer.Hummer({ appid: APPID, 
                            uid: uid,
                            token: token,
                            area: 'CN',  // 'CN'表示中国区，其他表示海外
                            logLevel: 0   // 0: 默认级别log
                          });

// 日志界别亦可如下单独设置
hummer.setLogLevel(0);

// 2. 创建chatroom
const chatroom = new Hummer.ChatRoom(hummer, {  
                                      roomid: roomid,
                                      //onRecvSingleUserData: onRecvSingleUserData,
                                      onDismissChatRoomBc: onDismissChatRoomBc,
                                      onUpdateChatRoomInfoBc: onUpdateChatRoomInfoBc,
                                      onKickOffUserBc: onKickOffUserBc,
                                      onRecvGroupBc: onRecvGroupBc,
                                      onTextChatBc: onTextChatBc,
                                      onUserCountBc: onUserCountBc,
                                      onUserOnlineChangeBc: onUserOnlineChangeBc,
                                      onConnectStatus: onChatRoomConnectStatus,
                                      onLoginStatus: onLoginStatus });

// 3. 设置setChatroomRecvCb回调（可在第2步设置；如第2步设置完整，可忽略第3步）
chatroom.setChatroomRecvCb({onRecvSingleUserData: onRecvSingleUserData})


const onRecvSingleUserData = (data) => {
  console.log("接收消息RecvSingleUserData： " + JSON.stringify(data));
}

const onDismissChatRoomBc = (data) => {
  console.log("接收消息DismissChatRoomBc： " + JSON.stringify(data));
}

const onUpdateChatRoomInfoBc = (data) => {
  console.log("接收消息UpdateChatRoomInfoBc： " + JSON.stringify(data));
}

const onKickOffUserBc = (data) => {
  console.log("接收消息KickOffUserBc： " + JSON.stringify(data));
}

const onRecvGroupBc = (data) => {
  console.log("接收消息RecvGroupBc： " + JSON.stringify(data));
}

const onTextChatBc = (data) => {
  console.log("接收消息TextChatBc： " + JSON.stringify(data));
}

const onUserCountBc = (data) => {
  console.log("接收消息UserCountBc： " + JSON.stringify(data));
}

const onUserOnlineChangeBc = (data) => {
  console.log("接收消息UserOnlineChangeBc： " + JSON.stringify(data));
}

const onChatRoomConnectStatus = (code) => {
  switch(code) {
    case 0:
      console.log('断线了，重连成功', code)
      break;
    case 1:
      console.log('掉线了 ', code)
      break;
    default:
      break;
  }
}

const onLoginStatus = (data) => {
  console.log("登录状态变化onLoginStatus： " + JSON.stringify(data));
}


hummer.refreshToken(uid, token).then(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
});

export default chatroom;
