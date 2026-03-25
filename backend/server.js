import config from "./src/config/config.js";
import connection_DB from "./src/config/database.js";
import { app } from "./src/app.js";
import {
  resume,
  selfDescription,
  jobDescription,
} from "./src/services/temp.js";
import { generateInterviewReport } from "./src/services/ai.service.js";

connection_DB();
generateInterviewReport({ resume, selfDescription, jobDescription });

app.listen(config.PORT, () => {
  console.log(`Server is running on ${config.PORT}`);
});
