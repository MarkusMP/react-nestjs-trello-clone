import styles from "./Spinner.module.scss";
import { ImSpinner11 } from "react-icons/im";

const Spinner = () => {
  return (
    <div className={styles.loadingSpinnerContainer}>
      <ImSpinner11 className={styles.loadingSpinner} />
    </div>
  );
};

export default Spinner;
