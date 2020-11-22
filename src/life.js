/*
ライフ
*/



"use strict";

exports.mod = (mod_data) => {
    
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
    //trying to add custom categories
    let ModFolderName = `${mod_data.author}-${mod_data.name}-${mod_data.version}`;
	let ModFolders = mod_data.containers;
	let ModFileNames = mod_data.cats;
    let PathResolver = global.internal.path.resolve;
    //load the cached files we need
    let locale_en = global.fileIO.readParsed(PathResolver('user/cache/locale_en.json'));
    let templates = global.fileIO.readParsed(PathResolver('user/cache/templates.json'));
    let trader = fileIO.readParsed(PathResolver(global.db.cacheBase.traders.ragfair + "base.json"));
    let trade = fileIO.readParsed(PathResolver(global.db.cacheBase.traders.ragfair + "categories.json"));
    // now to add the categories
    let tDataBase = {};
    for(let folder of ModFolders) {
        tDataBase[folder] = {};
        for(let file of ModFileNames) {
            let fileData = global.fileIO.readParsed(PathResolver(`user/mod/${ModFolderName}/${folder}/${file}.json`));

            tDataBase[folder][file] = fileData;
        }
    }
    for(let item in tDataBase["categories/templates"]) {
        templates.data.Categories.push(tDataBase["categories/templates"][item]);
    }
    for(let item in tDataBase["categories/handbook"]) {
        let itemData = tDataBase["categories/handbook"][item];
        locale_en.handbook[item] = itemData;
    }
    let name = "LifeMechs";
    let fileData = trader.data;
    if(fileData.sell_category) {
        sell_category.push(name);
    }
    for(let item in tDataBase["categories/traders"]) {
        let itemData = tDataBase["categories/traders"][item];
        trade[item] = itemData;
    }
    fileIO.write(PathResolver('user/cache/locale_en.json'), locale_en, true);
	fileIO.write(PathResolver('user/cache/templates.json'), templates, true);
    fileIO.write(PathResolver(global.db.cacheBase.traders.ragfair + "base.json", trader));
    fileIO.write(PathResolver(global.db.cacheBase.traders.ragfair + "categories.json", trade));
	logger.logSuccess("[MOD] LifeMechanisms; Applied");
}