const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Tour = require('./../models/tourModel');
const User = require('./../models/userModel');

const Booking = require('./../models/bookingModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('./../utils/appError');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
	console.log('GET CHECKOUT SESSION CALLED 🤞🤞🤞');
	// 1) Get the currently booked tour
	const tour = await Tour.findById(req.params.tourId);
	// console.log(tour);

	// 2) Create checkout session
	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		// success_url: `${req.protocol}://${req.get('host')}/my-tours/?tour=${
		//   req.params.tourId
		// }&user=${req.user.id}&price=${tour.price}`,
		success_url: `${req.protocol}://${req.get('host')}/my-tours`,
		cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
		customer_email: req.user.email,
		client_reference_id: req.params.tourId,
		mode: 'payment',
		line_items: [
			{
				name: `${tour.name} Tour`,
				description: tour.summary,
				images: [
					`${req.protocol}://${req.get('host')}/img/tours/${tour.imageCover}`,
				],
				amount: tour.price * 100,
				currency: 'usd',
				quantity: 1,
			},
		],
	});

	// 3) Create session as response
	res.status(200).json({
		status: 'success',
		session,
	});

	console.log(session);
});

// exports.createBookingCheckout = catchAsync(async (req, res, next) => {
//   //temporary solution. Unsecure. Everyone can book without paying;
//   console.log(req.query);
//   const { tour, user, price } = req.query;

//   console.log(tour, user, price);
//   if (!tour && !user && !price) return next();

//   await Booking.create({ tour, user, price });

//   // res.redirect(req.originalUrl.split('?')[0]);
// });

exports.getMyBookings = catchAsync(async (req, res, next) => {
	const bookings = await Booking.find({ user: req.user.id });
	const tourIds = bookings.map((el) => el.tour);
	console.log(tourIds);

	const tours = await Tour.find({ _id: { $in: tourIds } });

	res.status(200).json({
		status: 'success',
		results: tours.length,
		tours,
	});
});

const createBookingCheckout = async (session) => {
	console.log('CREATE BOOKING CHECKOUT MANNNN');
	const tour = session.client_reference_id;
	const user = (await User.findOne({ email: session.customer_email })).id;
	const price = session.amount_total / 100;
	console.log('TERNUTAK ISTINE:', tour, user, price);

	// const bookingDuplicate = Booking.find({ user: user, tour: tour });

	// if (bookingDuplicate)
	//   return next(new AppError('You have already booked this tour!', 400));

	await Booking.create({ tour, user, price });
};

exports.webhookCheckout = (req, res, next) => {
	console.log('WEBHOOK MY MAAAAAAAAAAAAAAAAAAAAAAAAAN 🤞🤞🤞🤞🤞');
	const signature = req.headers['stripe-signature'];

	let event;
	try {
		event = stripe.webhooks.constructEvent(
			req.body,
			signature,
			process.env.STRIPE_WEBHOOK_SECRET
		);
	} catch (err) {
		return res.status(400).send(`Webhook error: ${err.message}`);
	}

	if (event.type === 'checkout.session.completed')
		createBookingCheckout(event.data.object);

	res.status(200).json({ received: true });
};
