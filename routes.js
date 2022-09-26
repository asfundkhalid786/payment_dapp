const routes = require("next-routes")();

routes
  .add("/campaigns/new", "/campaigns/new")
  .add("/campaigns/:address", "/campaigns/show")
  .add("/campaigns/:address/bills", "/campaigns/bills/index")
  .add("/campaigns/:address/bills/new", "/campaigns/bills/new");


module.exports = routes;
