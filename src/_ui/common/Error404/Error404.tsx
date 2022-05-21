import styles from './Error404.module.scss'
import not_found from '../../../rest/images/not_found_404.png'

export const Error404 = () => {
  return <div className={styles.container}>
    <div className={styles.image}>
      <img src={not_found} alt="not_found_404"/>
    </div>
  </div>
}