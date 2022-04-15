const Description = require("./models/DescriptionModel.model");

exports.description_by_name = async (req, resp) => {
    let doc;

    if (req.params.name) {
        doc = await Description.findOne({
            commonName: req.params.name.trim().toUpperCase(),
        });
    }

    resp.status(200).send(doc);
};
