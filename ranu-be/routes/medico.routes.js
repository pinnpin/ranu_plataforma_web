import express from 'express';
import medico from '../controllers/medico';

const router = express.Router();

router.get('/tabInicial', medico.viewNascimentos);

module.exports = router;
