import React, { useEffect, useState } from "react";

function useLocalStorage(key) {
    const value = localStorage.getItem(key);

    const [item, setItem] = useState(value);

    useEffect(function setKey() {
        if(item === null){
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, item);
        }
    }, [key, item]);

    return [item, setItem];
}

export default useLocalStorage;