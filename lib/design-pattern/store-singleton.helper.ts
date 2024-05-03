class StorageSingleton<T> {
    private static instance: StorageSingleton<any>;
    private storage: Map<string, T>;

    private constructor() {
        this.storage = new Map<string, T>();
    }

    public static getInstance<T>(): StorageSingleton<T> {
        if (!StorageSingleton.instance) {
            StorageSingleton.instance = new StorageSingleton<T>();
        }
        return StorageSingleton.instance as StorageSingleton<T>;
    }

    public setItem(key: string, value: T): void {
        this.storage.set(key, value);
    }

    public getItem(key: string): T | undefined {
        return this.storage.get(key);
    }
}