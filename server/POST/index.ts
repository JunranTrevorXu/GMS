import loginRouter from './login';

function applyPostRouters(app): void {
    app.use('/login', loginRouter);
}

export default applyPostRouters;