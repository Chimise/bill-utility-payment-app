"use strict";
const {
  register: authRegister,
} = require("strapi-plugin-users-permissions/controllers/Auth");
const yup = require("yup");

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
  username: yup
    .string()
    .trim()
    .required("Please enter your username")
    .min(6, "Your username should be up to five characters"),
});

module.exports = {
  async register(ctx) {
    try {
      await userSchema.validate(ctx.request.body);
      const [user] = await strapi
        .query("user", "users-permissions")
        .find({ phoneNo: ctx.request.body.phoneNo });

      if (user) {
        return ctx.badRequest("Phone number already exists");
      }

      return authRegister(ctx);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return ctx.badRequest(error.errors[0]);
      }
      console.log(error);
      return ctx.badImplementation("Something wrong happened");
    }
  },
};
