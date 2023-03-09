'use strict';
const Service = require('egg').Service;
class UserService extends Service {
  // 查找用户
  async find(params) {
    const { ctx } = this;
    try {
      const results = await ctx.model.User.findOne({ user: params.username });
      return Promise.resolve(results);
    } catch (err) {
      return {
        code: '9999',
        msg: JSON.stringify(err),
      };
    }
  }
  // 注册用户
  async create(params) {
    const { ctx } = this;
    try {
      const results = await ctx.model.User.create(Object.assign({}, params));
      return results;
    } catch (err) {
      return {
        code: '9999',
        msg: JSON.stringify(err),
      };
    }
  }


}
module.exports = UserService;
