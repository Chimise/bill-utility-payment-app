module.exports = function (ctx, price) {
    return parseInt(ctx.state.user.amount) > parseInt(price);
}