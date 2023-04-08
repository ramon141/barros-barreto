import { createContext, useState } from 'react';
const DEFAULT_STATE = { 
    isOpen:false,
    title:'',
    onConfirm:()=>{} 
};

export const NotitificationCustomContext = createContext(DEFAULT_STATE);

export const NotificationCustomProvider = props =>{
    const [state, setState] = useState(Object.assign({}, DEFAULT_STATE));

    const handleOpenNotificationCustom = ({title, onConfirm }) => {
        setState({
            isOpen:true,
            title:title,
            onConfirm: onConfirm
        })
    }
    const handleCloseNotificationCustom = ()  => {
        setState({
            title:'',
            isOpen:false,
            onConfirm:() =>{}
        })
    }

    return (
        <NotitificationCustomContext.Provider value={{
            ...state,
            handleOpenNotificationCustom,
            handleCloseNotificationCustom
        }}>
            {props.children}
        </NotitificationCustomContext.Provider>
    )

}

export const withNotitificationCustom = WrappedComponent => {
    const WrapNotificationCustom = props => (
        <NotitificationCustomContext.Consumer>
           {({ isOpen, title, handleOpenNotificationCustom, handleCloseNotificationCustom, onConfirm }) => {
               const notificationCustomProps = {
                isOpen, 
                title,
                onConfirm, 
                handleOpenNotificationCustom, 
                handleCloseNotificationCustom
               }
               return <WrappedComponent {...notificationCustomProps} {...props} />
            }}
        </NotitificationCustomContext.Consumer>
    )
    return WrapNotificationCustom;
}