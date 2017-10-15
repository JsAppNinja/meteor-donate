Meteor.methods({
	insertInstagram: function(data) {
		if(!Instagrams.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Instagrams.insert(data);
	},

	updateInstagram: function(id, data) {
		var doc = Instagrams.findOne({ _id: id });
		if(!Instagrams.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Instagrams.update({ _id: id }, { $set: data });
	},

	removeInstagram: function(id) {
		var doc = Instagrams.findOne({ _id: id });
		if(!Instagrams.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Instagrams.remove({ _id: id });
	}
});
