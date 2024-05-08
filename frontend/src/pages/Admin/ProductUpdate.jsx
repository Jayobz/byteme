import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateProductMutation, useDeleteProductMutation, useGetProductByIdQuery, useUploadProductImageMutation,
} from "../../redux/api/productApiSlice.js";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice.js";
import { toast } from "react-toastify";





const ProductUpdate = () => {

  const params = useParams();

  const { data: productData } = useGetProductByIdQuery(params._id);

  const [image, setImage] = useState(productData?.image || "");
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(
    productData?.description || ""
  );
  const [price, setPrice] = useState(productData?.price || "");
  const [category, setCategory] = useState(productData?.category || "");
  const [quantity, setQuantity] = useState(productData?.quantity || "");
  const [brand, setBrand] = useState(productData?.brand || "");
  const [stock, setStock] = useState(productData?.countInStock);


  const navigate = useNavigate();

  const { data: categories = [] } = useFetchCategoriesQuery();
  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category?._id);
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setImage(productData.image);
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("image added");
      setImage(res.image);
    } catch (err) {
      toast.success("image added");
    }
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);

      const data = await updateProduct({ productId: params._id, formData });

      if (data?.error) {
        toast.error("update failed");
      } else {
        toast.success(`successfully updated`);
        navigate("/admin/allproductslist");
      }
    } catch (err) {
      console.log(err);
      toast.error("update failed");
    }
  };





  const handleDelete = async () => {
    try {
      let answer = window.confirm(
        "Delete the product?"
      );
      if (!answer) return;

      const { data } = await deleteProduct(params._id);
      toast.success(`"${data.name}" deleted`);
      navigate("/admin/allproductslist");
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete");
    }
  };






  return (
    <>
      <div className="container  xl:mx-[9rem] sm:mx-[0]">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-3/4 p-3">
            <div className="h-12">Manage Product</div>

            {image && (
            <div className="text-center">
              <img
                src={image}
                alt="product"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}

            <div className="mb-3">
              <label className="text-black px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
                {image ? image.name : "Upload image"}
                <input type="file" name="image" accept="image/*" onChange={uploadFileHandler} className="text-black"
                />
              </label>
            </div>

            <div className="p-3">
              <div className="flex flex-wrap">
                <div className="name">
                  <label htmlFor="name">Name</label> <br />
                  <input type="text" className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#e8e8ed] text-black mr-[5rem]" value={name} onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="price">
                  <label htmlFor="price block">Price</label> <br />
                  <input type="number" className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#e8e8ed] text-black" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
              </div>

              <div className="flex flex-wrap">
                <div>
                  <label htmlFor="quantity block">Quantity</label> <br />
                  <input type="number" min="1" className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#e8e8ed] text-black mr-[5rem]" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="brand block">Brand</label> <br />
                  <input type="text" className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#e8e8ed] text-black " value={brand} onChange={(e) => setBrand(e.target.value)} />
                </div>
              </div>

              <label htmlFor="" className="my-5">Description</label>
              <textarea type="text" className="p-2 mb-3 border rounded-lg w-[95%] bg-[#e8e8ed] text-black" value={description} onChange={(e) => setDescription(e.target.value)} />

              <div className="flex justify-between">
                <div>
                  <label htmlFor="inStock block">In Stock</label>
                  <br />
                  <input type="number" className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#e8e8ed] text-black" value={stock} onChange={(e) => setStock(e.target.value)} />
                </div>

                <div>
                  <label htmlFor="">Category</label>
                  <br />
                  <select placeholder="Choose" className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#e8e8ed] text-black mr-[5rem]" onChange={(e) => setCategory(e.target.value)} >
                    {categories?.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                    </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="">
                <button onClick={handleSubmit} className="py-4 px-10 mt-5 rounded-lg text-lg font-bold  bg-[black] text-white mr-6">
                  Update
                </button>
                <button onClick={handleDelete} className="py-4 px-10 mt-5 rounded-lg text-lg font-bold  bg-[black] text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductUpdate;
