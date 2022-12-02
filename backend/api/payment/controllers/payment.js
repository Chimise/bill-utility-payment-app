"use strict";
const crypto = require("crypto");
const { sanitizeEntity } = require("strapi-utils");
const { handleError } = require("../../../utils");

module.exports = {
  async verify(ctx) {
    const { reference } = ctx.request.body;
    if(!reference) {
      return ctx.badRequest("Incorrect data was provided");
    }
    const user = ctx.state.user;
    try {
      const data = await strapi.services.payment.verifyPayment(reference);
      const amount = data.amount;
      const initialAmount = user.amount;
      const currentAmount = user.amount + amount;
      if (data.status !== "success") {
        return ctx.badImplementation("Payment was not sucessful");
      }
      await strapi.query("user", "users-permissions").update(
        { id: user.id },
        {
          amount: currentAmount,
        }
      );
      const payment = await strapi.query("payment").create({
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
    let accounts = await strapi.query('account').find({user: user.id});
    
    if (accounts.length == 0) {
      if (!user.firstName || !user.lastName || !user.phoneNo) {
        return ctx.badRequest(
          "Please provide your FirstName, LastName and Phone Number in your profile"
        );
      }
      const customerCode = await strapi.services.payment.createCustomer(
        user.email,
        user.firstName,
        user.lastName,
        user.phoneNo
      );

      
      const data =
        await strapi.services.payment.createVirtualAccount(customerCode);
        // Change to this code when using live key
        // await strapi.services.payment.createVirtualAccount(customerCode, 'access-bank');
        // await strapi.services.payment.createVirtualAccount(customerCode, 'wema-bank');

        const account = await strapi.query('account').create({
          ...data,
          user: user.id
        })


      accounts = [account];
    }

    return accounts.map(account => sanitizeEntity(account, {model: strapi.models.account}));
  },
  getCharge(ctx) {
    const amount = parseInt(ctx.query.amount);
    if (!amount || isNaN(amount)) {
      return ctx.badRequest("Enter an amount");
    }

    return {
      card: strapi.services.payment.getLocalCharges(amount),
      dedicated:
        strapi.services.payment.getDedicatedAccountCharges(amount),
    };
  },
  async find(ctx) {
    let entities;
    const {id} = ctx.state.user;
    if(ctx.query._q) {
      entities = await strapi.query('payment').search({...ctx.query, user: id});
    }else {
      entities = await strapi.query('payment').find({...ctx.query, user: id});
    }

    return entities.map(entity => sanitizeEntity(entity, {model: strapi.models.payment}));
  },
  async findOne(ctx) {
    const id = ctx.params.id;
    const entity = await strapi.query('payment').findOne({id, user: ctx.state.user.id});
    if(!entity) {
      return ctx.notFound("Data not found");
    };
    return sanitizeEntity(entity, {model: strapi.models.payment});
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
      let user = await strapi
        .query("user", "users-permissions")
        .findOne({ email: body.data.customer.email });
      const reference = body.data && body.data.reference;
      if (!user || !reference) {
        return;
      }
      
      const paymentData = await strapi.query('payment').findOne({id: user.id, reference});
      if(!paymentData) {
        const amount = (body.data.amount - body.data.fees) / 100;
         const initialAmount = user.amount;
         const currentAmount = user.amount + amount;
         user = await strapi.query('user', 'users-permissions').update({id: user.id}, {
          amount: currentAmount
         })
         await strapi.query('payment').create({
            reference,
            method: body.data.channel,
            createdAt: new Date(body.data.paidAt),
            status: body.data.status,
            amount,
            prevBal: initialAmount,
            currentBal: currentAmount,
            user: user.id
         })
      }
  
      
    }
  },
};
