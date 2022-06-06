import { json, query } from 'express';
import { ParameterStatusMessage } from 'pg-protocol/dist/messages';
import pool from '../database/keys';

const medico = {};

// NASCIMENTOS
/*
medico.registerNascimento = async (req, res)=>{
    const {numero, nseq, processo, nome, dta_nascimento, hora, gestacao, peso, sexo, puerperio, local_nascimento, apgar1, apgar5} = req.body;
    console.log(numero, nseq, processo, nome, dta_nascimento, hora, gestacao, peso, sexo, puerperio, local_nascimento, apgar1, apgar5)
    try {
        await pool.query('INSERT INTO rn_nascimentos (numero, nseq, processo, nome, dta_nascimento, hora, gestacao, peso, sexo, puerperio, local_nascimento, apgar1, apgar5) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)', [numero,nseq,processo,nome,dta_nascimento,hora,gestacao,peso,sexo,puerperio,local_nascimento,apgar1,apgar5]);
        //const nascimento = await (await pool.query('SELECT * FROM rn_nascimentos ORDER BY numero DESC LIMIT 1')).rows[0]; 
        res.status(200).json({
            message: 'Nascimento foi registado com sucesso!',
            nascimento: {nome, hora, peso}
        })
    } catch {
        res.status(500).json({
            message: 'An error has occured',
        })
    }
};
*/
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



module.exports = medico;