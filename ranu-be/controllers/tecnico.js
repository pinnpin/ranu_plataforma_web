import pool from "../database/keys";

const tecnico = {};

// NASCIMENTOS
tecnico.registerNascimento = async (req, res) => {
    const {numero, nseq, processo, nome, dta_nascimento, hora, gestacao, peso, sexo, puerperio, local_nasc, apgar1, apgar5} = req.body;
    try {
      await pool.query('INSERT INTO rn_nascimentos (numero,nseq,processo,nome,dta_nascimento,hora,gestacao,peso,sexo,puerperio,local_nasc,apgar1,apgar5) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)', [numero,nseq,processo,nome,dta_nascimento,hora,gestacao,peso,sexo,puerperio,local_nasc,apgar1,apgar5]);
      const nascimento = await (await pool.query('SELECT * FROM rn_nascimentos ORDER BY numero DESC LIMIT 1')).rows[0];
      res.status(200).json({
          message: 'Nascimento foi registado com sucesso!',
          nascimento
        })
    } catch (error) {
      res.status(500).json({
          message: 'Ocorreu um erro!',
          error
      })
  }
};

tecnico.deleteNascimento = async (req, res) => {
  const id = req.params.id_t; //tem de haver alguma coisa no frontend tipo uma little text box onde o técnico insere o id
  try {
      await pool.query('DELETE FROM rn_nascimentos WHERE nseq=$1;', [id]);
      res.status(200).json({
          message: 'O bebé foi apagado com sucesso!'
      })
  } catch (error) {
      res.status(500).json({
          message: 'Ocorreu um erro!',
          error
      })
  }
}


module.exports = tecnico;
