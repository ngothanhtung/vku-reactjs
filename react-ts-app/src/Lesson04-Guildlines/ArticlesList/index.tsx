import ArticleItem from "./ArticleItem";
import styles from "./ArticlesList.module.css";

interface IArticleProps {
    id: number;
  thumbnail: string;
  title: string;
  addTime: string;
}

const ArticlesList = ({ data }: { data: IArticleProps[] }) => {
  return (
    <div className={styles.articles_list}>
      {data.length > 0 &&
        data.map((article) => {
          return (
            <ArticleItem
                key={article.id}
              thumbnail={article.thumbnail}
              title={article.title}
              addTime={article.addTime}
            />
          );
        })}
    </div>
  );
};

export default ArticlesList;
