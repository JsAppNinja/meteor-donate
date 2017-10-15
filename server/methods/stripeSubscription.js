let stripe = require("stripe")("sk_live_Ye1JSgUiw1LRptPPkj05k1ex");

Meteor.startup(() => {

	Meteor.methods({

		createSubscription: function(stripeToken, email, plan){
			stripe.customers.create({
				account_balance:0,    // starting account balance for customer, cents
				business_vat_id:null, //cusomter's VAT identification number
				coupon: null,         // coupon code
				description: null,    // arbitrary string which u can attach to a customer object.
				email: email,      //customer email address
				source: stripeToken,         // token or source's Id
				metadata:null,             //set of key/value; it is useful for storing additional information.
				}, function(err, customer) {
				  if(err) {
					console.log(err);
				  } else {
					let customer_id = customer.id;  // customer id is required for the customer subscription
			
					// creating subscription
					stripe.subscriptions.create({
						customer: customer_id,	// customer id
						items: [				// subscription items list
							{
								plan: plan,		// plan Id
							},
						],
					}, function(err, subscription) {
						if(err) {
							console.log(err);
						} else {
							// console.log(subscription);
							console.log("subscription charged");
						}
					});
				}
			});
		},

		getPlanList: function() {
			return new Promise (function(resolve, reject) {
				stripe.plans.list(
					function(err, plans) {
						if (err) return reject(err);
						else {
							let planlist = plans.data;
							// console.log(planlist);
							let l =  planlist.length;
							let i =0; 
							let plist = {};
							for (i=0; i<l; i=i+1) {
								plist[i] = {};
								plist[i]['id'] = planlist[i].id;
								plist[i]['name'] = planlist[i].name;
							}
							// console.log(plist);
							return resolve(plist);
						}
					}
				);
			});
		},

		stripeCharge: function(stripeToken, amount){
			stripe.charges.create({
				amount: amount,
				currency: "usd",
				description: "Setup fee",
				source: stripeToken,
			}, function(err, charge) {
				if (err) {
					console.log(err);
				} else {
					console.log("charge successfully");
					// console.log(charge);
					return charge;
				}
			});
		}

	});

});
