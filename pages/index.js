import Head from "next/head";
import Layout from "../components/layout";
import Landing from "../components/rootRoute/landing";
import Filters from "../components/rootRoute/filters";
import MediaCardList from "../components/rootRoute/mediaCardList";
import animeListQuery from "../lib/animeListQuery";
import useWindowDimensions from "../lib/useWindowDimensions";

import firebase from "firebase";

firebase.initializeApp({
  apiKey: "AIzaSyDt-yDm38nIScGHjXXqiU80yldRdTJqUaY",
    authDomain: "rhytotaku.firebaseapp.com",
    projectId: "rhytotaku",
    storageBucket: "rhytotaku.appspot.com",
    messagingSenderId: "190234026103",
    appId: "1:190234026103:web:105ef0327857a229c8a672",
    measurementId: "G-V0YTR1JTY2"
})

export async function getServerSideProps() {
  const { data } = await animeListQuery();
  const topScore = data.topScore;
  const mostPopular = data.mostPopular;
  const mostPopularThisSeason = data.mostPopularThisSeason;
  const mostPopularNextSeason = data.mostPopularNextSeason;
  const trendingNow = data.trendingNow;
  return {
    props: {
      topScore,
      mostPopular,
      mostPopularThisSeason,
      mostPopularNextSeason,
      trendingNow,
    },
  };
}

export default function Home({
  topScore,
  mostPopular,
  mostPopularThisSeason,
  mostPopularNextSeason,
  trendingNow,
}) {
  const { height, width } = useWindowDimensions();

  return (
    <Layout>
      <Head>
        <title>Search Anime · RhytOtaku</title>
        <link rel="icon" href="/images/rhytoleaf-icon.png" />
      </Head>

      {/* <Landing /> */}
      
      <Filters />

      <MediaCardList
        infoTitle="TRENDING NOW"
        typeOfCard="picture"
        data={trendingNow.media}
      />

      <MediaCardList
        infoTitle="POPULAR THIS SEASON"
        typeOfCard="picture"
        data={mostPopularThisSeason.media}
      />

      <MediaCardList
        infoTitle="UPCOMING NEXT SEASON"
        typeOfCard="picture"
        data={mostPopularNextSeason.media}
      />

      <MediaCardList
        infoTitle="ALL TIME POPULAR"
        typeOfCard="picture"
        data={mostPopular.media}
      />

      <MediaCardList
        infoTitle="TOP 100 ANIME"
        typeOfCard={width < 950 ? "picture" : "info"}
        data={topScore.media}
      />

      <style jsx>{`
        .title {
          margin: 0;
        }
      `}</style>
    </Layout>
  );
}
