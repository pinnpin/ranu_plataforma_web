import express from 'express';
import medico from '../controllers/medico';

const router = express.Router();

router.post('/tabInicial', medico.viewNascimentos);

router.post('/historico', medico.registerFatores);

router.get("/tabInicial/:nseq", medico.seeBebe);

router.post('/avaliacao/primeira', medico.registerAvaliacao1);

router.post('/avaliacao/segunda', medico.registerAvaliacao2);

router.post('/avaliacao/terceira', medico.registerAvaliacao3);

module.exports = router;
