import React, { Fragment, useEffect, useState } from 'react'
import { Button } from '../../components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import CommonForm from '@/components/common/Form';
import { addProductFormElements } from '@/config';
import ProductImageUpload from '../../components/admin-view/image-upload'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts, addNewProduct, editProduct, deleteProduct } from '@/store/admin/product-slice';
import toast from 'react-hot-toast';
import AdminProductTile from '@/components/admin-view/product-tile';


const initialFormData = {
  image: null,
  title: '',
  description: '',
  category: '',
  brand: '',
  price: '',
  salePrice: '',
  totalStock: '',
};

const AdminProducts = () => {

  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const { productList } = useSelector(state => state.adminProducts);
  const dispatch = useDispatch();
  const [currentEditedId, setCurrentEditedId] = useState(null);

  function onSubmit(event) {
    event.preventDefault();

    // console.log(currentEditedId);

    currentEditedId !== null ?
      dispatch(editProduct({
        id: currentEditedId,
        formData,
      })).then((data) => {
        // console.log(data);

        if(data?.payload.success) {
          dispatch(fetchAllProducts());
          setFormData(initialFormData);
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
        }
      }) : dispatch(addNewProduct({
        ...formData,
        image: uploadedImageUrl,
      })).then((data) => {
        // console.log(data);
        if (data?.payload.success) {
          setOpenCreateProductsDialog(false);
          dispatch(fetchAllProducts());
          setImageFile(null);
          setFormData(initialFormData);
          toast.success("Product added successfully!");
        }
      })
  }

  // console.log(productList);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  function isFormValid() {
    return Object.keys(formData).map(key => formData[key] !== "").every(item => item);
  }

  function handleDelete(getCurrentProductId) {
    // console.log(getCurrentProductId);
    dispatch(deleteProduct(getCurrentProductId)).then(data => {
      if(data?.payload?.success) {
        dispatch(fetchAllProducts());
        toast.success("Product deleted successfully!");
      }
    })
  }

  return (
    <Fragment>
      <div className='mb-5 w-full flex justify-end'>
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>

      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
        {
          productList?.length > 0 ?
            productList.map(productItem => <AdminProductTile
              setFormData={setFormData}
              setOpenCreateProductsDialog={setOpenCreateProductsDialog}
              setCurrentEditedId={setCurrentEditedId}
              product={productItem}
              handleDelete={handleDelete}
            />)
            : null
        }
      </div>

      <Sheet open={openCreateProductsDialog} onOpenChange={
        () => {
          setOpenCreateProductsDialog(false)
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }
      }>
        <SheetContent side='right' className='overflow-auto'>
          <SheetHeader>
            <SheetTitle>
              {
                currentEditedId !== null ? 'Edit Product' : 'Add New Product'
              }
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            setImageLoadingState={setImageLoadingState}
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            imageLoadingState={imageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div className='p-6'>
            <CommonForm
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              buttonText={
                currentEditedId !== null ? 'Update Product' : 'Add Product'
              }
              onSubmit={onSubmit}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  )
}

export default AdminProducts