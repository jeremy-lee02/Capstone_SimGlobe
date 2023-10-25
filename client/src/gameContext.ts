import React from 'react';

export interface IGameContextProps {
    isInRoom: boolean;
    setInRoom: (inRoom: boolean) => void;
    codeRoom: string;
    setCodeRoom: (codeRoom: string) => void;
}

const defaultState: IGameContextProps = {
    isInRoom: false,
    setInRoom: () =>{},
    codeRoom: "",
    setCodeRoom: () =>{},
}

export default React.createContext(defaultState);