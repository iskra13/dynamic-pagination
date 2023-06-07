import { FC, useEffect, useState, useRef } from "react";
import axios from "axios";

import useIntersectionObserver from "./hocks/useIntersectionObserver.js";
import ImageItem from "./components/ImageItem/ImageItem";

import "./App.scss";

interface IImage {
  albumId: number;
  id: number;
  thumbnailUrl: string;
  title: string;
  url: string;
}

const App: FC = () => {
  const [images, setImages] = useState<IImage[]>([]);
  const lastElementRef = useRef<HTMLImageElement | null>(null);
  const [page, setPage] = useState<number>(1);

  const nextPage = () => {
    setPage((prevState) => prevState + 1);
  };
  const observer = useIntersectionObserver(nextPage);

  useEffect(() => {
    axios
      .get<IImage[]>(`https://jsonplaceholder.typicode.com/photos?&_limit=10&_page=${page}`)
      .then((res) => {
        setImages((prevState) => [...prevState, ...res.data]);
      });
  }, [setImages, page]);

  useEffect(() => {
    if (lastElementRef.current) {
      observer.observe(lastElementRef.current);
    }
  }, [images, observer]);

  return (
    <div className="App">
      {images.map((el, i) => {
        return (
          <ImageItem
            ref={i === images.length - 1 ? lastElementRef : null}
            key={el.id}
            url={el.thumbnailUrl}
          />
        );
      })}
    </div>
  );
};

export default App;
