const db = require('../config/db');

// Save vote to the database
const saveVoteToDB = async (vote) => {
  const { poll_id, option } = vote;
  try {
    await db.query('INSERT INTO votes (poll_id, option) VALUES ($1, $2)', [poll_id, option]);
    console.log('Vote saved to the database:', vote);
  } catch (error) {
    console.error('Error saving vote to the database:', error);
    throw error;
  }
};

// Get updated poll results
const getUpdatedPollResults = async (pollId) => {
  try {
    const result = await db.query(
      `SELECT option, COUNT(*) AS votes
       FROM votes
       WHERE poll_id = $1
       GROUP BY option
       ORDER BY votes DESC`,
      [pollId]
    );
    return result.rows;
  } catch (error) {
    console.error('Error fetching updated poll results:', error);
    throw error;
  }
};

module.exports = { saveVoteToDB, getUpdatedPollResults };
