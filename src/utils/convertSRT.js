export async function convertSRT(srtPath) {
	const response = await fetch(srtPath);
	const srtText = await response.text();
	const subtitles = [];
	const srtEntries = srtText.split("\r\n\r\n");

	// console.log("SRT Text:", srtText);
	// console.log(srtEntries);

	srtEntries.forEach((entry, index) => {
		const lines = entry.split("\r\n");
		// console.log(`SRT Entry Lines ${index}: `, lines);
		if (lines.length >= 3) {
			const timecode = lines[1].split(" --> ");
			subtitles.push({
				index: lines[0],
				start: timeToSeconds(timecode[0]),
				end: timeToSeconds(timecode[1]),
                duration: timeToSeconds(timecode[1]) - timeToSeconds(timecode[0]),
				text: lines.slice(2).join("\r\n"),
                latest: index === srtEntries.length - 1
			});
		}
	});

	// console.log("Parsed Subtitles:", subtitles);

	return subtitles;
}

// "1\r\n00:00:10,500 --> 00:00:13,000\r\nBonjour, bienvenue sur notre vidéo !\r\n\r\n2\r\n00:00:15,000 --> 00:00:17,500\r\nPlongeons-nous dans le sujet."

function timeToSeconds(timeStr) {
	const [time, ms] = timeStr.trim().split(",");
	const [h, m, s] = time.split(":");
	return (
		parseInt(h) * 3600 +
		parseInt(m) * 60 +
		parseInt(s) +
		parseInt(ms) / 1000
	);
}
// .slice(2)
