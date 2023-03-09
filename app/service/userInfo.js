'use strict';
const Service = require('egg').Service;
class userInfoService extends Service {
  // 根据用户名和用户类型查找用户详细信息
  async findDetail(params) {
    const { ctx } = this;
    try {
      const res = await ctx.model.UserInfo.findOne({ stuNo: params.username });
      return Promise.resolve(res);
    } catch (error) {
      console.log(error);
      return {
        code: '9999',
        data: null,
        msg: '查询个人信息失败',
      };
    }
  }
}

module.exports = userInfoService;
