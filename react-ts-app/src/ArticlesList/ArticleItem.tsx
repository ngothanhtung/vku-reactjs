import styles from './ArticlesList.module.css'

interface IArticleProps {
    thumbnail: string;
    title: string;
    addTime: string
}
const ArticleItem = ({
    thumbnail,
    title,
    addTime
} : IArticleProps) => {
  return (
     <div className={styles.article_item}>
        <div className={styles.article_thumbnail}>
          <img src={thumbnail} alt="" />
        </div>
        <h3 className={styles.article_name}>
         {title}
        </h3>
        <div className={styles.article_extra}>
          <span className={styles.article_add_time}>{addTime}</span>
        </div>
      </div>
  )
}

export default ArticleItem