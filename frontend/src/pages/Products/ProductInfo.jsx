import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useGetProductInfoQuery, useCreateReviewMutation } from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { FaBox, FaClock, FaShoppingCart, FaStar, FaStore } from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings.jsx";
import ProductTabs from "./ProductTabs.jsx";
import { addToCart } from "../../redux/features/cart/cartSlice.js";


const ProductInfo = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { data: product, isLoading, refetch, error } = useGetProductInfoQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();





  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Successfully Reviewed");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };



  const addToCartHandler = () => {
    dispatch(addToCart({...product, qty}))
    navigate('/cart');
  }

 

  return (
    <>
      <div className=" text-2xl ">
        <Link to="/" className="text-black font-semibold hover:underline ml-[10rem] " >Back </Link>
      </div>
    <div className="h-[100vh] w-[100vw] flex justify-between items-center mt-[50px]">
      

      {isLoading ? ( <Loader /> ) : error ? ( <Message variant="danger">{error?.data || error.message}</Message>
      ) : (
        <>
          <div className="flex flex-wrap relative items-between justify-between mt-[2rem] ml-[10rem] flex-row w-[70rem]">
            <div>
              <img src={product.image} alt={product.name} className="w-[40rem] object-cover xl:w-[20rem] lg:w-[45rem] md:w-[30rem] sm:w-[20rem] mr-[2rem] mt-[10px] shadow-lg ring-opacity-25 ring-offset-32 "
              />
              <HeartIcon product={product} />
            </div>

            <div className="flex flex-col justify-between">
              <h2 className="text-2xl font-semibold">{product.name}</h2>
              <p className="my-4 xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text-[#B0B0B0]">
                {product.description}
              </p>

              <p className="text-5xl my-4 font-extrabold">$ {product.price}</p>

              <div className="flex items-center justify-between w-[20rem]">
                <div className="one">
                  <h1 className="flex items-center mb-6">
                    <FaStore className="mr-2 text-black" /> Brand:{" "}
                    {product.brand}
                  </h1>
                  <h1 className="flex items-center mb-6 w-[20rem]">
                    <FaClock className="mr-2 text-black" /> Added:{" "}
                    {moment(product.createAt).fromNow()}
                  </h1>
                  <h1 className="flex items-center mb-6">
                    <FaStar className="mr-2 text-black" /> Reviews:{" "}
                    {product.numReviews}
                  </h1>
                </div>

                <div className="two">
                  <h1 className="flex items-center mb-6">
                    <FaStar className="mr-2 text-black" /> Ratings: {rating}
                  </h1>
                  <h1 className="flex items-center mb-6">
                    <FaShoppingCart className="mr-2 text-black" /> Quantity:{" "}
                    {product.quantity}
                  </h1>
                  <h1 className="flex items-center mb-6 w-[10rem]">
                    <FaBox className="mr-2 text-black" /> In Stock:{" "}
                    {product.inStock}
                  </h1>
                </div>
              </div>

              <div className="flex justify-between flex-wrap">
                <Ratings value={product.rating} text={`${product.numReviews} reviews`}/>

                {product.inStock > 0 && (
                  <div>
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="p-2 w-[6rem] rounded-lg text-black">
                      {[...Array(product.inStock).keys()].map((i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="btn-container">
                <button disabled={product.countInStock === 0} onClick={addToCartHandler} className="bg-black text-white py-2 px-4 rounded-lg mt-4 md:mt-0">
                  Add To Cart
                </button>
              </div>
            </div>

            <div className="mt-[5rem] container flex flex-wrap items-start justify-between ml-[10rem]">
                <ProductTabs loadingProductReview={loadingProductReview} userInfo={userInfo} submitHandler={submitHandler} rating={rating} setRating={setRating} comment={comment} setComment={setComment} product={product}/>
            </div>
          </div>
        </>
      )}
    </div>
    </>
    
  );
};

export default ProductInfo;
