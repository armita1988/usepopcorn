import { useEffect, useRef } from 'react';
import styles from './Searchbar.module.css';
import { useKeyDown } from './useKeyStroke';

export default function Searchbar({ query, setQuery }) {
    const searchEl = useRef(null);

    useEffect(function () {
        searchEl.current.focus();
    }, [])

    useKeyDown('Enter', function () {
        if (document.activeElement === searchEl.current) {
            return;
        } else {
            setQuery("");
            searchEl.current.focus();
        }
    });



    return (
        <input name="searchbar"
            className={`${styles.searchbar}`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            ref={searchEl}
            placeholder="Search movie..." />)
}