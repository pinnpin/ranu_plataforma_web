import { json, query } from 'express';
import { appendFile } from 'fs';
import { ParameterStatusMessage } from 'pg-protocol/dist/messages';
import pool from '../database/keys';

const medico = {};

// Tabela de pacientes

medico.viewNascimentos = async (req, res) => {
    try {
        const nascimentos = await (await pool.query('SELECT * FROM rn_nascimentos')).rows;
        res.status(200).json(nascimentos);
    } catch (error) {
        res.status(500).json({
            message: 'An error has ocurred',
            error
        });
    }
};

//Ver info total do paciente

medico.seeBebe = async (req, res) => {
    const nseq = req.params.nseq;
    try {
        const nascimentos = await (await pool.query("SELECT * FROM rn_nascimento WHERE nseq=$1", [nseq])).rows[0];
        res.status(200).json({nascimentos});
    } catch (error) {
        res.status(500).json({
            message: 'An error has ocurred',
            error
        })
    }
}

// Apagar info bebe



//Registar fatores de risco
medico.registerFatores = async (req, res) => {
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
//Fase da Avaliação FALTA LIGAR AO FRONTEND 

medico.viewAvaliacao = async (req,res) => {
    try {
        const avaliacao1 = await pool.query('IF EXISTS (SELECT FROM rn_primeira p WHERE p.avaliacao IS NULL) THEN RETURN 0 END IF;')
        const avaliacao2 = await pool.query('IF EXISTS (SELECT FROM rn_segunda s WHERE s.avaliacao IS NULL) THEN RETURN 0 END IF;')
        const avaliacao3 = await pool.query('IF EXISTS (SELECT FROM rn_terceira t WHERE t.avaliacao IS NULL) THEN RETURN 0 END IF;')
        if (avaliacao1 == "0" || avaliacao2 == "0" || avaliacao3 == "0") {
            res.status(200).json(avaliacao1 || avaliacao2 || avaliacao3);
        }
    } catch (error) {
        res.status(500).json({
            message: 'An error has ocurred',
            error
        })
}
}
//EM QUE FASE ESTÁ A AVALIAÇÃO DO OH BABY BABY YOU KILLING MEEEEEEEEEEE



//Registar Avaliações (1,2,3)
medico.registerAvaliacao1 = async (req,res) => {
    const {numero, numseq, avaliacao, data_avaliacao, nmec_avaliador, opcao, data_reavaliacao, a_reavaliador} = req.body;
    try {
        await pool.query('INSERT INTO rn_primeira (numero, numseq, avaliacao, data_avaliacao, nmec_avaliador, opcao, data_reavaliacao, a_reavaliador) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [numero, numseq, avaliacao, data_avaliacao, nmec_avaliador, opcao, data_reavaliacao, a_reavaliador]);
        const avaliacao1 = await (await pool.query('SELECT * FROM rn_primeira ORDER BY numero DESC LIMIT 1')).rows[0];
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

medico.registerAvaliacao2 = async (req,res) => {
    const {numero, numseq, avaliacao, data_avaliacao, nmec_avaliador} = req.body;
    try {
        await pool.query('INSERT INTO rn_primeira (numero, numseq, avaliacao, data_avaliacao, nmec_avaliador) VALUES ($1, $2, $3, $4, $5)', [numero, numseq, avaliacao, data_avaliacao, nmec_avaliador]);
            res.status(200).json({
                message: 'A segunda avaliação foi registada com sucesso!',
                data_avaliacao
            })
    } catch (error) {
        res.status(500).json({
            message: 'An error has occured',
            error
        })
    }
}

medico.registerAvaliacao3 = async (red,res) => {
    const {numero, numseq, avaliacao, data_avaliacao, nmec_avaliador} = req.body;
    try {
        await pool.query('INSERT INTO rn_primeira (numero, numseq, avaliacao, data_avaliacao, nmec_avaliador) VALUES ($1, $2, $3, $4, $5)', [numero, numseq, avaliacao, data_avaliacao, nmec_avaliador]);
            res.status(200).json({
                message: 'A terceira avaliação foi registada com sucesso!',
                data_avaliacao
            })
    } catch (error) {
        res.status(500).json({
            message: 'An error has occured',
            error
        })
    }
}


module.exports = medico;
