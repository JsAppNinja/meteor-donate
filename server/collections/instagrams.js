Instagrams.allow({
	insert: function (userId, doc) {
		return Instagrams.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Instagrams.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Instagrams.userCanRemove(userId, doc);
	}
});

Instagrams.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Instagrams.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Instagrams.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

Instagrams.before.remove(function(userId, doc) {
	
});

Instagrams.after.insert(function(userId, doc) {
	
});

Instagrams.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Instagrams.after.remove(function(userId, doc) {
	
});
