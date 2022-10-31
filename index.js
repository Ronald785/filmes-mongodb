const { app } = require("./config/server");
const routes = require("./app/routes/routes");

routes.home(app);
routes.insertMovie(app);
routes.searchMovie(app);
routes.editMovie(app);
routes.deletMovie(app);
