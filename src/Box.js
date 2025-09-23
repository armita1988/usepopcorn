import { useState } from "react"
import Styles from './Box.module.css'

export default function Box({ children }) {
    const [isHide, setIsHide] = useState(false);
    function handleClick() {
        setIsHide(val => !val)
    }
    return (
        <div className={`${Styles.box}`}>
            <button className={Styles.btn} onClick={handleClick}>{isHide ? "+" : "-"}</button>
            {!isHide && children}
        </div>
    )
}