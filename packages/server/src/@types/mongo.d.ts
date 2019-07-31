type ModelData <T> = Omit<T, 'id' | 'created'>

type Dehydrated <T> = T & { id: S }
