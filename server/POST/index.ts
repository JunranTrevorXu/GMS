import authRouter from './auth';

function applyPostRouters(app): void {
    app.use('/auth', authRouter);
}

export default applyPostRouters;