let subscriptionEmail;

Template.Payment.onCreated(function() {
	
});

Template.Payment.onDestroyed(function() {
	
});

Template.Payment.onRendered(function() {

	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
	let ttt = getPlanList()
	.then(function(res) {
		let i = 0;
		for(i=0;i<3;i++){
			if(res[i].id) {
				$('#plans').append($('<option>',{
					value: res[i].id,
					text:  res[i].name
				}));
			}
		}
		console.log(res);
		return res;
	})
	.catch(function(err){
		console.log(err);
	});

});

Template.Payment.events({
	'submit #register_form' : function(e, t) {
		e.preventDefault();

		let submit_button = $(t.find(":submit"));

		// your account info
		let register_username = t.find('#register_username').value.trim();
		let register_email = t.find('#register_email').value.trim();
		subscriptionEmail = register_email;
		let register_phone = t.find('#register_phone').value.trim();

		// Payment info
		let plans = t.find('#plans').value.trim();
		let setupfee = t.find('#setupfee').value.trim();
		let cardnumber = t.find('#cardnumber').value.trim();
		let expire_year = t.find('#expire_year').value.trim();
		let expire_month = t.find('#expire_month').value.trim();
		let cvv = t.find('#cvv').value.trim();  cvv = "293";
		let country = t.find('#country').value.trim();
		let zipcode = t.find('#zipcode').value.trim(); zipcode = "03-234";

		// email validation checking
		if(!isValidEmail(register_email))
		{
			t.find('#register_email').focus();
			return false;
		}
		
		// Stripe Getting the Token
		Stripe.card.createToken({
			number: cardnumber,
			cvc:cvv,
			exp_month: expire_month,
			exp_year: expire_year,
			address_country: country,
			address_zip: zipcode
		}, stripeResponseHandler);
		
		submit_button.button("loading");
	},

});

Template.Payment.helpers({

});

function stripeResponseHandler(status, response) {

	if (response.error) { 
	  	console.log("stripe error");
	} else {
		let token = response.id;
		// console.log(token);

		let iSetupFee = $('#setupfee').find(":selected").val();
		let setupfee = 0.00;
		if(iSetupFee == 2) setupfee = 99.00;
		if(iSetupFee == 3) setupfee = 199.00;

		// Setup Fee Charge
		Meteor.call('stripeCharge', token, setupfee, function(error, result){
			if (error) {
				console.log(error);
			}
		});
		
		// Stripe Subscription
		let plan = $('#plans').find(":selected").val();
		
		Meteor.call('createSubscription', token, subscriptionEmail, plan, function(error, customer){
			if (error) {
				console.log(error);
			} else {
				console.log('Creating Customer success, updating Instagram collection');

				// Instagram account update on successful payment
				let instaId = Session.get("ig-id");
				let data = {
					active: true,
					paid: true,
					lastPayDate: Date.now()
				};
				Meteor.call('updateInstagram', instaId, data, function (err, res) {
					if (err) {
						console.log(err);
					}
					if (res) {
						// TODO: change sweetAlert to Bert.alert()
						Session.set("ig-id", null);
						sweetAlert("Setup fee and your Subscription is successfully charged!");
						Router.go("/user_settings/instagram_accounts");
					}
				});
			}
		});
	}
};

function getPlanList(){
	return new Promise (function(resolve, reject) {
		Meteor.call('getPlanList', function(err, result) {
			if(err) return reject(err);
			else return resolve(result); 
		})
	});
};