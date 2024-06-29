import "module-alias/register";
import "dotenv/config";
import moduleAlias from "module-alias";

if (process.env?.ENV_MODE === "dev") {
  moduleAlias.addAlias("@", "src");
}