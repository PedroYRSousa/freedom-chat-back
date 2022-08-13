import express from 'express';
import { Express, Request, Response } from 'express';

export default (): Express => {
    const app = express();

    app.use(express.json());
    app.use(express.static('public'));
    app.use(express.urlencoded({ extended: false }));

    app.get('', (req: Request, res: Response) => {
        res.sendFile('/index.html');
    })

    return (app);
}
