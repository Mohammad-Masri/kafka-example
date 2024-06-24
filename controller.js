import getKafkaConfigHelper from "./config/kafka.js";

const kafka = getKafkaConfigHelper();

export const sendMessageToKafka = async (req, res) => {
  try {
    const { message } = req.body;

    const messages = [{ key: "key1", value: message }];

    kafka.produce("my-topic", messages);
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
  }
};
