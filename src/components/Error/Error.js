import Styles from "./Error.module.css";
export default function Error() {
  return (
    <p className={`${Styles.error}`}>
      <span>⛔️</span>Movie not found
    </p>
  );
}
