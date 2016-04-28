import * as ActionTypes from './constants.js'
import api from '../../helpers/api.js'

export const load = () => {
  return async (dispatch) => {
    const response = await api.get('/odata/settings')

    dispatch({
      type: ActionTypes.SETTINGS_LOAD,
      settings: response.value
    })
  }
}
