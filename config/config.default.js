'use strict';
module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1675845341159_3823';
  config.jwt = {
    secret: 'aksdjakshka129u3b',
  };
  config.mongoose = {
    client: {
      url: 'mongodb://localhost:27017/system',
      options: {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      },
    },
  };

  config.email = {
    host: 'smtp.qq.com',
    name: '1602673948@qq.com',
    password: 'zazzvivbyyrdgade',
  };
  config.security = {
    csrf: {
      enable: false,
    },
  };
  return {
    ...config,
  };
};
