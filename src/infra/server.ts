import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { api } from 'app/api';
import { handleError, handleNotFound } from 'app/middlewares';

const server = express();

server.use(cors());
server.use(morgan('tiny'));
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(api);
server.use(handleError());
server.use(handleNotFound());

export default server;
