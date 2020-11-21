/*
ライフ
*/



"use strict";

exports.mod = () => {
    
    if (!serverConfig.rebuildCache) {
        return;
    }

    logger.logInfo("Caching: life-LifeMechanisms");

    let base = fileIO.parse(fileIO.read(db.user.cache.items));

    for (let file in base.data) {
        let fileData = base.data[file];
        // adding ability to wear custom helmets
        if (fileData._name === "Default Inventory") {
            fileData._props.Slots[5]._props.filters[0].Filter = ["5a341c4086f77401f2541505"];
            };
        // adding ability to wear custom headsets
        if (fileData._name == "Default Inventory") {
            fileData._props.Slots[11]._props.filters[0].Filter = ["5645bcb74bdc2ded0b8b4578"];
            };
            
            base.data[fileData._id] = fileData;
        //  adding custom ammo to other weapons with same caliber
        if ((fileData._props.defAmmo) && (fileData._props.defAmmo == "5cc80f38e4a949001152b560")) {
            let filter = fileData._props.Chambers[0]._props.filters[0].Filter 
            filter.push("57Death");
            }
        // adding custom ammo to magazines with same caliber
        if ((fileData._id) && (fileData._id == "5cc70093e4a949033c734312" || fileData._id == "5d3eb5eca4b9363b1f22f8e4")) {
            let mag = fileData._props.Cartridges[0]._props.filters[0].Filter
            mag.push("57Death");
            }
        }
        fileIO.write("user/cache/items.json", base);
}