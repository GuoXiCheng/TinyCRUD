export class SingletonFactory {
    private static instances = new Map<any, any>();

    static createInstance<T>(classRef: { new (): T }): T {
        // 检查实例是否已经存在
        if (!SingletonFactory.instances.has(classRef)) {
            // 如果不存在，创建新实例并存储
            SingletonFactory.instances.set(classRef, new classRef());
        }
        // 返回已存在的或新创建的实例
        return SingletonFactory.instances.get(classRef);
    }
}