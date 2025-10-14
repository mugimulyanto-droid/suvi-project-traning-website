import dotenv from "dotenv";

// load dotenv
dotenv.config();

import { web } from "./app.js";
import { config } from "./config/index.js";

web.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
