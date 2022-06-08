import pool from "../database/keys";

const authentication = {};

authentication.signUp = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (role == "medico") {
    try {
      await pool.query(
        "INSERT INTO medico (nome_m, email_m, pass_m) VALUES ($1, $2, $3)",
        [name, email, password]
      );
      res.status(200).json({
        message: "Médico registado com sucesso!",
        professor: { name, email, password },
      });
    } catch (error) {
      if (error.constraint == "medico_nome_m_key") {
        res.status(500).json({
          message: "Someone is already using that email.",
          error,
        });
      } else {
        res.status(500).json({
          message: "An error has ocurred",
          error,
        });
      }
    }
  } else {
    try {
      await pool.query(
        "INSERT INTO tecnico (nome_t, email_t, pass_t) VALUES ($1, $2, $3)",
        [name, email, password]
      );
      res.status(200).json({
        message: "Successful registred tecnico",
        professor: { name, email, password },
      });
    } catch (error) {
      if (error.constraint == "tecnico_email_t_key") {
        res.status(500).json({
          message: "Someone is already using that email",
          error,
        });
      } else {
        res.status(500).json({
          message: "An error has ocurred",
          error,
        });
      }
    }
  }
};

authentication.signIn = async (req, res) => {
    const { email, password, role } = req.body;
    if (role == "medico") {
      try {
        const medico = await (
          await pool.query(
            "SELECT * FROM medico WHERE email_m=$1 AND pass_m=$2",
            [email, password]
          )
        ).rows;
        if (medico.length > 0) {
          res.status(200).json({
            id: medico[0].id_m,
            name: medico[0].nome_m,
            email: medico[0].email_m,
            role: "medico",
          });
        } else {
          res.status(200).json({
            message: "The medico does not exist",
            NotFound: true,
          });
        }
      } catch (error) {
        res.status(500).json({
          message: "An error has occured",
          error,
        });
      }
    } else {
      try {
        const tecnico = await (
          await pool.query(
            "SELECT * FROM tecnico WHERE email_t=$1 AND pass_t=$2",
            [email, password]
          )
        ).rows;
        if (tecnico.length > 0) {
          res.status(200).json({
            id: tecnico[0].id_t,
            name: tecnico[0].nome_t,
            email: tecnico[0].email_t,
            role: "tecnico",
          });
        } else {
          res.status(200).json({
            message: "The tecnico does not exist",
            NotFound: true,
          });
        }
      } catch (error) {
        res.status(500).json({
          message: "An error has ocured",
          error,
        });
      }
    }
  };

module.exports = authentication;