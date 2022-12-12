/* eslint-disable react-hooks/exhaustive-deps */
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./style.css";

interface IProps {
  image: string;
  alt?: string;
  height?: string;
  width?: string;
  loading: boolean;
}

const Image = (props: IProps) => {
  const { image, alt, height, width, loading } = props;
  return (
    <div style={{ width: width, height: height }}>
      {loading && (
        <div className="flex items-center translate-x-[-25%] translate-y-[-25%] justify-center w-full h-full">
          <div className="lds-spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      <LazyLoadImage
        alt={alt}
        height="100%"
        width="100%"
        src={image}
        visibleByDefault={loading}
        placeholderSrc="assets/error_image.png"
      />
    </div>
  );
};

Image.defaultProps = {
  height: "100%",
  width: "100%",
  alt: "",
};

export default Image;
