import toString from "./toString/toString.helper";
import partial from "./partial/partial.helper";
import switchHelper from "./switch/switch.helper";
import routes from "./routes/routes.helper";
import caseHelper from "./case/case.helper";
import defaultHelper from "./default/default.helper";
import withDefault from "./withDefault/withDefault.helper";
import cond from "./cond/cond.helper";
import typeofHelper from "./typeof/typeof.helper";
import objectHelper from "./object/object.helper";
import arrayFrom from "./arrayFrom/arrayFrom.helper";
import numberIntoString from "./numberIntoString/numberIntoString.helper";
import chain from "./chain/chain.helper";
import urlFromParams from "./urlFromParams/urlFromParams.helper";
import spread from "./spread/spread.helper";
import button from "./button/button.helper";
import uuid from "./uuid/uuid.helper";
import raw from "./raw/raw.helper";
import svg from "./svg/svg.helper";
import includes from "./includes/includes.helper";
import baseUrl from "./baseUrl/baseUrl.helper";
import urlPath from "./urlPath/urlPath.helper";
import letHelper from "./let/let.helper";
import fn from "./fn/fn.helper";
import { HelperDeclareSpec } from "handlebars";

export const customHelpers: HelperDeclareSpec = {
	toString,
	partial,
	switch: switchHelper,
	routes,
	case: caseHelper,
	default: defaultHelper,
	withDefault,
	cond,
	typeof: typeofHelper,
	object: objectHelper,
	arrayFrom,
	numberIntoString,
	chain,
	urlFromParams,
	spread,
	button,
	uuid,
	raw,
	svg,
	includes,
	baseUrl,
	urlPath,
	let: letHelper,
	fn,
};
