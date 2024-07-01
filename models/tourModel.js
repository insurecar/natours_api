const mongoose = require("mongoose");
const slugify = require("slugify");

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "😞 A tour must have a name"],
      unique: true,
      trim: true,
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, "A tour must have a duration"],
    },
    maxGroupSize: {
      type: Number,
      required: [true, "Atour must have a group size"],
    },
    difficulty: {
      type: String,
      required: [true, "A tour should have a difficalty"],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "A tour must have a price"],
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true, //it works just for string
      required: [true, "A tour should have a descripton"],
    },
    description: {
      type: String,
      trim: true,
    },
    secretTour: {
      type: Boolean,
      default: false,
    },
    imageCover: {
      type: String,
      required: [true, "A tour must have a cover image"],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
  },

  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

// tourSchema.virtual("durationWeeks").get(function () {
//   //should be function declaration
//   return this.duration / 7;
// });

// tourSchema.post("save", function (doc, next) {
//   console.log(doc);
//   next();
// });

// tourSchema.pre("save", function (next) {
//   console.log("Will save document...");
//   next();
// });

// tourSchema.pre("find", function (next) {
//   this.find({ secretTour: { $ne: true } });
//   next();
// });

// tourSchema.pre("findOne", function (next) {
//   this.find({ secretTour: { $ne: true } });
//   next();
// });

tourSchema.pre("/^find/", function (next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

tourSchema.post("/^find/", function (docs, next) {
  console.log(`❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥 Query took ${Date.now() - this.start}  milliseconds`);
  console.log(docs);
  next();
});

// DOCUMENT MIDDLEWARE. It RUNS before .save() and .create()
tourSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Tour = mongoose.model("tours", tourSchema);
module.exports = Tour;
