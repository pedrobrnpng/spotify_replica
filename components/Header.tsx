import { shuffle } from 'lodash';
import React, { useEffect, useState } from 'react';

function Header({ data, type }) {
  const [color, setcolor] = useState(null);

  const colors = [
    'from-indigo-500',
    'from-blue-500',
    'from-green-500',
    'from-yellow-500',
    'from-orange-500',
    'from-red-500',
    'from-purple-500',
    'from-pink-500',
  ];

  useEffect(() => {
    setcolor(shuffle(colors).pop());
  }, [data]);

  return (
    <section
      className={`flex h-80 items-end space-x-7 bg-gradient-to-b p-8 ${color} to-black`}
    >
      <img className="h-44 w-44 shadow-2xl" src={data?.images[0]?.url} alt="" />
      <div>
        <p className="text-xs uppercase text-gray-300"> {type}</p>
        <h1 className="text-2xl font-bold md:text-3xl xl:text-5xl">
          {data?.name}
        </h1>
      </div>
    </section>
  );
}

export default Header;
