// Image コンポーネントをモックとして置き換える
const MockNextImage = ({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) => {
  return <img src={src} alt={alt} width={width} height={height} />;
};

export default MockNextImage;
