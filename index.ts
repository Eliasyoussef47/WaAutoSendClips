import Configs from "@/Types/configs/configs.js";
import Conf, { Options } from "conf";
import { Client as waClient, create as waCreate } from "@open-wa/wa-automate";
import * as fs from "fs";
import { numberToContactId } from "./Utilz.js";
import ora from "ora";
import * as path from "path";
import minimist from "minimist";
import { watch as chokidarWatch } from "chokidar";
import ProcessArguments from "@/Types/ProcessArguments.js";
import { ContactId } from "@open-wa/wa-automate/dist/api/model/aliases.js";

const argv = minimist(process.argv.slice(2)) as unknown as ProcessArguments;

class Index {
	private waClient: waClient;
	private inMemoryConfigs: Configs;
	private conf: Conf<Configs>;

	constructor(argv: ProcessArguments) {
		const confOptions: Options<Configs> = {
			cwd: "./",
			deserialize: text => this.inMemoryConfigs = <Configs> JSON.parse(text),
			watch: true,
			configName: argv.configs ?? "config"
		};
		this.conf = new Conf(confOptions);
		this.conf.onDidChange("sendToNumbers", () => {
			console.log("New recipients: ", this.conf.get("sendToNumbers"));
			console.log("\n");
		});
		if (argv.n !== undefined) {
			this.inMemoryConfigs.notification = argv.n;
		}
		if (argv.mD !== undefined) {
			this.inMemoryConfigs.multiDevice = argv.mD;
		}
		if (argv.p !== undefined) {
			this.inMemoryConfigs.pushbullet.notification = argv.p;
		}
	}

	private get sendToContactIds(): Array<ContactId> {
		const result = new Array<ContactId>();
		for (const contactNumber of this.conf.get("sendToNumbers")) {
			const contactId = numberToContactId(Number(contactNumber));
			result.push(contactId);
		}
		return result;
	}

	public main = async (): Promise<void> => {
		const waLaunchConfig = {
			disableSpins: true,
			executablePath: this.inMemoryConfigs.puppeteer.executablePath ? this.inMemoryConfigs.puppeteer.executablePath : null,
			useChrome: true,
			multiDevice: this.inMemoryConfigs.multiDevice
		};
		this.waClient = await waCreate(waLaunchConfig);
		console.clear(); // clear the stuff from the WhatsApp client
		console.log("Watching directories: ", this.conf.get("watchDirectories"));
		console.log("Recipients: ", this.conf.get("sendToNumbers"));

		chokidarWatch(this.inMemoryConfigs.watchDirectories,
			{ awaitWriteFinish: true, ignoreInitial: true })
			.on("add", (filePath: string, stats?: fs.Stats): void => {
				void this.sendClip(filePath, stats);
			});
	};

	/**
	 * Sends a video to all the contacts with the WhatsApp client.
	 *
	 * @param filePath
	 * Path to the video you want to send.
	 * @param stats
	 * fs.Stats of the video you want to send.
	 */
	public sendClip = async (filePath: string, stats: fs.Stats): Promise<void> => {
		if (!this.checkFile(filePath, stats)) return;

		console.log("new file path: ", filePath);
		for (const contactId of this.sendToContactIds) {
			await this.waClient.sendImage(
				contactId,
				filePath,
				path.basename(filePath),
				"");
		}
	};

	/**
	 * Checks if the newly created file is a video.
	 *
	 * @param filePath
	 * Path to a file
	 * @param stats
	 * a fs.Stats of the file
	 */
	public checkFile = (filePath: string, stats: fs.Stats): boolean => {
		if (!stats.isFile()) return false;
		return path.extname(filePath) === ".mp4";
	};
}

const index = new Index(argv);
await index.main();

ora("Waiting for a new file" + "\n").start();

