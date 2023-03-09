'use strict';

const Service = require('egg').Service;

class modifyUser extends Service {
  async modify(params) {
    const { ctx } = this;
    try {
      const res = await ctx.model.User.updateOne({ username: params.username }, { password: params.password });
      return res;
    } catch (error) {
      return {
        code: '9999',
        msg: '修改密码失败',
      };
    }
  }
}

module.exports = modifyUser;
