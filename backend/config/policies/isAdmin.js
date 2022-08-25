module.exports = async (ctx, next) => {
    if(ctx.state.user && ctx.state.user.role.name === 'Administrator') {
        ctx.state.isAdmin = true;
    }
    await next();
}