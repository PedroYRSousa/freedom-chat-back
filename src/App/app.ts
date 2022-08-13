import express from 'express';
import { Express, Request, Response } from 'express';

export default (): Express => {
    const app = express();

    app.get('', (req: Request, res: Response) => {
        res.sendFile(__dirname + '/index.html');
    })

    return (app);
}
