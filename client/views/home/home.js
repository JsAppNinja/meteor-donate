Template.Home.onCreated(function() {
	
});

Template.Home.onDestroyed(function() {
	
});

Template.Home.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Home.events({
	
});

Template.Home.helpers({
	
});