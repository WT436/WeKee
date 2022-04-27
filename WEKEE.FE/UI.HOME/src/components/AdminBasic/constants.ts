enum ActionTypes {

  //#region GET_RESOURCE
  GET_RESOURCE_START = 'GET_RESOURCE_START',
  GET_RESOURCE_COMPLETED = 'GET_RESOURCE_COMPLETED',
  GET_RESOURCE_ERROR = 'GET_RESOURCE_ERROR',
  //#endregion
  //#region DELETE_RESOURCE
  DELETE_RESOURCE_START = 'DELETE_RESOURCE_START',
  DELETE_RESOURCE_COMPLETED = 'DELETE_RESOURCE_COMPLETED',
  DELETE_RESOURCE_ERROR = 'DELETE_RESOURCE_ERROR',
  //#endregion
  //#region EDIT_STATUS_RESOURCE
  EDIT_STATUS_RESOURCE_START = 'EDIT_STATUS_RESOURCE_START',
  EDIT_STATUS_RESOURCE_COMPLETED = 'EDIT_STATUS_RESOURCE_COMPLETED',
  EDIT_STATUS_RESOURCE_ERROR = 'EDIT_STATUS_RESOURCE_ERROR',
  //#endregion
  //#region INSERT_OR_UPDATE_RESOURCE
  INSERT_OR_UPDATE_RESOURCE_START = 'INSERT_OR_UPDATE_RESOURCE_START',
  INSERT_OR_UPDATE_RESOURCE_COMPLETED = 'INSERT_OR_UPDATE_RESOURCE_COMPLETED',
  INSERT_OR_UPDATE_RESOURCE_ERROR = 'INSERT_OR_UPDATE_RESOURCE_ERROR',
  //#endregion
}

export default ActionTypes;