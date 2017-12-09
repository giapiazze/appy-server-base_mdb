'use strict';

const Confidence = require('confidence');
const Dotenv = require('dotenv');

Dotenv.config({ silent: true });

const criteria = {
  env: process.env.NODE_ENV
};

const constants = {
  USER_ROLES: {
    USER: 'User',
    ADMIN: 'Admin',
    SUPER_ADMIN: 'SuperAdmin',
  },
  PERMISSION_STATES: {
    INCLUDED: 'Included',
    EXCLUDED: 'Excluded',
    FORBIDDEN: 'Forbidden',
  },
  AUTH_STRATEGIES: {
    TOKEN: 'standard-jwt',
    SESSION: 'jwt-with-session',
    REFRESH: 'jwt-with-session-and-refresh-token'
  },
  PORT: 8000,
  APP_TITLE: 'appy Server Base'
};

const config = {
  $meta: 'This file configures the appy API.',
  projectName: constants.APP_TITLE,
  websiteName: 'Server Base',
  port: {
    $filter: 'env',
    production: process.env.PORT,
    $default: constants.PORT
  },
  constants: constants,
  expirationPeriod: {
    short: '10m',
    medium: '30m',
    long: '4h'
  },
  authAttempts: {
    forIp: 50,
    forIpAndUser: 7
  },
  lockOutPeriod: 30, //in units of minutes
  jwtSecret: {
    $filter: 'env',
    production: process.env.JWT_SECRET,
    $default: 'aStrongJwtSecret-#mgtfYK@QuRV8VMM7T>WfN4;^fMVr)y'
  },
  nodemailer: {
    $filter: 'env',
    local: {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'giapiazze@gmail.com',
        pass: process.env.SMTP_PASSWORD
      }
    },
    production: {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'giapiazze@gmail.com',
        pass: process.env.SMTP_PASSWORD
      }
    }
  },
  /**
   * defaultEmail:
   * If set to null, outgoing emails are sent to their actual address,
   * otherwise outgoing emails are sent to the defaultEmail
   */
   defaultEmail: {
    $filter: 'env',
    local: 'giapiazze@gmail.com',
    development: 'giapiazze@gmail.com',
    production: 'giapiazze@gmail.com'
  },
  system: {
    fromAddress: {
      name: 'appy',
      address: 'giapiazze@gmail.com'
    },
    toAddress: {
      name: 'appy',
      address: 'giapiazze@gmail.com'
    }
  },
  clientURL: {
    $filter: 'env',
    local: 'http://localhost:' + constants.PORT,
    production: 'http://localhost:' + constants.PORT,
    $default: 'http://localhost:' + constants.PORT
  },
  restHapiConfig: {
    appTitle: constants.APP_TITLE,
    mongo: {
      URI: {
        $filter: 'env',
        local: 'mongodb://userAppy:WebStorm@ds133476.mlab.com:33476/appy',
        $default: 'mongodb://userAppy:WebStorm@ds133476.mlab.com:33476/appy'
      }
    },
    cors: {
      additionalHeaders: ['X-Auth-Header', 'X-Refresh-Token'],
      additionalExposedHeaders: ['X-Auth-Header', 'X-Refresh-Token']
    },
    absoluteModelPath: true,
    modelPath: __dirname + '/server/models',
    absoluteApiPath: true,
    apiPath: __dirname + '/server/api',
    authStrategy: {
      $filter: 'env',
      local: constants.AUTH_STRATEGIES.REFRESH,
      $default: constants.AUTH_STRATEGIES.REFRESH
    },
    enableQueryValidation: {
      $filter: 'env',
      local: true,
      $default: true
    },
    enablePayloadValidation: {
      $filter: 'env',
      local: true,
      $default: true
    },
    enableResponseValidation: {
      $filter: 'env',
      local: true,
      $default: true
    },
    enableTextSearch: {
      $filter: 'env',
      local: true,
      $default: true
    },
    enableSoftDelete: {
      $filter: 'env',
      local: true,
      $default: true
    },
    generateScopes: {
      $filter: 'env',
      local: true,
      $default: true
    },
    logScopes: {
      $filter: 'env',
      local: true,
      $default: true
    },
    loglevel: {
      $filter: 'env',
      local: "DEBUG",
      $default: "ERROR"
    }

  }
};


const store = new Confidence.Store(config);


exports.get = function (key) {

  return store.get(key, criteria);
};


exports.meta = function (key) {

  return store.meta(key, criteria);
};