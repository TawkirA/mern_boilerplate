import { 
        DISPLAY_ALERT,
        CLEAR_ALERT,
        REGISTER_USER_BEGIN,
        REGISTER_USER_SUCCESS,
        REGISTER_USER_ERROR,
        LOGIN_USER_BEGIN,
        LOGIN_USER_SUCCESS,
        LOGIN_USER_ERROR,
        TOGGLE_SIDEBAR,
        LOGOUT_USER
    } from "./actions";

import { initialState } from "./appContext";

const reducer = (state, action) => {
    if (action.type === DISPLAY_ALERT) {
        return { ...state,
                 showAlert: true,
                 alertType: 'danger',
                 alertText: 'Please provide all inputs!'   
                }
    }
    if (action.type === CLEAR_ALERT) {
        return { ...state,
                 showAlert: false,
                 alertType: '',
                 alertText: ''   
                }
    }

    if (action.type === REGISTER_USER_BEGIN) {
        return { ...state, isLoading: true }
    }

    if (action.type === REGISTER_USER_SUCCESS) {
        return { ...state, 
                 isLoading: false,
                 user: action.payload.user,
                 token: action.payload.token,
                 userLocation: action.payload.location,
                 jobLocation: action.payload.location,
                 showAlert: true,
                 alertType: 'success',
                 alertText: 'User Created!!' 
                }
    }

    if (action.type === REGISTER_USER_ERROR) {
        return { ...state, 
                 isLoading: false,
                 showAlert: true,
                 alertType: 'danger',
                 alertText: action.payload.msg
                }
    }

    if (action.type === LOGIN_USER_BEGIN) {
        return { ...state, isLoading: true }
    }

    if (action.type === LOGIN_USER_SUCCESS) {
        return { ...state, 
                 isLoading: false,
                 user: action.payload.user,
                 token: action.payload.token,
                 userLocation: action.payload.location,
                 jobLocation: action.payload.location,
                 showAlert: true,
                 alertType: 'success',
                 alertText: 'Login Successful!!' 
                }
    }

    if (action.type === LOGIN_USER_ERROR) {
        return { ...state, 
                 isLoading: false,
                 showAlert: true,
                 alertType: 'danger',
                 alertText: action.payload.msg
                }
    }

    if (action.type === TOGGLE_SIDEBAR) {
        return { ...state,
                 showSidebar: !state.showSidebar
            }
    }

    if (action.type === LOGOUT_USER) {
        return { ...initialState,
                 user: null,
                 token: null,
                 jobLocation: '',
                 userLocation: ''   
                }
    }

    throw new Error(`no such action: ${action.type}`);
}

export default reducer