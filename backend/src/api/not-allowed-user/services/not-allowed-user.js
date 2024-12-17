'use strict';

/**
 * not-allowed-user service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::not-allowed-user.not-allowed-user');
