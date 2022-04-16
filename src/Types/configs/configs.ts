import Puppeteer from "./puppeteer/puppeteer.js";
import Pushbullet from "./pushbullet/pushbullet.js";

export default class Configs {
	public watchDirectories: Array<string>;

	public sendToNumbers: Array<number>;

	public notification: boolean;

	public multiDevice: boolean;

	public pushbullet: Pushbullet;

	public puppeteer: Puppeteer;

	constructor() {
		this.watchDirectories = new Array<string>();
		this.sendToNumbers = new Array<number>();
		this.pushbullet = new Pushbullet();
		this.puppeteer = new Puppeteer();
	}
}


