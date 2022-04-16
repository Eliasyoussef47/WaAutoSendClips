import { ContactId } from "@open-wa/wa-automate/dist/api/model/aliases.js";

export default class Utilz {
	public static stringToBool = (stringBool: string): boolean => {
		if (stringBool.toLowerCase() === "true") {
			return true;
		} else if (stringBool.toLowerCase() === "false") {
			return false;
		} else {
			return false;
		}
	};
}

export const numberToContactId = (phoneNumber: number): ContactId => {
	return <`${ number }@c.us` & { __brand?: "ContactId" }> `${ phoneNumber }@c.us`;
};
