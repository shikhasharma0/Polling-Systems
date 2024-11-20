const kafka = require('kafka-node');
const { broadcast } = require('../services/websocketService');
const { saveVoteToDB, getUpdatedPollResults } = require('../services/voteService');

// Kafka Client and Consumer Setup
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const consumer = new kafka.Consumer(client, [{ topic: 'pollVotes', partition: 0 }], {
  autoCommit: true,
});

// Handle Kafka Messages
consumer.on('message', async (message) => {
  try {
    const vote = JSON.parse(message.value);
    console.log('Received message from Kafka:', vote);

    // Process vote: Save it to the database
    await saveVoteToDB(vote);

    // Fetch updated poll results
    const updatedResults = await getUpdatedPollResults(vote.poll_id);

    // Broadcast real-time updates via WebSocket
    broadcast({ type: 'UPDATE_RESULTS', data: updatedResults });
  } catch (error) {
    console.error('Error processing Kafka message:', error);
  }
});

// Handle Consumer Errors
consumer.on('error', (err) => console.error('Kafka Consumer Error:', err));

module.exports = consumer;
