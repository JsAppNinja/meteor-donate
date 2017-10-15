this.UserSettingsInstagramsController = RouteController.extend({
	template: "UserSettings",
	

	yieldTemplates: {
		'UserSettingsInstagrams': { to: 'UserSettingsSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("UserSettings"); this.render("loading", { to: "UserSettingsSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("instagrams")
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		

		var data = {
			params: this.params || {},
		};
		

		return data;
	},

	onAfterAction: function() {
		
	}
});