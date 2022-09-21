"use strict";
const crypto = require("crypto");
const { santizeEntity } = require("strapi-utils");
const { handleError } = require("../../../utils");

module.exports = {
  async verify(ctx) {
    const { reference } = ctx.params;
    const user = ctx.state.user;
    try {
      const data = strapi.services.payment.verifyPayment(reference);
      const amount = data.amount;
      const initialAmount = user.amount;
      const currentAmount = user.amount + amount;
      if (data.status !== "success") {
        const payment = strapi.query("payment").create({
          reference,
          ...data,
          user: user.id,
        });
        return santizeEntity(payment, { model: strapi.models.payment });
      }
      await strapi.query("users", "users-permissions").update(
        { id: ctx.state.user.id },
        {
          amount: currentAmount,
        }
      );
      const payment = strapi.query("payment").create({
        ...data,
        reference,
        prevBal: initialAmount,
        currentBal: currentAmount,
        user: user.id,
      });

      return sanitizeEntity(payment, { model: strapi.models.payment });
    } catch (error) {
      console.log(error);
      return handleError(ctx, error);
    }
  },
  async getDedicatedAccount(ctx) {
    const user = ctx.state.user;
    let accountInfo = {
      accountName: user.accountName,
      accountNo: user.accountNo,
    };
    if (!user.accountNo) {
      if (!user.firstName || !user.lastName) {
        return ctx.badRequest(
          "Please update your FirstName and LastName in your profile"
        );
      }
      const customerCode = await strapi.services.payment.createCustomer(
        user.email,
        user.firstName,
        user.lastName,
        user.phoneNo
      );
      const { accountName, accountNo, accountId } =
        await strapi.services.payment.createVirtualAccount(customerCode);
      await strapi.query("user", "users-permissions").update(
        { id: user.id },
        {
          accountId,
          accountName,
          accountNo,
        }
      );

      accountInfo = {
        accountName,
        accountNo,
      };
    }

    return accountInfo;
  },
  getCharge(ctx) {
    const amount = parseInt(ctx.query.amount);
    if (!amount || isNaN(amount)) {
      return ctx.badRequest("Enter an amount");
    }

    return {
      localCharges: strapi.services.payment.getLocalCharges(amount),
      dedicatedAccCharges:
        strapi.services.payment.getDedicatedAccountCharges(amount),
    };
  },
  async webhook(ctx) {
    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK_SECRET)
      .update(JSON.stringify(ctx.request.body))
      .digest("hex");
    if (hash !== ctx.get("x-paystack-signature")) {
      return ctx.unauthorized();
    }

    const body = ctx.request.body;
    ctx.body = null;
    ctx.status = 200;

    if (body.event === "charge.success") {
      const user = strapi
        .query("user", "users-permissions")
        .findOne({ email: body.data.customer.email });
      if (!user) {
        return;
      }
      if (
        body.data.channel === "dedicated_nuban" ||
        body.data.authorization.channel === "dedicated_nuban"
      ) {
         
      } else {
        
      }
    }
  },
};
