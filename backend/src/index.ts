import express from 'express';
import sequelize from './models';
import routes from './routes';
require('dotenv').config()

const app = express();
const PORT = process.env.APP_PORT || 5000;

sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch((error: any) => console.log('Unable to connect to the database:', error))

app.use(express.json());
app.use(express.urlencoded());

routes(app);

app.get('/', (req, res) => res.send('Express + TypeScript Server'));

app.get('/sync', async (req, res) => {
  sequelize.sync({ alter: true });
  res.send('');
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
 