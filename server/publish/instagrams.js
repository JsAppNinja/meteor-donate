Meteor.publish('instagrams', function () {
    return Instagrams.find();
});
