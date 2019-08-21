import checkCookie from './checkCookie';

function applyMiddleWare(app) {
    app.use(checkCookie);
}

export default applyMiddleWare;