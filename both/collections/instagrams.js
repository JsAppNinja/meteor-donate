this.Instagrams = new Mongo.Collection("instagrams");

this.Instagrams.userCanInsert = function(userId, doc) {
	return true;
};

this.Instagrams.userCanUpdate = function(userId, doc) {
	return true;
};

this.Instagrams.userCanRemove = function(userId, doc) {
	return true;
};
