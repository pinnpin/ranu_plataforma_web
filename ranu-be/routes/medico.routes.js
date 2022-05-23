import express from 'express';
import medico from '../controllers/medico';

const router = express.Router();

router.post('/nascimento', medico.registerNascimento);

module.exports = router;
