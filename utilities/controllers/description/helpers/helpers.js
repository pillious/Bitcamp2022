const Description = require("../models/DescriptionModel");

exports.getExistingAnimalNames = async () => {
    let names = [];
    names = await Description.distinct("commonName").catch((err) =>
        console.log(err)
    );
    return names;
}