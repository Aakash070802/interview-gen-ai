import config from "./src/config/config.js";
import connection_DB from "./src/config/database.js";
import { app } from "./src/app.js";

connection_DB();

app.listen(config.PORT, () => {
  console.log(`Server is running on ${config.PORT}`);
});
