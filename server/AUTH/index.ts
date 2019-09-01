import postRouter from './post';
import getRouter from './get';

function applyAuthRouters(app): void {
    app.use('/auth', postRouter);
    app.use('/auth', getRouter);
}

export default applyAuthRouters;