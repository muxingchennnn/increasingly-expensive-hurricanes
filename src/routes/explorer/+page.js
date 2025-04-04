import { autoType, csvParse } from "d3-dsv";
import { group } from "d3-array";

/** @type {import('./$types').PageLoad} */
export async function load() {
	const [hurricaneDataResponse, landfallDataResponse, aggregatedDataResponse] = await Promise.all([
		import("$lib/data/hurricane_data3.csv?raw"),
		import("$lib/data/landfall_locations3.csv?raw"),
		import("$lib/data/aggregated_data2.csv?raw")
	]);

	const hurricaneData = csvParse(hurricaneDataResponse.default, parseHurricaneData);
	const landfallData = csvParse(landfallDataResponse.default, parseHurricaneData);
	const aggregatedData = csvParse(aggregatedDataResponse.default, autoType);
	const hurricaneGroupedData = group(hurricaneData, (d) => d.id);

	// console.log(hurricaneData);
	// console.log(hurricaneGroupedData);
	// console.log(landfallData);
	// console.log(aggregatedData);

	return {
		hurricaneGroupedData,
		landfallData,
		aggregatedData
	};
}

function parseHurricaneData(d) {
	return {
		id: d.id,
		name: d.name,
		year: +d.year,
		date: parseDate(d.date, d.time),
		event: d.record_identifier,
		status: d.status,
		latitude: +d.latitude,
		longitude: +d.longitude,
		mph: +d.mph,
		knots: +d.knots,
		category: d.category
	};
}

function parseDate(date, time) {
	// Split date components (from "18510625" format)
	const year = date.slice(0, 4);
	const month = date.slice(4, 6);
	const day = date.slice(6, 8);
	// Parse military time (2100 -> 21:00)
	const hours = time.slice(0, 2);
	const minutes = time.slice(2, 4);

	return new Date(
		Date.UTC(
			parseInt(year),
			parseInt(month) - 1, // JS months are 0-indexed
			parseInt(day),
			parseInt(hours),
			parseInt(minutes)
		)
	);
}

export const ssr = false;
