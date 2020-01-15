<template>
  <div class="dashboard-container">
    <iframe src="javascript:void(0);" ref="regIframe"  frameborder="0" class="app-login"  style="width: 100%;height: 302px;" scrolling=auto></iframe>
    <!--<iframe v-if="reportType==0" :src="currentSrc" frameborder="0" class="app-login"  style="width:100%;height:302px;" scrolling="no"></iframe>-->
  </div>
</template>

<script>
  import { APPID, redirectURL } from '@/global.js';
  import { getBeforeLoginUrl, removeBeforeLoginUrl } from '@/utils/auth'
  import { getCookie } from '@/utils/BaseUtil'

  const getDomain = (herf) => {
    let domains = ['yy.com', 'sunclouds.com'];
    for (let k of domains) {
      let len = herf.length;
      let sub = herf.substr(len- k.length, k.length);
      if (k === sub) {
        return { code: 0, domain: k }
      }
    }
    return { code: -1, msg: 'not match' }
  }

  export default {
    name: 'author',
    data() {
        return {
          reportType: 0,
          regIframe: "",
          currentSrc: "",
          interval: 0,
        }
    },
    created() {
      window.onDataChange = (res, newuser, auto) => {
        if (res) {
        }
      }

      console.log('hostname=' + window.location.hostname);
    },
    mounted () {
      let uid = getCookie('osudb_uid');
      console.log("author uid=" + uid);
      if (uid) {
          this.reportType = 1;
          let redirect = getBeforeLoginUrl() || '/';
          this.$router.push({ path: redirect });
          removeBeforeLoginUrl();
      } else {
        this.reportType = 0;
        this.setIframe();

        this.interval = setInterval(() => {
          let uid = getCookie('osudb_uid');
          //console.log('console after 1 second, uid=' + uid);
          if (uid) {
            clearInterval(this.interval);
            this.$router.push({ path: redirectURL });
          }
        }, 1000);
      }
    },
    beforeDestroy() {
      clearInterval(this.interval);
    },
    methods: {
      setIframe() {
        const appid = APPID;
        let redirect_uri =  window.location.origin + '/chatroom-dev' + redirectURL;
        //console.log("redirect_uri: " + redirect_uri);
        redirect_uri = encodeURIComponent(`${redirect_uri}`);
        //this.currentSrc = window.location.protocol + '//os-lgn.yy.com/lgn/login/authorize.do?appid=' + appid + '&errPos=inputTop&callback=' + redirect_uri
        //this.currentSrc = window.location.protocol + '//os-lgn.yy.com/lgn/login/authorize.do?appid=' + appid + '&errPos=inputTop&callback=js'
        //let redirect_uri = getBeforeLoginUrl() || redirectURL;

        const { domain } = getDomain(window.location.hostname);
        this.$refs.regIframe.src = window.location.protocol + '//os-lgn.' + domain + '/lgn/login/authorize.do?appid=' + appid + '&errPos=inputTop&callback=' + redirect_uri;
        console.log("src:" + this.$refs.regIframe.src);
        this.$router.push({ path: redirectURL });
        removeBeforeLoginUrl();
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
