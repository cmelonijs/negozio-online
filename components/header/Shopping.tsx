import { ShoppingCart } from 'lucide-react';

const ShoppingCartIcon = () => {
  return (
    <div className="div-shopping items-center p-3rounded-md flex items-centerinline hover:outline-stone-500 hover:bg-stone-200 gap-1 p-3 rounded-md hover:cursor-pointer hover:shadow-5">
    <ShoppingCart color="black" size={18}/>
    <p className='text-xs'>Cart</p>
    </div>
  );
};

export default ShoppingCartIcon;
