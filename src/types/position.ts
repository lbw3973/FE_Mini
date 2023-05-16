export interface PositionEntity {
  positionName: string
  vacation: number
  status: 'ACTIVATION' | 'DEACTIVATION'
}

export interface PositionRes {
  data: PositionEntity[]
}
