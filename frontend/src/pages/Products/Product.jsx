import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({product}) => {
  return (
    <>
      <style>
        {`
          .items {
            transition: transform 1s ease, filter 1s ease;
          }

          .container:hover .items {
            transform: scale(2.5);
            filter: grayscale(80%);
          }
        
        `}
      </style>
      <div className="container w-[27rem] h-[32rem] ml-[2rem] p-3 relative cursor-pointer">
      <div className="p-4">
          <div className="relative overflow-hidden">
            <img src={product.image} alt={product.name} className="items w-[30rem] rounded h-[34rem] object-cover"/>
            <HeartIcon product={product} />
          </div>
          <Link to={`product/${product._id}`}>
            <h2 className="flex justify-between items-center">
                <div className="text-lg">
                    {product.name}
                    
                </div>
                <span className="bg-black text-white text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-[gray] dark:text-black">$ {product.price}</span>
            </h2>
        </Link>
      </div>
    </div>
    </>
  )
}

export default Product
