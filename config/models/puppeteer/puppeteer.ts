export default class Puppeteer {
    get executablePath(): string {
        return this._executablePath;
    }

    set executablePath(value: string) {
        this._executablePath = value;
    }

    private _executablePath: string;

    constructor() {
        this.executablePath = "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";
    }
}
