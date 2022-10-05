"use strict";
const { sanitizeEntity } = require("strapi-utils");
const _ = require("lodash");
const yup = require('yup');

const { handleError } = require("../../../utils");

const validationSchema = yup.object({
  phoneNo: yup
    .string()
    .required("Please enter a phone Number")
    .matches(
      new RegExp("(^((\\+?234)|0){1}(7|8|9){1}(0|1){1}[0-9]{8}$)"),
      "Enter a valid Nigerian phone number"
    ),
  firstName: yup
    .string()
    .trim()
    .required("Please enter your first name"),
  lastName: yup.string().trim().required("Plese enter your last name"),
});

module.exports = {
  user: async (ctx) => {
    const {id} = ctx.state.user;
    try {
        const body = await validationSchema.validate(ctx.request.body);
        let user = await strapi.query('user', 'users-permissions').findOne({phoneNo: body.phoneNo});
        if(user) {
            return ctx.badRequest("A user with this phone number already exist");
        }

        user = await strapi.query('user', 'users-permissions').update({id}, {
            ...body
        })

        return sanitizeEntity(user, {model: strapi.query('user', 'users-permissions').model});

    } catch (error) {
        console.log(error);
        return handleError(ctx, error);
    }

}
};
