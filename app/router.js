'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/login', controller.user.login);
  router.post('/init', controller.home.index);
  router.post('/modifyPassword', controller.home.modifyPassword);
  router.post('/modifyCode', controller.home.modifyCode);
};
