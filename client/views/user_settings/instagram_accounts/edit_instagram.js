let pageSession = new ReactiveDict();

pageSession.set("errorMessage", "");
pageSession.set("infoMessage", "");

Template.UserSettingsEditInstagram.onCreated(function() {
	pageSession.set("errorMessage", "");	
	pageSession.set("infoMessage", "");	
	
});

Template.UserSettingsEditInstagram.onDestroyed(function() {
	
});

Template.UserSettingsEditInstagram.onRendered(function() {

	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});

	// Init feature toggle and field to frontend
	$('.ig-account-feature input[type="checkbox"]').bootstrapToggle();

	$('.ig-account-feature input[type="checkbox"]').each(function(e) {
		if (this.checked) {
			$(this).parent().siblings('.params').children().show();
			$(this).parent().siblings('.params').children().find('input').attr('required', true);
		} else {
			$(this).parent().siblings('.params').children().hide();
			$(this).parent().siblings('.params').children().find('input').removeAttr('required');
		}
	});

});

Template.UserSettingsEditInstagram.events({
	'submit .instagrams_form' : function(e, t) {
		e.preventDefault();

		let submit_button = $(e.target).find(":submit");
		submit_button.button("loading");
		
		pageSession.set("errorMessage", "");
		pageSession.set("infoMessage", "");

		let instaId = $(e.target).find('.single-wrap').attr('data-id');
		let username = $(e.target).find('#username').val();
		let insta_pass = $(e.target).find('#password').val();
		let target_audience = $(e.target).find('#target-audience').val();

		let features_save_user_stats = $(e.target).find('#save_user_stats').prop('checked');

		let features_like_hashtag = $(e.target).find('#like_hashtag').prop('checked');
		let hashtags = t.find('#hashtags').value.trim();
		let hashtags_amount = $(e.target).find('#hashtags_amount').val();

		let features_like_medias_by_location = $(e.target).find('#like_medias_by_location').prop('checked');
		let like_media_location = $(e.target).find('#like_media_location').val();
		let like_media_location_amount = $(e.target).find('#like_media_location_amount').val();

		let features_like_timeline = $(e.target).find('#like_timeline').prop('checked');
		let like_timeline_amount = $(e.target).find('#like_timeline_amount').val();

		let features_follow_user_followers = $(e.target).find('#follow_user_followers').prop('checked');
		let follow_users = $(e.target).find('#follow_users').val();
		let follow_users_amount = $(e.target).find('#follow_users_amount').val();

		let features_follow_by_location = $(e.target).find('#follow_by_location').prop('checked');
		let follow_locations = $(e.target).find('#follow_locations').val();
		let follow_locations_amount = $(e.target).find('#follow_locations_amount').val();

		let features_follow_likers_by_location = $(e.target).find('#follow_likers_by_location').prop('checked');
		let follow_location_likers = $(e.target).find('#follow_location_likers').val();
		let follow_location_likers_amount = $(e.target).find('#follow_location_likers_amount').val();

		let features_like_likers_by_location = $(e.target).find('#like_likers_by_location').prop('checked');
		let like_location_likers = $(e.target).find('#like_location_likers').val();
		let like_location_likers_amount = $(e.target).find('#like_location_likers_amount').val();

		let features_direct_message_followers = $(e.target).find('#direct_message_followers').prop('checked');
		let dm_followers = $(e.target).find('#dm_followers').val();
		let dm_followers_amount = $(e.target).find('#dm_followers_amount').val();

		let features_direct_message_new_followers = $(e.target).find('#direct_message_new_followers').prop('checked');
		let dm_new_followers = $(e.target).find('#dm_new_followers').val();
		let dm_new_followers_amount = $(e.target).find('#dm_new_followers_amount').val();

		let features_get_user_followers = $(e.target).find('#get_user_followers').prop('checked');
		
		let data = {
			password : insta_pass,
			targetAudience : target_audience,
			features : {
				save_user_stats: {
					active: features_save_user_stats ? true : false
				},
				like_hashtag: {
					bot_params: {
						hashtags: hashtags.split(','),
						amount: hashtags_amount
					},
					active: features_like_hashtag ? true : false
				},
				like_medias_by_location: {
					bot_params: {
						locations: like_media_location,
						amount: like_media_location_amount
					},
					active: features_like_medias_by_location ? true : false
				},
				like_timeline: {
					bot_params: {
						amount: like_timeline_amount
					},
					active: features_like_timeline ? true : false
				},
				follow_user_followers: {
					bot_params: {
						users: follow_users.split(','),
						amount: follow_users_amount
					},
					active: features_follow_user_followers ? true : false
				},
				follow_by_location: {
					bot_params: {
						locations: follow_locations.split(','),
						amount: follow_locations_amount
					},
					active: features_follow_by_location ? true : false
				},
				follow_likers_by_location: {
					bot_params: {
						locations: follow_location_likers.split(','),
						amount: follow_location_likers_amount
					},
					active: features_follow_likers_by_location ? true : false
				},
				like_likers_by_location: {
					bot_params: {
						locations: like_location_likers.split(','),
						amount: like_location_likers_amount
					},
					active: features_like_likers_by_location ? true : false
				},
				direct_message_followers: {
					bot_params: {
						locations: dm_followers.split(','),
						amount: dm_followers_amount
					},
					active: features_direct_message_followers ? true : false
				},
				direct_message_new_followers: {
					bot_params: {
						locations: dm_new_followers.split(','),
						amount: dm_new_followers_amount
					},
					active: features_direct_message_new_followers ? true : false
				},
				get_user_followers: {
					active: features_get_user_followers ? true : false
				}
			}
		};

		Meteor.call('updateInstagram', instaId, data, function (err, res) {
			submit_button.button("reset");
			if (err) {
				throw err;
				pageSession.set("errorMessage", err);
			}
			if (res) {
				pageSession.set("errorMessage", "");
				pageSession.set("infoMessage", "Instagram profile updated!");
			}
		});

		return false;
	},

	'click .delete-instagram-account': function(e) {
		e.preventDefault();

		let instaId = $(e.target).parents('.single-wrap').attr('data-id');
		let username = $(e.target).parents('.single-wrap').find('#username').val();

		Meteor.call('removeInstagram', instaId, function(err, res){
			if (err) {
				throw err;
				pageSession.set("errorMessage", err);
			}
			if (res) {
				pageSession.set("errorMessage", "");
				pageSession.set("infoMessage", "Instagram profile <strong>" + username + "</strong> removed");
			}
		});
	},

	'change .ig-account-feature input[type="checkbox"]': function(e) {
		if (e.target.checked) {
			$(e.target).parent().siblings('.params').children().show('fast');
			$(e.target).parent().siblings('.params').children().find('input').attr('required', true);
		} else {
			$(e.target).parent().siblings('.params').children().hide('fast');
			$(e.target).parent().siblings('.params').children().find('input').removeAttr('required');
		}
	}

});

Template.UserSettingsEditInstagram.helpers({
	errorMessage: function() {
		return pageSession.get("errorMessage");
	},
	infoMessage: function() {
		return pageSession.get("infoMessage");
	},
	InstagramAccounts: function() {
		return Instagrams.find({belongs_to:Meteor.userId()}, {});
	},
	checkedIf: function(value) {
		return value ? "checked" : ""
	}

});
