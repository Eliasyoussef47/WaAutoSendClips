import Configs from "./config/models/configs";
import Conf, {Options} from "conf";
import Utilz from "./Utilz";
import {create as waCreate} from '@open-wa/wa-automate';
import {Client as waClient, Contact} from '@open-wa/wa-automate';
import * as fs from "fs";
// import Pushbullet from 'pushbullet';

const ora = require('ora');
let path = require('path');
let argv = require('minimist')(process.argv.slice(2));
const chokidar = require('chokidar');

class Index {
    private waClient: waClient;
    private configs: Configs;
    private conf: Conf;
    // private pushbullet: Pushbullet;
    private sendToContacts: Contact[];

    constructor(arg: any) {
        // this.configs = new Configs()
        let confOptions: Options<any> = {
            cwd: "./config",
            deserialize: text => this.configs = JSON.parse(text)
        };
        this.conf = new Conf(confOptions);
        // if (argv.n !== undefined) {
        //     this.configs.notification = argv.n;
        // }
        // if (argv.p !== undefined) {
        //     this.configs.pushbullet.notification = argv.p;
        // }
        // if (this.configs.pushbullet.notification) {
        //     this.pushbullet = new Pushbullet(this.configs.pushbullet.accessToken);
        // }
        this.sendToContacts = [];
    }

    public main = async () => {
        const waLaunchConfig = {
            disableSpins: true,
            executablePath: this.configs.puppeteer.executablePath ? this.configs.puppeteer.executablePath : null,
            useChrome: true
        };
        this.waClient = await waCreate(waLaunchConfig);
        console.clear(); // clear the stuff from the WhatsApp client
        console.log("Configurations: ", this.configs);
        for (let contactNumber of this.configs.sendToNumbers) {
            let contactId = Utilz.numberToContactId(Number(contactNumber));
            let contact = await this.waClient.getContact(contactId);
            if (contact === null) throw Error("Getting contact info failed. Check contact number");
            this.sendToContacts.push(contact);
        }
        chokidar.watch(this.configs.watchDirectories,
            {awaitWriteFinish: true, ignoreInitial: true}).on("add", async (filePath: string, stats?: fs.Stats) => {
            await this.sendClip(filePath, stats);
            console.log("new file path: ", filePath);
        });
    }

    public sendClip = async (filePath: string, stats: fs.Stats) => {
        if (!this.checkFile(filePath, stats)) return false;
        for (let contact of this.sendToContacts) {
            await this.waClient.sendImage(
                contact.id.toString(),
                filePath,
                path.basename(filePath),
                "");
        }
    }

    /**
     * checks if the newly created file is a video.
     */
    public checkFile = (filePath: string, stats: fs.Stats) => {
        if (!stats.isFile()) return false;
        return path.extname(filePath) === '.mp4';
    }
}

let index = new Index(argv);
index.main();

const spinner = ora('Waiting for a new file').start();

