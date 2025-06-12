import React, { Fragment, useState } from 'react'
import { Button } from '../../components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import CommonForm from '@/components/common/Form';
import { addProductFormElements } from '@/config';
import ProductImageUpload from '../../components/admin-view/image-upload'


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

  function onSubmit() {
    
  }

  return (
    <Fragment>
      <div className='mb-5 w-full flex justify-end'>
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>

      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'></div>

      <Sheet open={openCreateProductsDialog} onOpenChange={
        () => {
          setOpenCreateProductsDialog(false)
        }
      }>
        <SheetContent side='right' className='overflow-auto'>
          <SheetHeader>
            <SheetTitle>
              Add New Product
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload setImageLoadingState={setImageLoadingState} imageFile={imageFile} setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl} />
          <div className='p-6'>
            <CommonForm
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              buttonText='Add'
              onSubmit={onSubmit}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  )
}

export default AdminProducts