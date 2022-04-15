const path = require("path");

exports.fetch_description_page = (req, resp) => {
    resp.sendFile(
        path.join(
            __dirname,
            "..",
            "..",
            "public",
            "views",
            "addDescription.html"
        )
    );
};

exports.add_description = async (req, resp) => {
    let respmsg = "An error occured.";
    let desc;

    const { commonName, scientificName, description, citations } = req.body;
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

        desc = new descriptionModel({
            commonName: commonName.trim().toUpperCase(),
            scientificName: scientificName.trim().toUpperCase(),
            body: description.trim(),
            citations: citationsArr,
        });

        await desc.save();
        respmsg = "Successfully added description to databse!";
    }

    resp.send({ respmsg, data: desc });
};
