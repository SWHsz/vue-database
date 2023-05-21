import { param2Obj } from '@/utils';
import Response from './response';

const userMap = {
    admin: {
      password: 'jwgl',
      roles: ['admin'],
      token: 'admin',
      introduction: '我是超级管理员',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      name: 'Super Admin'
    },
    watcher: {
      password: 'watcher',
      roles: ['watcher'],
      token: 'watcher',
      introduction: '我是游客',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      name: 'Normal Watcher'
    }
  }

export default {
    register: config => {
      console.log("register");
      console.log(config.body);
      const { username, password } = JSON.parse(config.body);
      if (userMap[username]) {
        return Response.fail("403", "该用户名已经注册");
      } else {
        return Response.success("200")
      }
    }
  }
  