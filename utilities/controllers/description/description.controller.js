const Description = require("./models/DescriptionModel");

exports.fetch_description_page = async (req, resp) => {
    let names = [];
    names = await Description.distinct("commonName").catch((err) =>
        console.log(err)
    );

    resp.render("addDescription", { names });
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

        desc = new Description({
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
