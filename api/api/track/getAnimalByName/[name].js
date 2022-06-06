const Track = require("../../../models/TrackModel.model");
const Description = require("../../../models/DescriptionModel.model");
const constants = require("../../../utils/constants");
const utils = require("../../../utils/utils");
const dbConnect = require("../../../utils/database");

module.exports = async (req, res) => {
    try {
        switch (req.method) {
            case "POST":
                await dbConnect();

                let data;
                let query = {};
                let limit;
                if (req?.query.name) {
                    query.animalName = req.query.name.trim().toUpperCase();

                    if (req?.body?.limit && utils.isNumeric(req.body.limit))
                        limit = parseInt(req.body.limit);
                    else limit = constants.DEFAULT_LIMIT;

                    // Runs the API requests in parallel.
                    let [docs, desc] = await Promise.all([
                        Track.find(query).limit(limit),
                        Description.findOne({ commonName: query.animalName }),
                    ]);

                    data = {markers: docs, desc};
                }

                res.json({ status: 200, message: "ok", data });
                break;
            default:
                throw new Error(`${req.method} is not allowed`);
        }
    } catch (ex) {
        res.status(500).json(`catch - ${ex}`);
    }
};
