import { Express, Request, Response } from 'express';

export default (app: Express) => {
    app.get('', (req: Request, res: Response) => {
        res.sendFile('/index.html');
    })
}
