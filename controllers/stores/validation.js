const { ErrorMsg } = require("../../utils/errors");
const { isNumberic, greaterThanZero } = require("../../utils");

const validateNearestStore = (postcode, limit, radius) => {
	if (!postcode) return ErrorMsg({ msg: "우편번호를 입력하세요." }, 404);
	if (!limit && !radius) return true;

	if (limit && !isNumberic(limit)) return ErrorMsg({ msg: "limit에 숫자를 입력하세요." }, 400);
	if (limit && !greaterThanZero(limit)) return ErrorMsg({ msg: "limit은 0보다 커야 합니다." }, 400);

	if (radius && !isNumberic(radius)) return ErrorMsg({ msg: "radius에 숫자를 입력하세요." }, 400);
	if (radius && !greaterThanZero(radius)) return ErrorMsg({ msg: "radius 0보다 커야 합니다." }, 400);

	return true;
};

module.exports = { validateNearestStore };
