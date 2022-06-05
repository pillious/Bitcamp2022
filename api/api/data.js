require('dotenv').config();
const ServiceClass = require('../services/data-service');

// GET https://vercel-serverless-hujanais.vercel.app/api/cxkm/en-gb
module.exports = async (req, res) => {
    const service = new ServiceClass();

    try {
        switch (req.method) {
            case 'GET':
                const { filter } = req.query;
                let data = await service.get(JSON.parse(filter));
                res.json({ errorCode: 0, message: 'ok', data: data });
                break;
            default:
                throw new Error(`${req.method} is not allowed`);
        }
    } catch (ex) {
        res.status(500).json(`catch - ${ex}`);
    }
}