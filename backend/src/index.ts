import express from 'express';
import sequelize from './models';
import routes from './routes';
import cors from './middlewares/cors';
require('dotenv').config()

const app = express();
const PORT = process.env.APP_PORT || process.env.PORT || 5000;

sequelize.authenticate({ logging: false })
  .then(() => console.log('Connection has been established successfully.'))
  .catch((error: any) => console.log('Unable to connect to the database:', error))

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cors
app.use(cors);

// routes
routes(app);

app.get('/', (req, res) => res.send('Express + TypeScript Server'));

if (process.env.NODE_ENV === "production") {
  app.get('/sync', async (req, res) => {
    sequelize.sync({ alter: true });
    res.send('');
  });
}


app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running on port ${PORT}`);
});
 