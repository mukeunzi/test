const fsPromise = require("fs").promises;
const path = require("path");

const currentDir = path.join(__dirname, "../");
const FILENAME = "stores.json";

const asyncWrapper = (fn) => async (req, res, next) => await fn(req, res, next).catch(next);

const getStoreMap = async () => {
	try {
		const strStoreList = await fsPromise.readFile(`${currentDir}/${FILENAME}`, "utf8");
		const storeList = JSON.parse(strStoreList);

		const storeMap = new Map();
		storeList.forEach((store) => {
			const { name, postcode } = store;
			storeMap.set(name.toUpperCase(), { name, postcode });
		});
		return storeMap;
	} catch (error) {
		console.log("error: ", error);
	}
};

module.exports = { asyncWrapper, getStoreMap };
