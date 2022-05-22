CREATE DATABASE ranu;

CREATE TABLE user (
    id_m SERIAL PRIMARY KEY,
    nome_m TEXT NOT NULL,
    email_m TEXT NOT NULL,
    pass_m TEXT NOT NULL,
    tipo TEXT NOT NULL
);

CREATE TABLE medico (
    id_m SERIAL PRIMARY KEY,
    nome_m TEXT NOT NULL,
    email_m TEXT NOT NULL,
    pass_m TEXT NOT NULL
);

CREATE TABLE tecnico (
    id_t SERIAL PRIMARY KEY,
    nome_t TEXT NOT NULL,
    email_t TEXT NOT NULL,
    pass_t TEXT NOT NULL
);

CREATE TABLE rn_nascimentos (
    numero SERIAL,
    nseq INTEGER PRIMARY KEY,
    processo INTEGER NOT NULL,
    nome TEXT NOT NULL,
    dta_nascimento TIMESTAMP,
    hora TEXT,
    gestacao TEXT,
    peso INTEGER,
    sexo TEXT,
    puerperio TEXT,
    local_nascimento TEXT,
    apgar1 TEXT,
    apgar5 TEXT
);

CREATE TABLE rn_primeira(
    numero SERIAL,
    numseq INTEGER NOT NULL REFERENCES rn_nascimentos(nseq),
    avaliacao INTEGER NOT NULL,
    data_avaliacao TIMESTAMP,
    nmec_avaliador INTEGER REFERENCES medico(id_m),
    opcao TEXT,
    data_reavaliacao TIMESTAMP,
    a_reavaliador TEXT
);

CREATE TABLE rn_segunda(
    numero SERIAL,
    nseq INTEGER REFERENCES rn_nascimentos(nseq),
    avaliacao TEXT,
    data_avaliacao TIMESTAMP,
    nmec_avaliador INTEGER REFERENCES medico(id_m)
);

CREATE TABLE rn_terceira(
    numero SERIAL,
    nseq INTEGER REFERENCES rn_nascimentos(nseq),
    avaliacao TEXT,
    data_avaliacao TIMESTAMP,
    nmec_avaliador INTEGER REFERENCES medico(id_m)
);

CREATE TABLE rn_rastreio(
    numero SERIAL,
    numseq INTEGER REFERENCES rn_nascimentos(nseq),
    data_avaliacao TIMESTAMP,
    risco INTEGER,
    nmec_avaliador INTEGER REFERENCES medico(id_m),
    rastreio DECIMAL
);

CREATE TABLE rn_fatoresrisco(
    nseq INTEGER REFERENCES rn_nascimentos(nseq),
    histfam INTEGER,
    infecong INTEGER,
    anomcranio INTEGER,
    hiperbili INTEGER,
    baixopeso INTEGER,
    medototo INTEGER,
    meninbacte INTEGER,
    indexapgar INTEGER,
    ventmec INTEGER,
    hipoacusia INTEGER
);