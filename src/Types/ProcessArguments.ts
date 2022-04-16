export default interface ProcessArguments {
	/**
	 * DEPRECATED.
	 * Determines whether system notifications are going to be sent.
	 */
	n: boolean;
	/**
	 * DEPRECATED.
	 * Determines whether pushbullet notifications are going to be sent.
	 */
	p: boolean;
	/**
	 * WhatsApp multi device mode.
	 */
	mD: boolean;
	/**
	 * Path to configs file.
	 */
	configs: string;
}
