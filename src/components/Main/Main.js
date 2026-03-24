import Styles from "./Main.module.css";
export default function Main({ children }) {
  return <main className={`${Styles.main}`}>{children}</main>;
}
