export default class Utilz {
    public static numberToContactId = (phoneNumber: number) => {
        return phoneNumber + '@c.us';
    }

    public static stringToBool = (stringBool: string) => {
        if (stringBool.toLowerCase() === "true") {
            return true;
        } else if (stringBool.toLowerCase() === "false") {
            return false;
        } else {
            return false;
        }
    }
}
