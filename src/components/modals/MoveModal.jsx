import React, { useState } from 'react'
import FolderPicker from '../FolderPicker'
import { useFolderContext } from '../../context/FolderContext';
import { useUIContext } from '../../context/UIContext';

const MoveModal = (data) => {

    const [targetFolderId, setTargetFolderId] = useState(null);
    const {closeModal} = useUIContext();

    
    
  return (
    <div className='bg-white p-4 rounded w-96'>
      <h2 className='text-lg font-semibold'>Move {`'${data.data.item.name}'`}</h2>

      <FolderPicker data={data.data}/>

      <div className='flex justify-end gap-2 mt-4'>
        <button className='cursor-pointer px-4 py-2 bg-gray-700 text-white rounded' onClick={closeModal}>Cancel</button>
      </div>
    </div>
  )
}

export default MoveModal
