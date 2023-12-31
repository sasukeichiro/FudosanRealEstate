import React from 'react';

const Category = ({ text, img }) => {
  
    return (
        <div className=" flex items-center bg-cover bg-center  " style={{ backgroundImage:`url(${img})`,height:150,width:180}}>
            <div className='bg-[#2A6484]/90 w-full text-center'>
                <p className='text-white font-normal text-[17px]'>{text}</p>
            </div>
      
         </div>

    )
};

export default Category;