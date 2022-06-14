import {registerApi, ShippingFields} from '../../../../_dal/api-register';
import {changeAppLoadingStatus} from '../../../main/appReducer';
import {LoadingStatusType} from '../../../../utils/enums';
import {AppThunk} from '../../../main/store';

let initialState = {
  error: "",
  isRegistered: false,
};



export const registerReducer = (state = initialState, action: RegisterActionTypes): RegisterInitialStateType => {
  switch (action.type) {
    case "REGISTER":
      return {...state, isRegistered: action.isRegistered}
    case "SET-ERROR":
      return {...state, error: action.error}
    default:
      return state
  }
}

// actions
export const register = (isRegistered: boolean) => ({type: "REGISTER", isRegistered} as const)
export const setError = (error: string) => ({type: "SET-ERROR", error} as const)

// thunks
export const requestRegistrationTC = (data: ShippingFields): AppThunk => (dispatch) => {
  dispatch(changeAppLoadingStatus(LoadingStatusType.active))
  registerApi.register(data)
      .then(() => dispatch(register(true)))
      .catch(err => dispatch(setError(err.response.data.error)))
      .finally(() => dispatch(changeAppLoadingStatus(LoadingStatusType.disabled)))
}

// types
export type RegisterInitialStateType = typeof initialState;
export type RegisterActionTypes = ReturnType<typeof register> | ReturnType<typeof setError>
