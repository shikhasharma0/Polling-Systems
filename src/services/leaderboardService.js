const getLeaderboard = async (req, res) => {
    const result = await db.query(
      `SELECT option, COUNT(*) AS votes
       FROM votes
       GROUP BY option
       ORDER BY votes DESC LIMIT 10`
    );
    res.status(200).json(result.rows);
  };
  