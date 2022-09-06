"use strict";
const { postRequest } = require("../../utils");

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#bootstrap
 */

module.exports = async () => {
//   try {
//     const cabletvs = await strapi.query("cabletv").find({_sort: 'service_id:asc'});
//     const promises = [];
//     cabletvs.forEach((cabletv) => {
//       promises.push(
//         postRequest("/services/packages", {
//           body: {
//             service_id: cabletv.service_id,
//           },
//         })
//       );
//     });

//     const resolvedPromises = await Promise.all(promises);
//     const resolvedData = await Promise.all(resolvedPromises.map(response => response.json()));

//     console.log(JSON.stringify(resolvedData, null, 2));
//     const modifiedData = cabletvs.map((cabletv, index) => {
//         return {
//             ...cabletv,
//             plans: resolvedData[index].details.map(plan => ({
//                 ...plan,
//                 selling_price: (parseInt(cabletv.charge) || 50) + plan.price
//             }))
//         }
//     });

//     const queries = modifiedData.map(({id, ...data}) => {
//         return strapi.query('cabletv').update({id}, data);
//     })

//     await Promise.all(queries);


//   } catch (error) {
//     console.log(error);
//     throw new Error(error);
//   }
};
