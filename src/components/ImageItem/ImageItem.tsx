import { ForwardedRef, forwardRef } from "react";

interface IProps {
  url: string;
}

const ImageItem = forwardRef(function ImageItem(
  props: IProps,
  ref: ForwardedRef<HTMLImageElement>
) {
  const { url } = props;
  return <img ref={ref} style={{ width: "300px", height: "300px" }} src={`${url}`} alt="err" />;
});

export default ImageItem;
