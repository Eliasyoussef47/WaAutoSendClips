export default class Pushbullet {
	private _notification: boolean;
	private _accessToken: string;

	get notification(): boolean {
		return this._notification;
	}

	set notification(value: boolean) {
		this._notification = value;
	}

	get accessToken(): string {
		return this._accessToken;
	}

	set accessToken(value: string) {
		this._accessToken = value;
	}
}
