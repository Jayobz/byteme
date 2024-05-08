import React from 'react';
import { useGetTopProductsQuery } from '../../redux/api/productApiSlice.js';
import Message from '../../components/Message.jsx';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import moment from 'moment';
import { FaBox, FaClock, FaShoppingCart, FaStar, FaStore } from 'react-icons/fa';


const ProductsSlide = () => {
    const { data: products, isLoading, error } = useGetTopProductsQuery();

    const settings = {
        data: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoPlaySpeed: 3000,
    };

    return (
        <>
        <style>
            {`
            .product-slide {
                position: relative;
            }
            
            .product-details {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 30%;
                padding: 20px;
                background-color: rgba(19, 20, 23, 0.5);
                opacity: 0;
                transition: opacity 1s ease;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: centet;
            }

            .product-slide:hover .items {
                transform: scale(2);
            }

            
            .product-slide:hover .product-details {
                opacity: 1;
            }
            
            .product-details h2,
            .product-details p {
                margin-bottom: 10px;
            }
            
            .details {
                display: flex;
            }
            
            .first,
            .second {
                flex: 1;
            }
            
            `}
        </style>


        <div className='mb-4 xl:block lg:block md:block'>
            {isLoading ? null : error ? (
                <Message variant='danger'>
                    {error?.data?.message || error.message}
                </Message>
            ) : (
                <Slider {...settings} className='xl:w-[100vw] lg:w-[50rem] md:w-[56rem] sm:w-[40rem] sm:block'>
                    {products.map(({ image, _id, name, price, description, brand, createdAt, numReviews, rating, quantity, inStock }) => (
                        <div key={_id} className="product-slide">
                            <img src={image} alt={name} className="items w-full rounded-lg object-cover h-[50rem]" />
                            <div className="product-details">
                                <div className="details">
                                    <div className='flex flex-col'>
                                        <h2 className='text-white font-[5rem] text-semibold uppercase'>{name}</h2>
                                        <p className='text-white'>$ {price}</p>
                                        <p className='w-[10rem] text-white'>{description.substring(0, 170)}...</p>
                                    </div>
                                    <div className="first">
                                        <h1 className='flex items-center mb-6 w-[10rem] text-white'>
                                            <FaStore className='mr-2 text-white' />
                                            Brand: {brand}
                                        </h1>
                                        <h1 className='flex items-center mb-6 w-[15rem] text-white'>
                                            <FaClock className='mr-2 text-white' />
                                            Added: {moment(createdAt).fromNow()}
                                        </h1>
                                        <h1 className='flex items-center mb-6 w-[8rem] text-white'>
                                            <FaStar className='mr-2 text-white' />
                                            Reviews: {numReviews}
                                        </h1>
                                    </div>
                                    <div className="second">
                                        <h1 className="flex items-center mb-6 w-[8rem] text-white">
                                            <FaStar className='mr-2 text-white' />
                                            Ratings: {Math.round(rating)}
                                        </h1>
                                        <h1 className="flex items-center mb-6 w-[8rem] text-white">
                                            <FaShoppingCart className='mr-2 text-white' />
                                            Quantity: {quantity}
                                        </h1>
                                        <h1 className="flex items-center mb-6 w-[8rem] text-white">
                                            <FaBox className='mr-2 text-white' />
                                            In Stock: {inStock}
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            )}
        </div>
        </>

    );
};

export default ProductsSlide;
