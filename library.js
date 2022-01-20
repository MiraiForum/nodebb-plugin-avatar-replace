'use strict';

const nconf = require.main.require('nconf');
const winston = require.main.require('winston');
const controllers = require('./lib/controllers');
const  settings = require.main.require("./src/meta/settings")

const routeHelpers = require.main.require('./src/routes/helpers');

const plugin = {};

let settingData = {};

plugin.init = async (params) => {
		const {
				router,
				middleware/* , controllers */
		} = params;

		/**
		 * We create two routes for every view. One API call, and the actual route itself.
		 * Use the `setupPageRoute` helper and NodeBB will take care of everything for you.
		 *
		 * Other helpers include `setupAdminPageRoute` and `setupAPIRoute`
		 * */
		settingData = await settings.get("avatar-replace");
		//console.log(settingData);
		routeHelpers.setupAdminPageRoute(router, '/admin/plugins/avatar-replace-admin', middleware, [], controllers.renderAdminPage);
};


plugin.addAdminNavigation = (header) => {
		header.plugins.push({
				route: '/plugins/avatar-replace-admin',
				icon: 'fa-tint',
				name: 'AvatarReplace',
		});

		return header;
};

plugin.userGetFields = async (data) => {
		if (settingData["replace-switch"] === "on"){
				data.users.forEach((obj) =>{
						if (obj.picture && !obj.picture.startsWith("/assets")){
								obj.picture = ""
						}
				})
		}
		return data;
};

module.exports = plugin;
