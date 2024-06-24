import Express from "express";
import bodyParser from "body-parser";
import { PORT } from "./config/server.js";
import { sendMessageToKafka } from "./controller.js";
import getKafkaConfigHelper from "./config/kafka.js";

const kafka = getKafkaConfigHelper();

const app = Express();
const jsonParser = bodyParser.json();

app.use(jsonParser);

app.post("/api/send", sendMessageToKafka);

kafka.consume("my-topic", (value) => {
  console.log("consume this value: ", value);
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
