import Button from "./Button.js";

export default function ProductDetailInfo(props) {
  const {product, onProductAdd} = props;
  console.log('test');
  return (
    <>
      <p>
        {product.description} sold at <strong>${product.price}</strong> per
        piece.
      </p>
      <Button onClick={() => onProductAdd(product)}>${product.price}</Button>
    </>
  );
}