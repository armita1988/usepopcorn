import { useEffect } from "react";

export function useKeyDown(code, callbackFn) {

    useEffect(function () {
        function handler(e) {
            if (e.code.toLocaleLowerCase() === code.toLocaleLowerCase()) {
                callbackFn();
            }
        }
        document.addEventListener("keydown", handler);

        return () => document.removeEventListener("keydown", handler);
    }, [callbackFn, code])



}