import { ForwardedRef, forwardRef } from "react";

interface IImageProps {
  url: string;
}

const ImageItem = forwardRef(function ImageItem(
  props: IImageProps,
  ref: ForwardedRef<HTMLImageElement>
) {
  const { url } = props;
  return <img ref={ref} style={{ width: "300px", height: "300px" }} src={`${url}`} alt="err" />;
});

export default ImageItem;
