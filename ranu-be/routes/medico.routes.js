import express from 'express';
import medico from '../controllers/medico';

const router = express.Router();

router.post('/tabInicial', medico.viewNascimentos);

router.post('/historico/:nseq', medico.registerFatores);

router.post('/tabInicial/:nseq', medico.seeBebe);

router.post('/avaliacao/primeira', medico.registerAvaliacao1);

router.post('/avaliacao/segunda', medico.registerAvaliacao2);

router.post('/avaliacao/terceira', medico.registerAvaliacao3);

router.post('/tabInicial/aval1/:nseq', medico.seeAvaliacao1);

router.post('/tabInicial/aval2/:nseq', medico.seeAvaliacao2);

router.post('/tabInicial/aval3/:nseq', medico.seeAvaliacao3);

router.post('/tabInicial/fase', medico.viewAvaliacao);

router.delete('/delete/:nseq', medico.deleteNascimento);

module.exports = router;
