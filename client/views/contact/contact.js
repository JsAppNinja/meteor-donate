var pageSession = new ReactiveDict();

Template.Contact.onCreated(function() {
	pageSession.set("errorMessage", "");
	
});

Template.Contact.onDestroyed(function() {
	
});

Template.Contact.onRendered(function() {
	pageSession.set("errorMessage", "");
	pageSession.set("verificationEmailSent", false);

	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Contact.events({

	"click .go-home": function(e, t) {
		Router.go("/");
	}

});

Template.Contact.helpers({
	errorMessage: function() {
		return pageSession.get("errorMessage");
	},
	verificationEmailSent: function() {
		return pageSession.get("verificationEmailSent");
	}
	
});
