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

//EM QUE FASE ESTÁ A AVALIAÇÃO DO OH BABY BABY YOU KILLING MEEEEEEEEEEE



//Registar Avaliações (1,2,3)
medico.registerAvaliacao1 = async (red,res) => {
    const {numero, numseq, avaliacao, data_avaliacao, nmec_avaliador, opcao, data_reavaliacao, a_reavaliador} = req.body;
    try {
        await pool.query('INSERT INTO rn_primeira (numero, numseq, avaliacao, data_avaliacao, nmec_avaliador, opcao, data_reavaliacao, a_reavaliador) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [numero, numseq, avaliacao, data_avaliacao, nmec_avaliador, opcao, data_reavaliacao, a_reavaliador]);
            res.status(200).json({
                message: 'A primeira avaliação foi registada com sucesso!',
                data_avaliacao
            })
    } catch (error) {
        res.status(500).json({
            message: 'An error has occured',
            error
        })
    }
}

medico.registerAvaliacao2 = async (red,res) => {
    const {numero, nseq, avaliacao, data_avaliacao, nmec_avaliador} = req.body;
    try {
        await pool.query('INSERT INTO rn_segunda (numero, nseq, avaliacao, data_avaliacao, nmec_avaliador) VALUES ($1, $2, $3, $4, $5)', [numero, nseq, avaliacao, data_avaliacao, nmec_avaliador]);
            res.status(200).json({
                message: 'A segunda avaliação foi registada com sucesso!',
                data_avaliacao
            })
    } catch (error) {
        res.status(500).json({
            message: 'An error has occured!',
            error
        })
    }
}

medico.registerAvaliacao3 = async (red,res) => {
    const {numero, nseq, avaliacao, data_avaliacao, nmec_avaliador} = req.body;
    try {
        await pool.query('INSERT INTO rn_terceira (numero, nseq, avaliacao, data_avaliacao, nmec_avaliador) VALUES ($1, $2, $3, $4, $5)', [numero, nseq, avaliacao, data_avaliacao, nmec_avaliador]);
            res.status(200).json({
                message: 'A terceira avaliação foi registada com sucesso!',
                data_avaliacao
            })
    } catch (error) {
        res.status(500).json({
            message: 'An error has occured!',
            error
        })
    }
}

module.exports = medico;