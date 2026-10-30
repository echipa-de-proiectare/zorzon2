'use strict';

/**
 * jewel service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::jewel.jewel');
