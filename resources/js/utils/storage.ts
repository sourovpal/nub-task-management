export type StorageType = "localStorage" | "sessionStorage";

export default class Storage {
    private readonly key: string;
    private readonly storageType: StorageType;

    constructor(key: string, storageType: StorageType = "localStorage") {
        this.key = key;
        this.storageType = storageType;
    }

    get(): any {
        try {
            const val: string | null = window[this.storageType].getItem(
                this.key
            );

            if (val) return JSON.parse(val);

            return null;
        } catch (error) {
            return null;
        }
    }

    set(val: any): void {
        try {
            const strVal = JSON.stringify(val);

            window[this.storageType].setItem(this.key, strVal);
        } catch (error) {
            return;
        }
    }

    remove(): boolean {
        try {
            window[this.storageType].removeItem(this.key);

            return true;
        } catch (error) {
            return false;
        }
    }

    destroy(): boolean {
        try {
            window[this.storageType].removeItem(this.key);

            return true;
        } catch (error) {
            return false;
        }
    }
}
