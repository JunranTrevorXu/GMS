import getRouter from './get';
import postRouter from './post';

function applyUserRouters(app) {
    app.use('/user', getRouter);
    app.use('/user', postRouter);
}

export default applyUserRouters;