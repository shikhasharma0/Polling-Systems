const kafka = require('kafka-node');
const Producer = kafka.Producer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new Producer(client);

producer.on('ready', () => console.log('Kafka Producer is ready.'));
producer.on('error', (err) => console.error('Kafka Producer Error:', err));

module.exports = producer;



const { broadcast } = require('../services/websocketService');

consumer.on('message', async (message) => {
  const vote = JSON.parse(message.value);

  // Process vote (e.g., save to database)
  await saveVoteToDB(vote);

  // Fetch updated poll results
  const updatedResults = await getUpdatedPollResults(vote.poll_id);

  // Broadcast real-time updates
  broadcast({ type: 'UPDATE_RESULTS', data: updatedResults });
});

