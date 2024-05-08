import { useState } from "react";
import { useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation, useFetchCategoriesQuery,
} from "../../redux/api/categoryApiSlice";
import Modal from "../../components/Modal";

import { toast } from "react-toastify";
import CategoryForm from "../../components/CategoryForm";



const CategoryList = () => {
  const { data: categories } = useFetchCategoriesQuery();
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Name required");
      return;
    }

    try {
      const result = await createCategory({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} category created.`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create category");
    }
  };





  const handleUpdateCategory = async (e) => {
    e.preventDefault()

    if (!updatingName) {
        toast.error("Enter a name")
        return;
    }

    try {
        const result = await updateCategory({categoryId: selectedCategory._id, updatedCategory: {name: updatingName}}).unwrap()

        if (result.error) {
            toast.error(result.error)
        }
        else {
            toast.success(`${result.name} updated`)
            setSelectedCategory(null)
            setUpdatingName('')
            setModalVisible(false)
        }
    }
    catch (error) {
        console.error(error)
    }
  }




  const handleDeleteCategory = async (e) => {
    try {
        const result = await deleteCategory(selectedCategory._id).unwrap()

        if (result.error) {
            toast.error(error)
        }
        else {
            toast.success(`${result.error} deleted`)
            setSelectedCategory(null)
            setModalVisible(false)
        }
    }
    catch (error) {
        console.error(error)
        toast.error("Failed to delete")
    }
  }
  

  return (
    <div className="ml-[10rem] flex flex-col md:flex-row items-center justify-center h-[80vh]">
      <div className="md:w-3/4 p-3">
        <div className="h-12">Categories</div>
        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateCategory}
        />
        <br />
        <hr />

        <div className="flex flex-wrap">
          {categories?.map((category) => (
            <div key={category._id}>
              <button
                className="bg-white border border-black text-black py-2 px-4 rounded-lg m-3 hover:bg-black hover:text-white focus:outline-none foucs:ring-2 focus:ring-black focus:ring-opacity-50"
                onClick={() => {
                  {
                    setModalVisible(true);
                    setSelectedCategory(category);
                    setUpdatingName(category.name);
                  }
                }}
              >
                {category.name}
              </button>
            </div>
          ))}
        </div>
            <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
                <CategoryForm value={updatingName} setValue={value => setUpdatingName(value)} handleSubmit={handleUpdateCategory} buttonText="Update" handleDelete={handleDeleteCategory}/>
            </Modal>
      </div>
    </div>
  );
};

export default CategoryList;
