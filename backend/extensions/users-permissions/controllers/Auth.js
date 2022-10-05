"use strict";
const {
  register: authRegister,
} = require("strapi-plugin-users-permissions/controllers/Auth");
const yup = require("yup");
const {handleError} = require('../../../utils');

const userSchema = yup.object({
  phoneNo: yup
    .string()
    .required("Please enter a phone Number")
    .matches(
      new RegExp("(^((\\+?234)|0){1}(7|8|9){1}(0|1){1}[0-9]{8}$)"),
      "Enter a valid Nigerian phone number"
    ),
  email: yup
    .string()
    .email("Enter a valid Email")
    .required("Enter enter your email"),
  firstName: yup
    .string()
    .trim()
    .required("Please enter your first name"),
  lastName: yup.string().trim().required("Plese enter your last name"),
  username: yup.string().required("Please enter your username")
});

module.exports = {
  async register(ctx) {
    try {
      const body = await userSchema.validate(ctx.request.body);
      const users = await strapi
        .query("user", "users-permissions")
        .find({phoneNo: body.phoneNo});

      if (users.length > 0) {
        return ctx.badRequest("A user with this phone number already exist.");
      }

      return authRegister(ctx);
    } catch (error) {
      return handleError(ctx, error);
    }
  },
};
