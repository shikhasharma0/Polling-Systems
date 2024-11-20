const { sendToKafka } = require('../config/kafkaProducer');

const voteOnPoll = async (req, res) => {
  const { id: poll_id } = req.params;
  const { option } = req.body;

  try {
    await sendToKafka('pollVotes', { poll_id, option });

    res.status(200).json({ message: 'Vote received and sent to Kafka!' });
  } catch (error) {
    console.error('Error sending vote to Kafka:', error);
    res.status(500).json({ error: 'Failed to send vote' });
  }
};

module.exports = { voteOnPoll };


