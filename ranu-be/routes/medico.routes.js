import express from 'express';
import medico from '../controllers/medico';

const router = express.Router();

router.get('/tabInicial', medico.viewNascimentos);

router.post('/historico', medico.registerFatores);

router.post('/avaliacao/primeira', medico.registerAvaliacao1);

router.post('/avaliacao/segunda', medico.registerAvaliacao2);

router.post('/avaliacao/terceira', medico.registerAvaliacao3);

module.exports = router;
