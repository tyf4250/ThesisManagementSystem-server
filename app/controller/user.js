'use strict';

const Controller = require('egg').Controller;
const utility = require('utility');
class UserController extends Controller {
  // 注册
  async register() {
    const { ctx } = this;
    const body = Object.assign({}, ctx.request.body);
    // 1.调用查找服务，查询邮箱是否被注册
    const user = await ctx.service.user.find(body);
    if (user && user.email) {
      ctx.body = {
        code: 0,
        data: null,
        msg: '邮箱已被注册',
      };
      return;
    }
    body.password = utility.md5(body.password);
    // 2.邮箱不存在的话，注册账号
    const res = await ctx.service.user.create(body);
    ctx.body = {
      code: 0,
      data: res,
      msg: '注册成功',
    };
  }

  // jwt登录，返回token
  async login() {
    const { ctx, app } = this;
    const body = Object.assign({}, ctx.request.body);
    // 1.根据账号，查找账号是否存在
    const user = await ctx.service.user.find(body);
    if (user && user.password === body.password) {
      // 2.密码正确，将通过jwt插件生成token，返回给前端
      const token = app.jwt.sign(
        { username: body.username },
        app.config.jwt.secret,
        {
          expiresIn: '1h',
        }
      );
      ctx.body = {
        code: '0000',
        data: {
          token,
          username: user.user,
          userType: JSON.parse(JSON.stringify(user)).userType,
          id: user._id,
        },
        msg: '登录成功',
      };
      return;
    }
    ctx.body = {
      code: '9999',
      data: null,
      msg: '用户名或密码错误',
    };
  }
}

module.exports = UserController;
