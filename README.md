# WaAutoSendClips
Send newly made clips of a game through WhatApp.
# Why was this made?
I like to share my game clips of COD MW with my friends via Whatsapp. So I made this to automate the process.
# Usage
## Warning about file size
Whatsapp doesn't allow sending files larger than 64 MB. If you are using Nvidia GeForce Experience you can set the length and bit rate of your clips. Set that to well lower than 64MB.
## Requirements:
- Node.js
- Typescript
- git (optional)
- Google Chrome (won't be opened while using this program)
## Installation:
- Download the files from the latest release or via git
- `npm install`
## Configuration:
- Compile the typescipt files by running `tsc` in your terminal
- Make a copy of the file [config/config.json.json-example](config/config.json.json-example) and name it "config.json", fill the next fields inside the file:
  - watchDirectories: the path to the folder where your clips are saved, you can use multiple folders here (Tip: as used in the example, use "*.mp4"(or whatever the extension of your files is) at the end of the path).
  - sendToNumbers: the numbers of contacts you want to send the clips to.
  - puppeteer.executablePath: the path to Chrome so it can be used.
## Running:
Start this program before starting your game (or while playing but it should be started before making the clip that you want to send) with `node index.js` and start playing your game as usual, when you make a clip this program will see the file and send it.
### Automatically run when the game starts:
If your're using Windows, you can follow the instructions [here](https://superuser.com/questions/745318/how-to-start-a-program-when-another-one-is-started/745336#745336) to start this program when a specific game starts. Example event filter:
``` XML
<QueryList>
  <Query Id="0" Path="Security">
    <Select Path="Security">
		*[System[Provider[@Name='Microsoft-Windows-Security-Auditing'] and (band(Keywords,9007199254740992)) and (EventID=4688)]]
		and
		*[EventData[(Data='D:\Games\Call of Duty Modern Warfare\ModernWarfare.exe')]]
		</Select>
  </Query>
</QueryList>
```
I also use batch file to run this program (with event scheduler). Example (start.bat):
``` batch
cd d:
cd D:\Projects\WaAutoSendClips
node index.js
```
# Uses [wa-automate-nodejs](https://github.com/open-wa/wa-automate-nodejs) for the Whatsapp integration.
