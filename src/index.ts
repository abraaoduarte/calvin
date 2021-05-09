/* eslint-disable no-console */
import { server } from 'infra/server';
import { listen } from 'infra/listen';
// import { env } from 'utils/env';
// import patch from 'console-stamp';

// import { setLocale } from 'yup';
// import { pt } from 'yup-locale-pt';

// setLocale(pt);

// patch(console, { pattern: 'yyyy-mm-dd HH:MM-ss' });

const start = () => listen(server)
  .then(() => {
    console.log(`PORT: ${3000}`);
    console.log('SERVER STARTED');
  })
  .catch((error) => {
    console.error(error);
  });

start();