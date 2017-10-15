var pageSession = new ReactiveDict();

pageSession.set("errorMessage", "");
pageSession.set("infoMessage", "");

Template.UserSettingsInstagrams.onCreated(function() {
	pageSession.set("errorMessage", "");	
	pageSession.set("infoMessage", "");	
	
});

Template.UserSettingsInstagrams.onDestroyed(function() {
	
});

Template.UserSettingsInstagrams.onRendered(function() {

	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});

});

Template.UserSettingsInstagrams.events({

	'click .edit-instagram-account': function(e) {
		e.preventDefault();
		let this_id = $(e.target).parents('.tab-pane').attr('data-id');
		Router.go( "user_settings.edit_instagram", mergeObjects(Router.currentRouteParams(), {instaId: this_id}) );
	},

	'click .delete-instagram-account': function(e) {
		e.preventDefault();

		let this_id = $(e.target).parents('.tab-pane').attr('data-id');
		let username = $(e.target).parents('.tab-pane').find('.username').text();

		bootbox.dialog({
			message: "Are you sure to delete this Instagram account: <strong>" + username + "</strong>?",
			title: "Delete Instagram account",
			animate: true,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-danger",
					callback: function() {
						Meteor.call("removeInstagram", this_id, function(err, res) {
							if(err) {
								console.log(err.message);
							}
						});
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
	},

	'click .instagram-payment': function(e) {
		let this_id = $(e.target).parents('.tab-pane').attr('data-id');
		Session.set("ig-id", this_id);
		Router.go("payment");
	}

});

Template.UserSettingsInstagrams.helpers({
	errorMessage: function() {
		return pageSession.get("errorMessage");
	},
	infoMessage: function() {
		return pageSession.get("infoMessage");
	},
	InstagramAccounts: function() {
		return Instagrams.find({belongs_to:Meteor.userId()}, {});
	}
	
});


Template.InstagramAccountSingle.helpers({
	checkedIf: function(value) {
		return value ? "checked" : ""
	},
});