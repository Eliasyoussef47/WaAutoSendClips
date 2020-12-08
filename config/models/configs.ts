import Puppeteer from "./puppeteer/puppeteer";
// import Pushbullet from './pushbullet/pushbullet';

export default class Configs {
    get watchDirectories(): string[] {
        return this._watchDirectories;
    }

    set watchDirectories(value: string[]) {
        this._watchDirectories = value;
    }
    get sendToNumbers(): number[] {
        return this._sendToNumbers;
    }

    set sendToNumbers(value: number[]) {
        this._sendToNumbers = value;
    }
    get puppeteer(): Puppeteer {
        return this._puppeteer;
    }

    set puppeteer(value: Puppeteer) {
        this._puppeteer = value;
    }

    // get pushbullet(): Pushbullet {
    //     return this._pushbullet;
    // }
    //
    // set pushbullet(value: Pushbullet) {
    //     this._pushbullet = value;
    // }
    //
    // get notification(): boolean {
    //     return this._notification;
    // }
    //
    // set notification(value: boolean) {
    //     this._notification = value;
    // }

    private _watchDirectories: string[];
    private _sendToNumbers: number[];
    // private _notification: boolean;
    // private _pushbullet: Pushbullet;
    private _puppeteer: Puppeteer;

    constructor() {
        // this.pushbullet = new Pushbullet();
        this.puppeteer = new Puppeteer();
    }
}


