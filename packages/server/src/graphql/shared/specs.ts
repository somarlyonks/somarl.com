export interface IModel {
  id: S
  created: Date
}

export interface IRelation extends IModel {
  from: S
  to: S
}
