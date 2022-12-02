const adminUserController = require('strapi-plugin-users-permissions/controllers/user/admin');
const apiUserController = require('strapi-plugin-users-permissions/controllers/user/api');
const _ = require('lodash');

const resolveController = ctx => {
    const {
      state: { isAuthenticatedAdmin },
    } = ctx;
  
    return isAuthenticatedAdmin ? adminUserController : apiUserController;
  };
  
  const resolveControllerMethod = method => ctx => {
    const controller = resolveController(ctx);
    const callbackFn = controller[method];
  
    if (!_.isFunction(callbackFn)) {
      return ctx.notFound();
    }
  
    return callbackFn(ctx);
  };

module.exports = {
    async update(ctx) {
        const user = ctx.state.user;
        if(ctx.request.body.password && user.provider !== 'local') {
            return ctx.badRequest("You cannot change your password, you signed in with " + user.provider);
        }
        return resolveControllerMethod('update')(ctx);
    }
}