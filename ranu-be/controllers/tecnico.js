import pool from "../database/keys";

const tecnico = {};

// NASCIMENTOS
tecnico.registerNascimento = async (req, res)=>{
    const {numero, nseq, processo, nome, dta_nascimento, hora, gestacao, peso, sexo, puerperio, local_nasc, apgar1, apgar5} = req.body;
    try {
      await pool.query('INSERT INTO rn_nascimentos (numero,nseq,processo,nome,dta_nascimento,hora,gestacao,peso,sexo,puerperio,local_nasc,apgar1,apgar5) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)', [numero,nseq,processo,nome,dta_nascimento,hora,gestacao,peso,sexo,puerperio,local_nasc,apgar1,apgar5]);
        res.status(200).json({
            message: 'Nascimento foi registado com sucesso!',
            nascimento: {nome, hora, peso}
        })
    } catch (error) {
      res.status(500).json({
          message: 'An error has occured',
          error
      })
  }
}
/*
tecnico.deleteNascimento = async (req, res) => {
  const id = req.params.id_t;
  try {
      await pool.query('DELETE FROM rn_nascimentos WHERE nseq=$1', [id]);
      res.status(200).json({
          message: 'Successful deleted nascimento'
      })
  } catch (error) {
      res.status(500).json({
          message: 'An error has ocurred',
          error
      })
  }
}

*/
module.exports = tecnico;
