'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  /** 初始化查询个人信息 */
  async index() {
    const { ctx } = this;
    const body = Object.assign({}, ctx.request.body);
    const userInfo = await ctx.service.userInfo.findDetail(body);
    try {
      const authorization = ctx.header.authorization;
      ctx.app.jwt.verify(authorization, ctx.app.config.jwt.secret);
    } catch (error) {
      ctx.status = 401;
      ctx.body = '登录过期';
      return;
    }
    if (userInfo.code === '9999') {
      ctx.body = userInfo;
      return;
    }
    ctx.body = {
      code: '0000',
      data: userInfo,
      msg: '查询个人信息成功',
    };
  }
  /** 修改密码发送邮箱验证码 */
  async modifyCode() {
    const { ctx } = this;
    const body = Object.assign({}, ctx.request.body);
    try {
      const res = await ctx.service.email.sendEmail(body);
      console.log(res)
      ctx.cookies.set('verifyCode', res, {
        expires: 60000,
      });
      ctx.body = {
        code: '0000',
        data: null,
        msg: '发送成功',
      };
    } catch (err) {
      ctx.body = {
        code: '9999',
        data: null,
        msg: '发送验证码失败',
      };
    }
  }
  /** 修改密码 */
  async modifyPassword() {
    const { ctx } = this;
    const body = Object.assign({}, ctx.request.body);
    try {
      const res = await ctx.service.email.modify(body);
      ctx.body = {
        code: '0000',
        data: res,
        msg: '密码修改成功',
      };
    } catch (error) {
      ctx.body = {
        code: '9999',
        data: null,
        msg: '密码修改失败',
      };
    }
  }
}

module.exports = HomeController;
