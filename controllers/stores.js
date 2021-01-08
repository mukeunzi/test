const { getStoreMap } = require("../utils");

const getStoreListAll = async (req, res, next) => {
	const storeMap = await getStoreMap();
	const storeList = [];
	storeMap.forEach((store) => storeList.push(store));
	return res.json({ result: { storeList } });
};

const getStore = async (req, res, next) => {
	const storeName = req.params.name.toUpperCase();
	const storeMap = await getStoreMap();

	if (!storeMap.has(storeName)) return res.status(404).json({ msg: `존재하지 않는 스토어입니다.` });
	const storeData = storeMap.get(storeName);
	return res.json({ result: storeData });
};

module.exports = { getStoreListAll, getStore };
