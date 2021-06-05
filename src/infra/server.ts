import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { api } from 'app/api';

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan('tiny'));
server.use(api);

function logErrors(err, req, res, next) {
	console.log('#################');
	console.log('#################');
	console.log('#################');
	console.error(err.stack);
	console.log('#################');
	console.log('#################');
	console.log('#################');
	next(err);
}
server.use(logErrors);

export default server;
