import express, { Application } from 'express';
import { CONFIG } from './config/dotenv';
import { setupMiddlewareAndRoutes } from './middlewares/setupMiddleware';
import connectDB from './models/index';

const app: Application = express();

setupMiddlewareAndRoutes(app);

const PORT = CONFIG.PORT;

connectDB().then(() => {
  bootstrap();
});
app.use('', () => {
  console.log('API is up and running...'); // replace this with your message.
});

const bootstrap = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('app bootstrap error: ', error);
    process.exit(1);
  }
};
