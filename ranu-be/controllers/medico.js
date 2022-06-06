import { json, query } from 'express';
import { ParameterStatusMessage } from 'pg-protocol/dist/messages';
import pool from '../database/keys';

const medico = {};

// Tabela de pacientes

medico.viewNascimentos = async (req, res) => {
    try {
        const nascimentos = await pool.query('SELECT * FROM rn_nascimentos');
        res.status(200).json(nascimentos);
    } catch (error) {
        res.status(500).json({
            message: 'An error has ocurred',
            error
        })
    }
}

//Registar fatores de risco
medico.registerFatores = async (red, res) => {
    const {nseq, histfam, infecong, anomcranio, hiperbili, baixopeso, medototo, meninbacte, indexapgar, ventmec, hipoacusia} = req.body;
    try {
      await pool.query('INSERT INTO rn_fatoresderisco (nseq, histfam, infecong, anomcranio, hiperbili, baixopeso, medototo, meninbacte, indexapgar, ventmec, hipoacusia) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)', [nseq, histfam, infecong, anomcranio, hiperbili, baixopeso, medototo, meninbacte, indexapgar, ventmec, hipoacusia]);
        res.status(200).json({
            message: 'Fatores de risco registados!',
            nascimento: {nseq}
        })
    } catch (error) {
      res.status(500).json({
          message: 'An error has occured',
          error
      })
  }
}

module.exports = medico;