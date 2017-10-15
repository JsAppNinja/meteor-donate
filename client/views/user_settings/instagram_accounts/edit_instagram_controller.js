this.UserSettingsEditInstagramController = RouteController.extend({
	template: "UserSettings",
	

	yieldTemplates: {
		'UserSettingsEditInstagram': { to: 'UserSettingsSubcontent'}
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("UserSettings"); this.render("loading", { to: "UserSettingsSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {

		let subs = [
			Meteor.subscribe("instagrams", this.params.instaId)
		];

		let ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {

		let data = {
			params: this.params || {},
			instagram_account: Instagrams.findOne({_id:this.params.instaId}, {})
		};

		return data;
	},

	onAfterAction: function() {
		
	}
});