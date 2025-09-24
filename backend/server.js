import express from 'express';

const app = express();
const PORT = 3000;

import cors from 'cors';
app.use(cors());


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
