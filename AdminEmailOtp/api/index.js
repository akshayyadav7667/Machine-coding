import express from 'express'
import connectDb from './config/db.js';
import adminRouter from './routes/admin.js'
const app= express();


app.use(express.json())
const PORT=5000;

connectDb();


app.use('/api/admin',adminRouter)



app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});