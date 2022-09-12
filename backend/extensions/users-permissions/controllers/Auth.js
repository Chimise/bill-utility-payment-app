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
  firstName: yup
    .string()
    .trim()
    .required("Please enter your first name"),
  lastName: yup.string().trim().required("Plese enter your last name")
    
});

module.exports = {
  async register(ctx) {
    try {
      const body = await userSchema.validate(ctx.request.body);
      const users = await strapi
        .query("user", "users-permissions")
        .find({_where: {_or: [{phoneNo: body.phoneNo}, {email: body.email}]} });

      if (users.length > 0) {
        return ctx.badRequest("Phone number or Email already exists");
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
