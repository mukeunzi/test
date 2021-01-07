const { getStoreMap } = require("../utils");

const getStoreListAll = async (req, res, next) => {
	const storeMap = await getStoreMap();
	const storeList = [];
	storeMap.forEach((store) => storeList.push(store));
	return res.json({ result: { storeList } });
};

module.exports = { getStoreListAll };
