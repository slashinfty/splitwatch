const ContextMenuItems = {
	screenshot: async (window, dialog, fs, path) => {
		const file = `/Splitwatch_${new Date().toISOString().replace(/\:|\./g, "-").replace("T", "_").replace("Z", "")}.png`;
		const img = await window.capturePage();
		const dir = dialog.showOpenDialogSync({
			"title": "Select Directory to Save Image",
			"properties": [
				"openDirectory"
			]
		})[0];
		fs.writeFileSync(path.join(dir, file), img.toPNG());
	}
}

module.exports = ContextMenuItems;
