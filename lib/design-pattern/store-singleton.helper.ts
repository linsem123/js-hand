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

    public getSafeItem(key: string, value?: T): T {
        const item = this.storage.get(key);
        if (item) {
            return item;
        }
        if (value) {
            this.setItem(key, value);
            return value;
        }
        return null as any;
    }

    public removeItem(key: string): void {
        this.storage.delete(key);
    }

    public clear(): void {
        this.storage.clear();
    }
}