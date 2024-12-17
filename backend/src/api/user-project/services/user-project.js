'use strict';

/**
 * user-project service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::user-project.user-project');
