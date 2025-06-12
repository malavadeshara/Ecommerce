import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useEffect, useRef } from 'react';
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react';
import { Button } from '../ui/button'
import axios from 'axios';

function ProductImageUpload({ setImageLoadingState, imageFile, setImageFile, uploadedImageUrl, setUploadedImageUrl }) {

    const inputRef = useRef(null);

    const handleImageFileChange = (event) => {
        console.log(event.target.files);
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setImageFile(selectedFile);
        }
    }

    const handleDragOver = (event) => {
        event.preventDefault();
    }

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files?.[0];
        if (droppedFile) {
            setImageFile(droppedFile);
        }
    }

    const handleRemoveImage = () => {
        setImageFile(null);
        if(inputRef.current) {
            inputRef.current.value = '';
        }
    }

    async function uploadImageToCloudinary() {
        setImageLoadingState(true);
        const data = new FormData();
        data.append('my_file', imageFile);
        const response = await axios.post('http://localhost:3000/api/admin/products/upload-image', data);
        if(response?.data?.success) {
            setUploadedImageUrl(response.data.result.url);
            setImageLoadingState(false);
        }
    }

    useEffect(() => {
        if(imageFile !== null) {
            uploadImageToCloudinary();
        }
    }, [imageFile]);

    return (
        <div className="w-full max-w-md mx-auto px-6 mt-4">
            <Label className='text-lg font-semibold mb-2 block'>
                Upload Image
            </Label>

            <div
                className='border-2 border-dashed rounded-lg p-4'
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <Input
                    id='image-upload'
                    type='file'
                    className='hidden'
                    ref={inputRef}
                    onChange={handleImageFileChange}
                />
                {
                    !imageFile ?
                        (
                            <Label htmlFor="image-upload" className='flex flex-col items-center justify-center cursor-pointer h-32'>
                                <UploadCloudIcon className='w-10 h-10 text-gray-500 mb-2' />
                                <span>Drag & Drop or click to upload image</span>
                            </Label>
                        ) : (
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center'>
                                    <FileIcon className='w-8 h-8 text-primary mr-2' />
                                </div>
                                <p className='text-sm font-medium'>{imageFile.name}</p>
                                <Button 
                                    className='text-gray-500 hover:text-gray-900' 
                                    variant='ghost' 
                                    size='icon' 
                                    onClick={handleRemoveImage}
                                >
                                    <XIcon className='w-4 h-4' />
                                    <span className='sr-only'>Remove File</span>
                                </Button>
                            </div>
                        )
                }
            </div>
        </div>
    )
}

export default ProductImageUpload