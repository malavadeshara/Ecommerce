import { filteroptions } from "@/config";
import { Fragment } from "react";
import { Label } from '../ui/label';
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

function ProductFilter({ filters, handleFilter }) {
    return (
        <div className="rounded-lg shadow-sm">
            <div className="p-4 border-b">
                <h2 className='text-lg font-extrabold'>Filters</h2>
            </div>
            <div className="p-4 space-y-4">
                {
                    Object.keys(filteroptions).map(keyItem =>
                        <Fragment>
                            <div>
                                <h3 className="text-gray-800 font-bold">{keyItem}</h3>
                                <div className="grid gap-2 mt-2">
                                    {
                                        filteroptions[keyItem].map(option =>
                                            <Label className='flex item-center gap-2 font-medium'>
                                                <Checkbox
                                                    onCheckedChange={() => handleFilter(keyItem, option.id)}
                                                    checked={filters &&
                                                        Object.keys(filters).length > 0 &&
                                                        filters[keyItem] && filters[keyItem].indexOf(option.id) > -1
                                                    }
                                                />
                                                {option.label}
                                            </Label>
                                        )
                                    }
                                </div>
                            </div>
                            <Separator className='bg-gray-200' />
                        </Fragment>
                    )
                }
            </div>
        </div>
    );
}

export default ProductFilter;