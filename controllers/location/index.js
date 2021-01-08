const PostcodesIO = require("postcodesio-client");

const searchLatLngByPostcode = async (req, res, next) => {
	const { postcode } = req.query;
	if (!postcode) return res.status(404).json({ msg: `우편번호를 입력하세요.` });

	const postcodes = new PostcodesIO();
	const valid = await postcodes.validate(postcode);
	if (!valid) return res.status(404).json({ msg: `유효하지 않은 우편번호입니다.` });

	const { longitude, latitude } = await postcodes.lookup(postcode);
	return res.json({ result: { longitude, latitude } });
};

module.exports = { searchLatLngByPostcode };
