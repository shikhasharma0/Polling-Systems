const db = require('../config/db');

const createPoll = async (req, res) => {
    const { question, options } = req.body;
    const result = await db.query(
      'INSERT INTO polls (question, options) VALUES ($1, $2) RETURNING *',
      [question, JSON.stringify(options)]
    );
    res.status(201).json(result.rows[0]); //  add the opratration ,,
  };
  


const getPollResults = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM votes WHERE poll_id = $1', [id]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching poll results:', error);
    res.status(500).json({ error: 'Failed to fetch poll results' });
  }
};

const getUpdatedPollResults = async (pollId) => {
    const result = await db.query('SELECT option, COUNT(*) AS votes FROM votes WHERE poll_id = $1 GROUP BY option', [pollId]);
    return result.rows;
  };
    


module.exports = { getPollResults, createPoll, getUpdatedPollResults  }; 
