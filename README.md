# vue-chatroom
采用全球账号登录的chatroom-demo

### chatroom-demo配置

nginx.conf
```javascript
        location /chatroom {
            try_files $uri $uri/ /chatroom/index.html;
            default_type text/html;
            alias /home/zhangbiwu/vue_projects/chatroom/dist;
        }
```