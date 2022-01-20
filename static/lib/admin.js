'use strict';

define('admin/plugins/avatar-replace-admin', ['settings'], function (settings) {
	var ACP = {};

	ACP.init = function () {
		settings.load('avatar-replace', $('.avatar-replace-settings'), function () {

		});
		$('#save').on('click', saveSettings);
	};

	function saveSettings() {
		settings.save('avatar-replace', $('.avatar-replace-settings'), function () {
			app.alert({
				type: 'success',
				alert_id: 'avatar-replace-saved',
				title: '设置已保存',
				message: 'Please reload your NodeBB to apply these settings',
				clickfn: function () {
					socket.emit('admin.reload');
				},
			});
		});
	}

	return ACP;
});
