import express from 'express';
import medico from '../controllers/medico';

const router = express.Router();

router.post('/tabInicial', medico.viewNascimentos);

router.post('/historico', medico.registerFatores);

router.post('/tabInicial/:nseq', medico.seeBebe);

router.post('/avaliacao/primeira', medico.registerAvaliacao1);

router.post('/avaliacao/segunda', medico.registerAvaliacao2);

router.post('/avaliacao/terceira', medico.registerAvaliacao3);

router.post('/avaliacao/primeira/:nseq', medico.seeAvaliacao1);

router.post('/avaliacao/segunda/:nseq', medico.seeAvaliacao2);

router.post('/avaliacao/terceira/:nseq', medico.seeAvaliacao3);

module.exports = router;
