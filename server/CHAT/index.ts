import getRouter from './get';

function applyChatRouters(app): void {
    app.use('/chat', getRouter);
}

export default applyChatRouters;