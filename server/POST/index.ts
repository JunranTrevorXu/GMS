import loginRouter from './login';

function applyPostRouters(app) {
    app.use('/login', loginRouter);
}

export default applyPostRouters;