
import express from "express";
import tecnico from "../controllers/tecnico";

const router = express.Router();

router.delete('/delete', tecnico.deleteNascimento);

router.post('/nascimento', tecnico.registerNascimento);


module.exports = router;