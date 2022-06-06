import express from "express";
import tecnico from "../controllers/tecnico";

const router = express.Router();

//router.delete('/nascimento/:id_t', tecnico.deleteNascimento);

router.post('/nascimento', tecnico.registerNascimento);


module.exports = router;

