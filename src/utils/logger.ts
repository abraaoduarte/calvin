import winston, { addColors, createLogger, transports } from 'winston';

const { timestamp: datetime, combine, printf, errors, colorize, json } = winston.format;

const levels = {
	error: 0,
	warn: 1,
	info: 2,
	http: 3,
	debug: 4,
};

const setLevel = () => {
	const environment = process.env.NODE_ENV || 'development';
	const isDevelopment = environment === 'development';
	return isDevelopment ? 'debug' : 'warn';
};

const logColors = {
	error: 'red',
	warn: 'yellow',
	info: 'green',
	http: 'magenta',
	debug: 'cyan',
};

addColors(logColors);

const logFormat = printf(({ level, message, timestamp, stack }) => `${timestamp} ${level}: ${stack || message}`);

const format = combine(
	colorize(),
	json(),
	datetime({ format: 'YYYY-MM-DD HH:mm:ss' }),
	errors({ stack: true }),
	logFormat
);

const Logger = createLogger({
	level: setLevel(),
	levels,
	format,
	transports: [new transports.Console()],
});

export default Logger;
