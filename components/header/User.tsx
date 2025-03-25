import { UserRound } from 'lucide-react';

const UserRoundIcon = () => {
  return (
    <div className="div-user flex items-centerinline hover:outline-stone-500 hover:bg-stone-200 gap-1 p-3 rounded-md bg-stone-100  hover:cursor-pointer hover:shadow-5 ">
    <UserRound color="black" size={18}/>
    <p className='text-xs'>Sign In</p>
  </div>
    
  );
};

export default UserRoundIcon;
