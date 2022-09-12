'use strict';
const {santizeEntity} = require('strapi-utils');
const {handleError} = require('../../../utils');


module.exports = {
    async verify(ctx) {
        const {reference} = ctx.params;
        const user = ctx.state.user;
        try {
            const data = strapi.services.payment.verifyPayment(reference);
            const amount = data.amount;
            const initialAmount = user.amount;
            const currentAmount = user.amount + amount;
            await strapi.query('users', 'users-permissions').update({id: ctx.state.user.id}, {
                amount: currentAmount
            });
            const payment = strapi.query('payment').create({
                ...data,
                reference,
                prevBal: initialAmount,
                currentBal: currentAmount,
                user: user.id
            });

            return sanitizeEntity(payment, {model: strapi.models.payment});
            
        } catch (error) {
            console.log(error);
            return handleError(ctx, error);
        }
    }
};
