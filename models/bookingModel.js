const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
	{
		tour: {
			type: mongoose.Schema.ObjectId,
			ref: 'Tour',
			required: [true, 'Booking must belong to tour!'],
		},
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: [true, 'Booking must belong to User!'],
		},
		price: {
			type: Number,
			required: [true, 'Booking must have a price!'],
		},
		createdAt: {
			type: Date,
			default: Date.now(),
		},
		paid: {
			type: Boolean,
			default: true,
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

// bookingSchema.pre(/^find/, function (next) {
//   this.populate('user').populate({
//     path: 'tour',
//     select: 'name',
//   });
//   next();
// });

bookingSchema.index({ tour: 1, user: 1 }, { unique: true });
console.log('asdasd');

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
