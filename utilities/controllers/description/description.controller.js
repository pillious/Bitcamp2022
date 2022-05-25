const Description = require("./models/DescriptionModel");
const helpers = require("./helpers/helpers");

exports.fetch_description_page = async (req, resp) => {
    resp.render("addDescription", {
        names: await helpers.getExistingAnimalNames(),
    });
};

exports.add_description = async (req, resp) => {
    let respmsg = "An error occured.";
    let desc;

    const {
        common_name: commonName,
        scientific_name: scientificName,
        description,
        citations,
    } = req.body;
    if (
        commonName.trim() != "" &&
        scientificName.trim() != "" &&
        description.trim() != ""
    ) {
        let citationsArr = [];
        if (citations.trim() != "")
            citationsArr = citations
                .split(",")
                .map((c) => c.trim())
                .filter((c) => c != "");

        desc = new Description({
            commonName: commonName.trim().toUpperCase(),
            scientificName: scientificName.trim().toUpperCase(),
            body: description.trim(),
            citations: citationsArr,
        });

        await desc.save();
        respmsg = "Successfully added description to database!";
    }

    resp.send({ respmsg, data: desc });
};

exports.update_description = async (req, resp) => {
    let respmsg = "An error occured.";
    let desc;
    let namesInDb;

    const {
        existing_common_name: existingCommonName,
        common_name: newCommonName,
        scientific_name: scientificName,
        description,
        citations,
    } = req.body;

    if (existingCommonName.trim() != "") {
        namesInDb = await helpers.getExistingAnimalNames();

        if (namesInDb.includes(existingCommonName.trim().toUpperCase())) {
            let query = {};

            if (newCommonName.trim() != "") {
                query = { ...query, commonName: newCommonName.trim() };
            }
            if (scientificName.trim() != "") {
                query = { ...query, scientificName: scientificName.trim() };
            }
            if (description.trim() != "") {
                query = { ...query, description: description.trim() };
            }
            if (citations) {
                citationsArr = citations
                    .split(",")
                    .map((c) => c.trim())
                    .filter((c) => c != "");
                query = { ...query, citations: citationsArr };
            }

            desc = await Description.findOneAndUpdate(
                { commonName: existingCommonName.trim().toUpperCase() },
                query,
                { new: true }
            );

            respmsg = "Successfully updated description!";
        } else {
            respmsg = `No animal named: '${existingCommonName}'`;
        }

    }

    resp.send({ respmsg, data: desc });
};
