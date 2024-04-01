import React from 'react';

const DropDownMenu = (props) => {
  return (
    <div className="flex absolute top-14 h-full flex-col gap-1">
      <div className="bg-white w-52 items-center flex justify-between p-2  text-nowrap border-2 rounded-md border-gray-400 ">
        <span className="mr-2">{props.leftIcon}</span>
        <p>{props.text}</p>
        <span className="ml-2">{props.rightIcon}</span>
      </div>

      <div className="bg-white w-52 items-center flex p-2 justify-between text-nowrap border-2 rounded-md border-gray-400 ">
        <span className="mr-2">{props.leftIcon}</span>
        <p>{props.text2}</p>
        <span className="ml-2">{props.rightIcon}</span>
      </div>
    </div>
  );
};

export default DropDownMenu;
