const kafka = require('kafka-node');

// Kafka Client and Producer Setup
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new kafka.Producer(client);

// Handle Producer Events
producer.on('ready', () => console.log('Kafka Producer is ready.'));
producer.on('error', (err) => console.error('Kafka Producer Error:', err));

// Function to send messages to Kafka
const sendToKafka = (topic, message) => {
  return new Promise((resolve, reject) => {
    producer.send([{ topic, messages: JSON.stringify(message) }], (err, data) => {
      if (err) {
        console.error('Error sending message to Kafka:', err);
        return reject(err);
      }
      console.log(`Message sent to Kafka topic "${topic}":`, data);
      resolve(data);
    });
  });
};

// Export the producer and sendToKafka function
module.exports = { producer, sendToKafka };
