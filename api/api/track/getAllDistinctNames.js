const Track = require("../../models/TrackModel.model");
const dbConnect = require("../../utils/database");

module.exports = async (req, res) => {
    try {
        switch (req.method) {
            case "POST":
                await dbConnect();

                let data = await Track.distinct("animalName");
                res.json({ status: 200, message: "ok", data });
                break;
            default:
                throw new Error(`${req.method} is not allowed`);
        }
    } catch (ex) {
        res.status(500).json(`catch - ${ex}`);
    }
};
