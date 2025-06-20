import ProductFilter from '@/components/shopping-view/Filter'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu'
import React, { useEffect, useState } from 'react'
import { ArrowUpDownIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { sortOptions } from '@/config'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllFilteredProducts } from '../../store/shop/product-slice/index'
import ShoppingProductTile from '@/components/shopping-view/product-tile'
import { useSearchParams } from 'react-router-dom'


function createSearchParamsHelper(filterParams) {
  const queryParams = [];

  for(const [key, value] of Object.entries(filterParams)) {
    if(Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(',');
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }

  return queryParams.join("&");
}


const ShoppingListing = () => {

  const dispatch = useDispatch();
  const { productList} = useSelector(state => state.shopProducts);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // fetch list of products
  useEffect(() => {
    if(filters !== null && sort !== null)
      dispatch(fetchAllFilteredProducts({filterParams: filters, sortParams: sort}));
  }, [dispatch, sort, filters]);

  function handleSort(value) {
    // console.log(value);
    setSort(value);
  }

  function handleFilter(getSectionId, getCurrentOption) {
    // console.log(getSectionId, getCurrentOption);

    let cpyFilters = {...filters};
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

    if(indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption] 
      }
    } else {
      const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(getCurrentOption);

      if(indexOfCurrentOption === -1) {
        cpyFilters[getSectionId].push(getCurrentOption)
      } else {
        cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
      }
    }

    setFilters(cpyFilters);
    sessionStorage.setItem('filters', JSON.stringify(cpyFilters));
  }

  // console.log(filters);

  useEffect(() => {
    setSort('price-lowtohigh');
    setFilters(JSON.parse(sessionStorage.getItem('filters')) || {});
  },[]);

  useEffect(() => {
    if(filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters])

  return (
    <div className='grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6'>
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className='w-full rounded-lg shadow-sm'>
        <div className='w-full p-4 border-b flex items-center justify-between'>
          <h2 className='text-lg font-extrabold'>All Products</h2>

          <div className='flex items-center gap-6'>
            <span className='text-gray-700'>{productList.length} Products</span>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size='sm' className='flex items-center justify-center gap-2 p-1 border-gray-100 bg-gray-50'>
                  <ArrowUpDownIcon className='h-4 w-4' />
                  <span>Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-[200px]'>
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {
                    sortOptions.map(sortItem => 
                      <DropdownMenuRadioItem key={sortItem.id} value={sortItem.id}>
                        {sortItem.label}
                      </DropdownMenuRadioItem>
                    )
                  }
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
          {
            productList && productList.length > 0 ?
            productList.map(productItem =>
              <ShoppingProductTile product={productItem}/>
            ) : null
          }
        </div>
      </div>
    </div>
  )
}

export default ShoppingListing