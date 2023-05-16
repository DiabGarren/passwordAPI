/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
const routes = express.Router();

routes.get('/', (req, res, next) => {
    res.render('home');
    next();
});

routes.get('/login', (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&prompt=consent`);
});

routes.get('/login/callback', (req, res) => {
    res.redirect('../../graphql');
});

routes.get('/logout', (req, res) => {
    res.redirect('/');
});

export = routes;