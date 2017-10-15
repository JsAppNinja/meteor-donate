var pageSession = new ReactiveDict();

pageSession.set("errorMessage", "");
pageSession.set("infoMessage", "");

Template.UserSettingsAddInstagram.onCreated(function() {
	pageSession.set("errorMessage", "");	
	pageSession.set("infoMessage", "");	
	
});

Template.UserSettingsAddInstagram.onDestroyed(function() {
	
});

Template.UserSettingsAddInstagram.onRendered(function() {

	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});

	$('.ig-account-feature input[type="checkbox"]').bootstrapToggle();

	$('.ig-account-feature input[type="checkbox"]').each(function() {
		$(this).parent().siblings('.params').children().hide();
	});

});

Template.UserSettingsAddInstagram.events({
	'submit #add_instagram_form' : function(e, t) {
		e.preventDefault();

		let submit_button = $(t.find(":submit"));

		// instagram info
		let add_instagram = t.find('#add_instagram').value.trim();
		let add_insta_pass = t.find('#add_insta_pass').value.trim();
		let confirm_insta_pass = t.find('#confirm_insta_pass').value.trim();
		// targets
		let add_target_audience = t.find('#add_target_audience').value.trim();

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
		
		// check instagram pass
		if(add_insta_pass !== confirm_insta_pass)
		{
			pageSession.set("errorMessage", "Instagram passwords don't match.");
			t.find('#confirm_insta_pass').focus();
			return false;
		}

		submit_button.button("loading");

		let data = {
			belongs_to: Users.findOne()._id,
			active : false,
			lastPayDate : null,
			paid : false,
			username : add_instagram,
			password : add_insta_pass,
			targetAudience : add_target_audience,
			features : {
				save_user_stats: {
					start_timestamp: get_start_timestamp(),
					repeat_time: 3600,
					bot_params: {},
					active: features_save_user_stats ? true : false
				},
				like_hashtag: {
					start_timestamp: get_start_timestamp(),
					repeat_time: 21600,
					bot_params: {
						hashtags: hashtags.split(','),
						amount: hashtags_amount
					},
					active: features_like_hashtag ? true : false
				},
				like_medias_by_location: {
					start_timestamp: get_start_timestamp(),
					repeat_time: 21600,
					bot_params: {
						locations: like_media_location,
						amount: like_media_location_amount
					},
					active: features_like_medias_by_location ? true : false
				},
				like_timeline: {
					start_timestamp: get_start_timestamp(),
					repeat_time: 21600,
					bot_params: {
						amount: like_timeline_amount
					},
					active: features_like_timeline ? true : false
				},
				follow_user_followers: {
					start_timestamp: get_start_timestamp(),
					repeat_time: 21600,
					bot_params: {
						users: follow_users.split(','),
						amount: follow_users_amount
					},
					active: features_follow_user_followers ? true : false
				},
				follow_by_location: {
					start_timestamp: get_start_timestamp(),
					repeat_time: 21600,
					bot_params: {
						locations: follow_locations.split(','),
						amount: follow_locations_amount
					},
					active: features_follow_by_location ? true : false
				},
				follow_likers_by_location: {
					start_timestamp: get_start_timestamp(),
					repeat_time: 21600,
					bot_params: {
						locations: follow_location_likers.split(','),
						amount: follow_location_likers_amount
					},
					active: features_follow_likers_by_location ? true : false
				},
				like_likers_by_location: {
					start_timestamp: get_start_timestamp(),
					repeat_time: 21600,
					bot_params: {
						locations: like_location_likers.split(','),
						amount: like_location_likers_amount
					},
					active: features_like_likers_by_location ? true : false
				},
				direct_message_followers: {
					start_timestamp: get_start_timestamp(),
					repeat_time: 21600,
					bot_params: {
						locations: dm_followers.split(','),
						amount: dm_followers_amount
					},
					active: features_direct_message_followers ? true : false
				},
				direct_message_new_followers: {
					start_timestamp: get_start_timestamp(),
					repeat_time: 21600,
					bot_params: {
						locations: dm_new_followers.split(','),
						amount: dm_new_followers_amount
					},
					active: features_direct_message_new_followers ? true : false
				},
				get_user_followers: {
					start_timestamp: get_start_timestamp(),
					repeat_time: 3600,
					bot_params: {},
					active: features_get_user_followers ? true : false
				}
			}
		};

		Meteor.call('insertInstagram', data, function( error, result) {
			submit_button.button("reset");
			if ( error ) {
				pageSession.set("errorMessage", error);
			}
			if ( result ) {
				pageSession.set("errorMessage", "");
				Router.go("user_settings.instagram_accounts");
			}
		});

		pageSession.set("errorMessage", "");

		return false;
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

Template.UserSettingsAddInstagram.helpers({
	errorMessage: function() {
		return pageSession.get("errorMessage");
	},
	infoMessage: function() {
		return pageSession.get("infoMessage");
	}
});


// LIB - get random timestamp 

function get_start_timestamp () {
	return moment().unix() - Math.floor((Math.random() * 36000) + 1);
}
