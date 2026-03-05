const Joi = require("joi");

module.exports.listingSchema = Joi.object({

  listing: Joi.object({

    title: Joi.string()
      .trim()
      .min(3)
      .max(100)
      .required(),

    description: Joi.string()
      .trim()
      .min(10)
      .required(),

    image: Joi.object({
      url: Joi.string()
        .uri()
        .allow("", null)
    }).optional(),

    price: Joi.number()
      .min(0)
      .required(),

    location: Joi.string()
      .trim()
      .required(),

    country: Joi.string()
      .trim()
      .required()

  }).required()
   
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({

    rating: Joi.number()
      .min(1)
      .max(5)
      .required(),

    comment: Joi.string()
      .trim()
      .required()

  }).required()

});