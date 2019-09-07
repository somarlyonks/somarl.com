export interface IModel {
  id: S
  created: Date
}

export interface IRelation extends IModel { // TODO: @sy resolved relation
  from: S
  to: S
}
