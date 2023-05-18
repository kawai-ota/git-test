import { useState } from "react";
import type { GetServerSideProps } from "next";
import "semantic-ui-css/semantic.min.css";
import { Loader } from "semantic-ui-react";

interface SearchCatImage {
  id: string;
  url: string;
  height: number;
  width: number;
}

interface IndexPageProps {
  initialCatImageUrl: string;
}

const fetchCatImage = async (): Promise<SearchCatImage> => {
  const res = await fetch("https://api.thedogapi.com/v1/images/search");
  const data = await res.json();
  console.log(data[0]);
  return data[0];
};

export default function Home({ initialCatImageUrl }: IndexPageProps) {
  const [catImageUrl, setCatImageUrl] = useState(initialCatImageUrl);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    const catImage = await fetchCatImage();
    setCatImageUrl(catImage.url);
    setIsLoading(false);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1 style={{ marginBottom: 18 }}>朝の癒しを</h1>
      {isLoading ? (
        <Loader active inline="centered" />
      ) : (
        <img src={catImageUrl} width={500} height="auto"></img>
      )}
      <button style={{ marginTop: 18 }} onClick={handleClick}>
        今日も1日頑張ろう
      </button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<
  IndexPageProps
> = async () => {
  const catImage = await fetchCatImage();
  return {
    props: {
      initialCatImageUrl: catImage.url,
    },
  };
};
