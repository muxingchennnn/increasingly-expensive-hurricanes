import { getContext, setContext } from "svelte";

const hurricaneDataKey = {};
const landfallDataKey = {};
const aggregatedDataKey = {};
const hoveredDotKey = {};
const hoveredTrackKey = {};
const dblclickedTrackKey = {};
const hoveredDataKey = {};
const BrushedDataKey = {};

/** @param {User} user */
export function setHurricaneDataContext(user) {
	setContext(hurricaneDataKey, user);
}

export function getHurricaneDataContext() {
	return /** @type {User} */ (getContext(hurricaneDataKey));
}

/** @param {User} user */
export function setLandfallDataContext(user) {
	setContext(landfallDataKey, user);
}

export function getLandfallDataContext() {
	return /** @type {User} */ (getContext(landfallDataKey));
}

/** @param {User} user */
export function setAggregatedDataContext(user) {
	setContext(aggregatedDataKey, user);
}

export function getAggregatedDataContext() {
	return /** @type {User} */ (getContext(aggregatedDataKey));
}

/** @param {User} user */
export function setHoveredDotContext(user) {
	setContext(hoveredDotKey, user);
}

export function getHoveredDotContext() {
	return /** @type {User} */ (getContext(hoveredDotKey));
}

/** @param {User} user */
export function setHoveredTrackContext(user) {
	setContext(hoveredTrackKey, user);
}

export function getHoveredTrackContext() {
	return /** @type {User} */ (getContext(hoveredTrackKey));
}

/** @param {User} user */
export function setDblclickedTrackContext(user) {
	setContext(dblclickedTrackKey, user);
}

export function getDblclickedTrackContext() {
	return /** @type {User} */ (getContext(dblclickedTrackKey));
}

/** @param {User} user */
export function setHoveredDataContext(user) {
	setContext(hoveredDataKey, user);
}

export function getHoveredDataContext() {
	return /** @type {User} */ (getContext(hoveredDataKey));
}

/** @param {User} user */
export function setBrushedDataContext(user) {
	setContext(BrushedDataKey, user);
}

export function getBrushedDataContext() {
	return /** @type {User} */ (getContext(BrushedDataKey));
}
