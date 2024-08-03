import { handleCommands } from "./cli";

handleCommands().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
