import express from 'express';
// import bodyParser from 'body-parser';
// import helmet from 'helmet';
// import morgan from 'morgan';
import cors from 'cors';
// import rateLimit from 'express-rate-limit';
// import addRequestId from 'express-request-id';
// import { genericErrorHandler, notFoundHandler } from 'app/middlewares';
// import { api } from 'app/api';

const server = express();
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100,
//   handler: (response) => {
//     response.status(429).send({ message: 'Too many requests, please try again later.' });
//   },
// });

server.use(cors());

// server.use(addRequestId());
// server.use(limiter);
// server.use(helmet());
// server.use(morgan('tiny'));
// server.use(bodyParser.urlencoded({ extended: false }));
// server.use(bodyParser.json());
// server.use(api);
// server.use(genericErrorHandler());
// server.use(notFoundHandler());

export default server;
