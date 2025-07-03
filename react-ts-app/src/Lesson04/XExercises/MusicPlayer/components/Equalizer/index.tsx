import styles from './equalizer.module.css';

export default function Equalizer() {
  return (
    <div className={styles.container}>
      <div className={styles.first_bar} />
      <div className={styles.second_bar} />
      <div className={styles.third_bar} />
      <div className={styles.fourth_bar} />
    </div>
  );
}
