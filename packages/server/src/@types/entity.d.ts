
type ModelData <T> = Omit<T, 'id' | 'created'>

type DehydratedDocument <T> = T & { id: S }
type DehydratedEdge <T> = T & { from: S, to: S }
