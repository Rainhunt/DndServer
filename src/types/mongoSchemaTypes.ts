type Map = { size: number };

type InstancesMap = { map: Map, foo: number, fa: boolean, fonky: number, farma: number };

export type GameInstance<T> = {
    type: {
        [K in keyof InstancesMap]: T extends InstancesMap[K] ? K : never
    }[keyof InstancesMap];
    src: string;
    mod: Partial<T>;
};