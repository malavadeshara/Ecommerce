import React from 'react';
import { Badge } from "../ui/badge";
import { CardContent, CardFooter, Card } from "../ui/card";
import { Button } from '../ui/button';
import { brandOptionsMap, categoryOptionsMap } from '@/config';


function ShoppingProductTile({ product }) {
    // console.log(product);
    return (
        <Card className='w-full max-w-sm mx-auto'>
            <div>
                <div className="relative">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-[300px] object-cover rounded-t-lg"
                    />
                    {
                        product?.salePrice > 0 ?
                            <Badge className='absolute top-2 left-2 bg-red-500 hover:bg-red-600'>
                                Sale
                            </Badge> : null
                    }
                </div>

                <CardContent className='p-4'>
                    <h2 className="text-xl font-bold mb-2">{product.title}</h2>

                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[16px] text-gray-600">{categoryOptionsMap[product?.category]}</span>
                        <span className="text-[16px] text-gray-600">{brandOptionsMap[product?.brand]}</span>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                        <span className={`${product.salePrice > 0 ? 'line-through' : ''} text-lg font-semibold text-gray-600`}>${product?.price}</span>
                        {
                            product.salePrice > 0 ? <span className="text-sm text-gray-600">${product?.salePrice}</span> : null
                        }
                    </div>
                </CardContent>

                <CardFooter>
                    <Button className='w-full'>
                        Add To Cart
                    </Button>
                </CardFooter>
            </div>
        </Card>
    );
}

export default ShoppingProductTile;