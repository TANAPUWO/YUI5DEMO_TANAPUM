/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"yui5demo_tanapum/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
