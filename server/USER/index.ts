import postRouter from './post';

function applyUserRouters(app) {
    app.use('/user', postRouter);
}

export default applyUserRouters;