import { createConnection, ConnectionOptions } from 'typeorm';
import config from '../../../ormconfig';

const connection = createConnection(config as ConnectionOptions);

export default connection;
