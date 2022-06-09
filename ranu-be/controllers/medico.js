
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
            message: 'Ocorreu um erro!',
            error
        });
    }
};


//Ver info total do paciente

medico.seeBebe = async (req, res) => {
    const nseq = req.params.nseq;
    try {
        const info = await (await pool.query('SELECT * FROM rn_nascimentos WHERE nseq=$1', [nseq])).rows[0];
        res.status(200).json({info});
    } catch (error) {
        res.status(500).json({
            message: 'Ocorreu um erro!',
            error
        })
    }
}

// Apagar info bebe



//Registar fatores de risco
medico.registerFatores = async (req, res) => {
    const {nseq, histfam, infecong, anomcranio, hiperbili, baixopeso, medototo, meninbacte, indexapgar, ventmec, hipoacusia} = req.body;
    try {
        await pool.query('INSERT INTO rn_fatoresrisco (nseq, histfam, infecong, anomcranio, hiperbili, baixopeso, medototo, meninbacte, indexapgar, ventmec, hipoacusia) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)', [nseq, histfam, infecong, anomcranio, hiperbili, baixopeso, medototo, meninbacte, indexapgar, ventmec, hipoacusia]);
        const fatores = await(await pool.query('SELECT * FROM rn_fatoresrisco ORDER BY nseq DESC LIMIT 1')).rows[0];
        res.status(200).json({
            message: 'Fatores de risco registados!',
            fatores
        })
    } catch (error) {
      res.status(500).json({
          message: 'Ocorreu um erro!',
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
            message: 'Ocorreu um erro!',
            error
        })
}
}

//Registar Avaliações (1,2,3)
medico.registerAvaliacao1 = async (req,res) => {
    const {numero, numseq, avaliacao, data_avaliacao, nmec_avaliador, opcao, data_reavaliacao, a_reavaliador} = req.body;
    try {
        await pool.query('INSERT INTO rn_primeira (numero, numseq, avaliacao, data_avaliacao, nmec_avaliador, opcao, data_reavaliacao, a_reavaliador) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [numero, numseq, avaliacao, data_avaliacao, nmec_avaliador, opcao, data_reavaliacao, a_reavaliador]);
        const avaliacao1 = await (await pool.query('SELECT * FROM rn_primeira ORDER BY numero DESC LIMIT 1')).rows[0];
        res.status(200).json({
                message: 'A primeira avaliação foi registada com sucesso!',
                avaliacao1
            })
    } catch (error) {
        res.status(500).json({
            message: 'Ocorreu um erro!',
            error
        })
    }
}

medico.registerAvaliacao2 = async (req,res) => {
    const {numero, nseq, avaliacao, data_avaliacao, nmec_avaliador} = req.body;
    try {
        await pool.query('INSERT INTO rn_segunda (numero, nseq, avaliacao, data_avaliacao, nmec_avaliador) VALUES ($1, $2, $3, $4, $5)', [numero, nseq, avaliacao, data_avaliacao, nmec_avaliador]);
        const avaliacao2 = await (await pool.query('SELECT * FROM rn_segunda ORDER BY numero DESC LIMIT 1')).rows[0];
        res.status(200).json({
                message: 'A segunda avaliação foi registada com sucesso!',
                avaliacao2
            })
    } catch (error) {
        res.status(500).json({
            message: 'Ocorreu um erro!',
            error
        })
    }
}

medico.registerAvaliacao3 = async (req,res) => {
    const {numero, nseq, avaliacao, data_avaliacao, nmec_avaliador} = req.body;
    try {
        await pool.query('INSERT INTO rn_terceira (numero, nseq, avaliacao, data_avaliacao, nmec_avaliador) VALUES ($1, $2, $3, $4, $5)', [numero, nseq, avaliacao, data_avaliacao, nmec_avaliador]);
        const avaliacao2 = await (await pool.query('SELECT * FROM rn_terceira ORDER BY numero DESC LIMIT 1')).rows[0];
        res.status(200).json({
                message: 'A terceira avaliação foi registada com sucesso!',
                avaliacao2
            })
    } catch (error) {
        res.status(500).json({
            message: 'Ocorreu um erro!',
            error
        })
    }
}

//Ver info Avaliações
medico.seeAvaliacao1 = async (req, res) => {
    const nseq = req.params.nseq;
    try {
        const info1 = await (await pool.query('SELECT * FROM rn_primeira WHERE numseq=$1', [nseq])).rows[0];
        res.status(200).json({info1});
    } catch (error) {
        res.status(500).json({
            message: 'Ocorreu um erro!',
            error
        })
    }
}

medico.seeAvaliacao2 = async (req, res) => {
    const nseq = req.params.nseq;
    try {
        const info2 = await (await pool.query('SELECT * FROM rn_segunda WHERE numseq=$1', [nseq])).rows[0];
        res.status(200).json({info2});
    } catch (error) {
        res.status(500).json({
            message: 'Ocorreu um erro!',
            error
        })
    }
}

medico.seeAvaliacao3 = async (req, res) => {
    const nseq = req.params.nseq;
    try {
        const info3 = await (await pool.query('SELECT * FROM rn_terceira WHERE numseq=$1', [nseq])).rows[0];
        res.status(200).json({info3});
    } catch (error) {
        res.status(500).json({
            message: 'Ocorreu um erro!',
            error
        })
    }
}



module.exports = medico;