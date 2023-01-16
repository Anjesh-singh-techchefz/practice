import mongoose from 'mongoose';
import express from 'express';
import router from './routes/userRoutes';
const app = express();
app.use(express.json());
app.use(router);

mongoose.connect('mongodb://localhost/Practice', () => {
  console.log('>>>>>>>>>>>>>>>>>> MongoDB connected >>>>>>>>>>>>>>>>>>');
});

app.listen(3000, () => {
  console.log(
    '========================= Application Started =========================='
  );
});

export default app;
