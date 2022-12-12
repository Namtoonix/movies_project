/* eslint-disable react-hooks/exhaustive-deps */
import { Loading } from "components/Loading/lazyload";
import { EffectCallback, useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface IProps {
  image: string;
  alt?: string;
  height?: string;
  width?: string;
  loading?: boolean;
}

const Image = (props: IProps) => {
  const { image, alt, height, width, loading } = props;
  const [isLoading, setIsLoading] = useState(true);

  const useEffectDidMount = (effect: EffectCallback) => {
    useEffect(effect, [isLoading]);
  };

  useEffectDidMount(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  });

  return (
    <div style={{ width: width, height: height }}>
      {isLoading && loading && <Loading />}
      <LazyLoadImage
        alt={alt}
        height="100%"
        width="100%"
        src={image}
        visibleByDefault={isLoading}
        placeholderSrc="assets/error_image.png"
      />
    </div>
  );
};

Image.defaultProps = {
  height: "100%",
  width: "100%",
  alt: "",
  loading: true,
};

export default Image;
