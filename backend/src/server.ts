import { createApp } from "./app.js";
import { env } from "./config/env.js";

const startServer = async () => {
  const app = await createApp();

  app.listen(env.PORT, () => {
    console.log(
      `Git History Time Traveller API running on http://localhost:${env.PORT}`
    );

    console.log(
      `GraphQL endpoint: http://localhost:${env.PORT}/graphql`
    );
  });
};

startServer();