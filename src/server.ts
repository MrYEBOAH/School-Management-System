import Express, { Application, Request, Response, NextFunction } from "express";;
import cors from "cors";
const app: Application = Express();

const PORT = 3000;

app.use(Express.json({ limit: "10mb"}));
app.use(cors({ credentials: true, origin: true}));

app.use(Express.urlencoded({ extended: true}));

interface ErrorWithStatus{
    status?: 400;
    message?: 'Server error';
}

app.use((err: ErrorWithStatus, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json({
        statusbar: err.status,
        Error: err.message,
    });
});

import indexRoute from "../src/routes/admin.route";
app.use(indexRoute);

app.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}`);
});

