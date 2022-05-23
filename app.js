import morgan from 'morgan';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import history from 'connect-history-api-fallback';
import path from 'path';

const express = require('express');

const app = express();

// Middlewares
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload({useTempFiles: true}));
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/auth.routes'));
app.use('/medico', require('./routes/medico.routes'));


// Settings
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), ()=>{
    console.log('Server on port ' + app.get('port'));
})