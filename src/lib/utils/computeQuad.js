export function computeQuad(p1, p2, w1, w2) {
	const dx = p2[0] - p1[0];
	const dy = p2[1] - p1[1];
	const length = Math.sqrt(dx * dx + dy * dy);

	// Compute perpendicular unit vector
	const perpX = -dy / length;
	const perpY = dx / length;

	// Compute four corner points
	return [
		[p1[0] - perpX * (w1 / 2), p1[1] - perpY * (w1 / 2)], // Top-left
		[p1[0] + perpX * (w1 / 2), p1[1] + perpY * (w1 / 2)], // Top-right
		[p2[0] + perpX * (w2 / 2), p2[1] + perpY * (w2 / 2)], // Bottom-right
		[p2[0] - perpX * (w2 / 2), p2[1] - perpY * (w2 / 2)] // Bottom-left
	];
}
