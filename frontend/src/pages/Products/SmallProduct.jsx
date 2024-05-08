import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";


const SmallProduct = ({product}) => {
    return (
        <div className="w-[20rem] h=[15rem] ml-[2rem] p-3 cursor-pointer">
            <div className="relative">
                <img src={product.image} alt={product.name} className="h-[20rem] w-[30rem] rounded object-cover"/>
                <HeartIcon product={product} />


                <div className="p-54 mt-4 mx-6">
                    <Link to={`/product/${product._id}`}>
                        <h2 className="flex justify-between items-center">
                            <div>{product.name}</div>
                            <span className="bg-black text-white text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-[gray] dark:text-black">${product.price}</span>
                        </h2>
                    </Link>
                </div>
            </div>
        </div>
    )
}


export default SmallProduct;