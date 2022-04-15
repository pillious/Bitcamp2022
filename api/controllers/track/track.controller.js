const Track = require("./models/TrackModel.model");
const constants = require("../../utils/constants");
const utils = require("../../utils/utils");

exports.animal_by_name = async (req, resp) => {
    let docs;
    let query = {};
    let limit;
    if (req.params.name) {
        query.animalName = req.params.name.trim().toUpperCase();

        if (req.body && req.body.limit && utils.isNumeric(req.body.limit))
            limit = parseInt(req.body.limit);
        else limit = constants.DEFAULT_LIMIT;

        docs = await Track.find(query).limit(limit);
    }
    resp.status(200).send(docs);
};

exports.animal_by_id = async (req, resp) => {
    let docs;
    let query = {};
    let limit;
    if (req.params.name) {
        query.animalId = req.params.id.trim();

        if (req.body && req.body.limit && utils.isNumeric(req.body.limit))
            limit = parseInt(req.body.limit);
        else limit = constants.DEFAULT_LIMIT;

        docs = await Track.find(query).limit(limit);
    }

    resp.status(200).send(docs);
};

exports.distinct_animals = async (req, resp) => {
    let docs;
    docs = await Track.distinct("animalName");
    resp.status(200).send(docs);
};
