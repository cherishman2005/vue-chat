<template>
  <div class="dashboard-container">
    <h2 style="text-align:left;">聊天室调测系统（调用聊天室js_sdk，提供调测接口）</h2>

    <!-- 公共参数 -->
    <el-row type="flex">
      <el-col :span="24"  style="height:30px;text-align:left;" >
        <el-form :inline="true" :model="filters" size="small">
          <el-form-item label="appid">
            <el-input v-model="appid" disabled></el-input>
          </el-form-item>
          <el-form-item label="uid">
            <el-input v-model="uid" disabled></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="onGetInstance" style="border-radius: 4px">GetInstance</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <p class="text-unit">加入聊天室</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height:45px;text-align:left;" >
        <el-form :inline="true" :model="filters" size="small">
          <el-form-item label="roomid">
            <el-input v-model="JoinChatRoomParams.roomid"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="onJoinChatRoom" style="border-radius: 4px">JoinChatRoom</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <p class="text-unit">离开聊天室</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true" :model="filters" size="small">
          <el-form-item class="search">
            <el-button type="primary"  @click="onLeaveChatRoom" style="border-radius: 4px">LeaveChatRoom</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <p class="text-unit">创建聊天室</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true" :model="filters" size="small">
          <el-form-item class="search">
            <el-button type="primary"  @click="onCreateChatRoom" style="border-radius: 4px">CreateChatRoom</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <p class="text-unit">更新聊天室信息</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true" :model="filters" size="small">
          <el-form-item class="search">
            <el-button type="primary"  @click="onUpdateChatRoomInfo" style="border-radius: 4px">UpdateChatRoomInfo</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <p class="text-unit">删除频道</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true" :model="filters" size="small">
          <el-form-item class="search">
            <el-button type="primary"  @click="onDismissChatRoom" style="border-radius: 4px">DismissChatRoom</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <p class="text-unit">剔除用户</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true" :model="filters" size="small">
          <el-form-item label="uid">
            <el-input v-model="KickOffUserParams.uid"></el-input>
          </el-form-item>
          <el-form-item label="secs">
            <el-input v-model="KickOffUserParams.secs"></el-input>
          </el-form-item>
          <el-form-item label="reason">
            <el-input v-model="KickOffUserParams.reason"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="onKickOffUser" style="border-radius: 4px">KickOffUser</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <p class="text-unit">客户端给群组推送消息</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true" :model="filters" size="small">
          <el-form-item label="content">
            <el-input v-model="SendGroupBcParams.content"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="onSendGroupBc" style="border-radius: 4px">SendGroupBc</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <p class="text-unit">A给B发送消息</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true" :model="filters" size="small">
          <el-form-item label="content">
            <el-input v-model="SendSingleUserDataParams.content"></el-input>
          </el-form-item>
          <el-form-item label="receiver">
            <el-input v-model="SendSingleUserDataParams.receiver"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="onSendSingleUserData" style="border-radius: 4px">SendSingleUserData</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <p class="text-unit">客户端发送公屏</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true" :model="filters" size="small">
          <el-form-item label="chat">
            <el-input v-model="SendTextChatParams.chat"></el-input>
          </el-form-item>
         <el-form-item class="search">
            <el-button type="primary"  @click="onSendTextChat" style="border-radius: 4px">SendTextChat</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <p class="text-unit">获取聊天室信息</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true" :model="filters" size="small">
          <el-form-item class="search">
            <el-button type="primary"  @click="onGetChatRoomInfo" style="border-radius: 4px">GetChatRoomInfo</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <p class="text-unit">获取聊天室所有管理员</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true" :model="filters" size="small">
          <el-form-item label="roler">
            <el-input v-model="GetChatRoomManagerParams.roler"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="onGetChatRoomManager" style="border-radius: 4px">GetChatRoomManager</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <p class="text-unit">获取聊天室用户数</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true" :model="filters" size="small">
          <el-form-item class="search">
            <el-button type="primary"  @click="onGetUserCount" style="border-radius: 4px">GetUserCount</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <p class="text-unit">获取聊天室用户列表</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true" :model="filters" size="small">
         <el-form-item label="num">
            <el-input v-model="GetUserListParams.num"></el-input>
          </el-form-item>
          <el-form-item label="pos">
            <el-input v-model="GetUserListParams.pos"></el-input>
          </el-form-item>
          <el-form-item class="search">
            <el-button type="primary"  @click="onGetUserList" style="border-radius: 4px">GetUserList</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <!--
    <p class="text-unit">消息接收显示</p>
    <el-row type="flex" class="row-bg">
      <el-col :span="24"  style="height: 45px;text-align:left;" >
        <el-form :inline="true" :model="filters" size="small">
          <el-form-item label="接收对端消息">
            <el-input v-model="display.RcvSingleUserData"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    -->

  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { APPID } from '@/global.js';
  import { getCookie, setCookie } from '@/utils/BaseUtil'
  import chatroom from '@/api/chatroom'

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

  const UID = Number(getCookie('osudb_uid'));
  const ROOMID = Number(getCookie('roomid'));
  
  export default {
    name : 'wsroute',
    data() {
      return {
        appid: APPID,
        roomid: ROOMID,
        uid: UID,
        JoinChatRoomParams: {
          roomid: ROOMID,
          joinProps: "",
        },
        LeaveChatRoomParams: {
        },
        CreateChatRoomParams: {
        },
        UpdateChatRoomInfoParams: {
        },
        DismissChatRoomParams: {
        },
        KickOffUserParams: {
          admin: UID,
          uid: 0,
          secs: 3000,
          reason: "js test KickOffUser",
        }, 
        SendGroupBcParams: {
          content: "js_sdk SendGroupBc",
        },
        SendSingleUserDataParams: {
          content: "js_sdk sendUnicast",
          receiver: 0,
        },
        SendTextChatParams: {
          chat: "js_sdk sendTextChat",
        },
        GetChatRoomInfoParams: {
        },
        GetChatRoomManagerParams: {
          roler: "owner",
        },
        GetUserCountParams: {
        },
        GetUserListParams: {
          num: 1,
          pos: 0,
        },
        display: {
          RcvSingleUserData: "",
        }
      }
    },
    computed: {
    },
    watch: {
    },
    created() {
    },
    destroyed() {
    },
    mounted() {
      this.onGetInstance();
      chatroom.setChatroomRecvCb({
        onRecvSingleUserData: onRecvSingleUserData,
        onDismissChatRoomBc: onDismissChatRoomBc,
        onUpdateChatRoomInfoBc: onUpdateChatRoomInfoBc,
        onKickOffUserBc: onKickOffUserBc,
        onRecvGroupBc: onRecvGroupBc,
        onTextChatBc: onTextChatBc,
        onUserCountBc: onUserCountBc,
        onUserOnlineChangeBc: onUserOnlineChangeBc,
        onConnectStatus: onChatRoomConnectStatus,
        onLoginStatus: onLoginStatus });
    },
    methods: {
      // ------------------ 测试接口 --------------------
      onGetInstance() {
        chatroom.GetInstance().then(res => {
          console.log("GetInstance: " + JSON.stringify(res));
        }).catch(err => {
          console.log(err);
        });
      },
      onJoinChatRoom() {
        let joinProps = new Map([
          ["H5_sdk", 'js_sdk']
        ]);
        
        let params = { joinProps }
        chatroom.JoinChatRoom(params).then((res) => {
          console.log("JoinChatRoom Res: " + JSON.stringify(res));
        }).catch((err) => {
          console.log(err)
        })

        setCookie("roomid", this.JoinChatRoomParams.roomid);
      },
      onLeaveChatRoom() {
        chatroom.LeaveChatRoom().then((res) => {
          console.log("LeaveChatRoom Res: " + JSON.stringify(res));
        }).catch((err) => {
          console.log(err)
        })
      },
      onCreateChatRoom() {
        let props = new Map([
          ["Name", "名称"],
          ["Description", "描述"],
          ["Bulletin", "公告"],
          ["Extention", "自定义"],
        ]);
        
        let params = { props };
        chatroom.CreateChatRoom(params).then((res) => {
          console.log("CreateChatRoom Res: " + JSON.stringify(res));
          let roomid = res.roomid;
          setCookie("roomid", roomid);
        }).catch((err) => {
          console.log(err)
        })
      },
      onUpdateChatRoomInfo() {
        let props = new Map([
          ["Name", "阿武"],
          ["Description", "js_sdk测试"],
          ["Bulletin", "bull"],
          ["Extention", "ex"],
        ]);
        
        let params = { props };
        chatroom.UpdateChatRoomInfo(params).then((res) => {
          console.log("UpdateChatRoomInfo Res: " + JSON.stringify(res));
        }).catch((err) => {
          console.log(err)
        })
      },
      onDismissChatRoom() {
        chatroom.DismissChatRoom().then((res) => {
          console.log("DismissChatRoom Res: " + JSON.stringify(res));
        }).catch((err) => {
          console.log(err)
        })
      },
      onKickOffUser() {
        let uid = this.KickOffUserParams.uid;
        let secs = this.KickOffUserParams.secs;
        let reason = this.KickOffUserParams.reason;

        let params = { uid, secs, reason }
        chatroom.KickOffUser(params).then((res) => {
          console.log("KickOffUser Res: " + JSON.stringify(res));
        }).catch((err) => {
          console.log(err)
        })
      },
      onSendGroupBc() {
        let content = this.SendGroupBcParams.content;

        let params = { content }
        chatroom.SendGroupBc(params).then((res) => {
          console.log("SendGroupBc Res: " + JSON.stringify(res));
        }).catch((err) => {
          console.log(err)
        })
      },
      onSendSingleUserData() {
        let content = this.SendSingleUserDataParams.content;
        let receiver = this.SendSingleUserDataParams.receiver;

        let params = { content, receiver }
        chatroom.SendSingleUserData(params).then((res) => {
          console.log("SendSingleUserData Res: " + JSON.stringify(res));
        }).catch((err) => {
          console.log(err)
        })
      },
      onSendTextChat() {
        let chat = this.SendTextChatParams.chat;
        let chatProps = new Map([
          ["Name", "名称chatProps"],
        ]);
        let extProps = new Map([
          ["Name", "名称extProps"],
        ]);
  
        let params = { chat, chatProps, extProps }
        chatroom.SendTextChat(params).then((res) => {
          console.log("SendTextChat Res: " + JSON.stringify(res));
        }).catch((err) => {
          console.log(err)
        })
      },
      onGetChatRoomInfo() {
        chatroom.GetChatRoomInfo().then((res) => {
          console.log("GetChatRoomInfo Res: " + JSON.stringify(res.toJsonObj()));
        }).catch((err) => {
          console.log(err)
        })
      },
      onGetChatRoomManager() {
        let roler = this.GetChatRoomManagerParams.roler;

        let params = { roler }
        chatroom.GetChatRoomManager(params).then((res) => {
          console.log("GetChatRoomManager Res: " + JSON.stringify(res.toJsonObj()));
        }).catch((err) => {
          console.log(err)
        })
      },
      onGetUserCount() {
        chatroom.GetUserCount().then((res) => {
          console.log("GetUserCount Res: " + JSON.stringify(res));
          return res
        }).catch((err) => {
          console.log(err)
        })
      },
      onGetUserList() {
        let num = this.GetUserListParams.num;
        let pos = this.GetUserListParams.pos;

        let params = { num, pos }
        chatroom.GetUserList(params).then((res) => {
          console.log("GetUserList Res: " + JSON.stringify(res));
        }).catch((err) => {
          console.log(err)
        })
      },
    }
  }
</script>

<style lang='less'>
  .dashboard {
    &-container {
      margin: 30px;
      display: flex;
      justify-content: center;
      align-items: left;
      flex-direction: column;
      //height: 300px;
    }
    &-text {
      font-size: 30px;
      line-height: 40px;
    }
  }

  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
 .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .text-unit {
    //margin: 10px 25px;
    text-align: left;
    //white-space: pre;
  }
</style>