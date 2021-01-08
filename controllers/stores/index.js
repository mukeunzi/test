const PostcodesIO = require("postcodesio-client");
const Axios = require("axios");

const { getStoreMap, getPostcodeMap } = require("../../utils");
const validation = require("./validation");

Axios.defaults.baseURL = "https://api.postcodes.io";

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

const searchNearestStoreByPostcode = async (req, res, next) => {
	const { postcode, limit, radius } = req.query; // limit, radius는 optional 속성
	validation.validateNearestStore(postcode, limit, radius); // querystring 유효성 검증

	const postcodes = new PostcodesIO();
	const valid = await postcodes.validate(postcode);
	if (!valid) return res.status(404).json({ msg: `유효하지 않은 우편번호입니다.` });

	const postcodeMap = await getPostcodeMap(); // key가 우편번호인 Map 데이터 가져옴

	const { data } = await Axios.get(`/postcodes/${postcode}/nearest?limit=${limit}&radius=${radius}`); // 가까운 우편번호를 가져오는 API
	const nearestStoreList = data.result.reduce((acc, store) => {
		// data중 stores.json에 저장된 우편번호만 누적
		const { postcode, latitude } = store;
		if (!postcodeMap.has(postcode)) return acc;

		const storeData = postcodeMap.get(postcode);
		return acc.concat({ name: storeData.name, postcode, latitude }); // 정렬을 위해 위도도 함께 누적
	}, []);

	nearestStoreList.sort((a, b) => b.latitude - a.latitude); // 위도를 기준으로 내림차순 정렬
	const storeList = nearestStoreList.map((store) => {
		// store 데이터에서 위도를 제외시키기 위함
		const { name, postcode } = store;
		return { name, postcode };
	});

	return res.json({ result: storeList });
};

module.exports = { getStoreListAll, getStore, searchNearestStoreByPostcode };
