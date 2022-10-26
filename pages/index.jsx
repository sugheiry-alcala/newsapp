import PageLayout from "../components/PageLayout";
import styles from "../styles/Home.module.css";

export default function Home({ articles }) {
  return (
    <PageLayout title="NewsApp - Home">
      <div className={styles.container}>
        {articles.length === 0 && <p>No tenemos artículos...</p>}
        {articles.length > 0 &&
          articles.map((article, index) => (
            <div Key={index}>
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={`Image for the article ${article.title}`}
                  width={450}
                  height={300}
                  layout="responsive"
                />
              )}
              <h2>{article.title}</h2>
              <p>{article.description}</p>
            </div>
          ))}
      </div>
    </PageLayout>
  );
}
// // N requests -> se ejecuta 1 vez en build time (o para refrescar la página.)
// export async function getStaticProps() {
//   const response = await fetch(
//     `https://newsapi.org/v2/everything?q=${encodeURIComponent(
//       "colombia"
//     )}&from=2022-09-26&sortBy=publishedAt&apiKey=7fce3d78697a4871ae59b48c241df4c4`
//   );
//   const { articles } = await response.json();
//   return {
//     props: {
//       articles,
//     },
//   };
// }

// N requests -> se ejecuta N veces para datos que necesitas que sean MUY LIve, tiene demasiados datos dinamicos
export async function getServerSideProps(context) {
  const response = await fetch(
    `https://newsapi.org/v2/everything?q=${encodeURIComponent(
      "colombia"
    )}&from=2022-09-26&sortBy=publishedAt&apiKey=7fce3d78697a4871ae59b48c241df4c4`
  );
  const { articles } = await response.json();
  return {
    props: {
      articles,
    },
  };
}
