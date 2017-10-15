var pageSession = new ReactiveDict();

Template.AdminUsers.onCreated(function() {
	
});

Template.AdminUsers.onDestroyed(function() {
	
});

Template.AdminUsers.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AdminUsers.events({
	
});

Template.AdminUsers.helpers({
	
});

var AdminUsersViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("AdminUsersViewSearchString");
	var sortBy = pageSession.get("AdminUsersViewSortBy");
	var sortAscending = pageSession.get("AdminUsersViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["profile.name", "profile.email", "roles"];
		filtered = _.filter(raw, function(item) {
			var match = false;
			_.each(searchFields, function(field) {
				var value = (getPropertyValue(field, item) || "") + "";

				match = match || (value && value.match(regEx));
				if(match) {
					return false;
				}
			})
			return match;
		});
	}

	// sort
	if(sortBy) {
		filtered = _.sortBy(filtered, sortBy);

		// descending?
		if(!sortAscending) {
			filtered = filtered.reverse();
		}
	}

	return filtered;
};

var AdminUsersViewExport = function(cursor, fileType) {
	var data = AdminUsersViewItems(cursor);
	var exportFields = [];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}

Template.AdminUsersView.onCreated(function() {
	
});

Template.AdminUsersView.onDestroyed(function() {
	
});

Template.AdminUsersView.onRendered(function() {
	pageSession.set("AdminUsersViewStyle", "table");
	
});

Template.AdminUsersView.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).parent();
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				pageSession.set("AdminUsersViewSearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					pageSession.set("AdminUsersViewSearchString", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					pageSession.set("AdminUsersViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("admin.users.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		AdminUsersViewExport(this.admin_users, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AdminUsersViewExport(this.admin_users, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AdminUsersViewExport(this.admin_users, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AdminUsersViewExport(this.admin_users, "json");
	}

	
});

Template.AdminUsersView.helpers({

	

	"isEmpty": function() {
		return !this.admin_users || this.admin_users.count() == 0;
	},
	"isNotEmpty": function() {
		return this.admin_users && this.admin_users.count() > 0;
	},
	"isNotFound": function() {
		return this.admin_users && pageSession.get("AdminUsersViewSearchString") && AdminUsersViewItems(this.admin_users).length == 0;
	},
	"searchString": function() {
		return pageSession.get("AdminUsersViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("AdminUsersViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("AdminUsersViewStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("AdminUsersViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("AdminUsersViewStyle") == "gallery";
	}

	
});


Template.AdminUsersViewTable.onCreated(function() {
	
});

Template.AdminUsersViewTable.onDestroyed(function() {
	
});

Template.AdminUsersViewTable.onRendered(function() {
	
});

Template.AdminUsersViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("AdminUsersViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("AdminUsersViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("AdminUsersViewSortAscending") || false;
			pageSession.set("AdminUsersViewSortAscending", !sortAscending);
		} else {
			pageSession.set("AdminUsersViewSortAscending", true);
		}
	}
});

Template.AdminUsersViewTable.helpers({
	"tableItems": function() {
		return AdminUsersViewItems(this.admin_users);
	}
});


Template.AdminUsersViewTableItems.onCreated(function() {
	
});

Template.AdminUsersViewTableItems.onDestroyed(function() {
	
});

Template.AdminUsersViewTableItems.onRendered(function() {
	
});

Template.AdminUsersViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("admin.users.details", mergeObjects(Router.currentRouteParams(), {userId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("", this._id, values, function(err, res) {
			if(err) {
				alert(err.message);
			}
		});

		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();
		var me = this;
		var this_id = $(e.target).attr('u-id');

		bootbox.dialog({
			message: "Are you sure to delete this user?",
			title: "Delete User",
			animate: true,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						Meteor.call("removeUserAccount", me._id, function(err, res) {
							if(err) {
								alert(err.message);
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
		return false;
	},

	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("admin.users.edit", mergeObjects(Router.currentRouteParams(), {userId: this._id}));
		return false;
	}

});

Template.AdminUsersViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Users.isAdmin(Meteor.userId()) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Users.isAdmin(Meteor.userId()) ? "" : "hidden";
	}
});
