import React from 'react'
import { useUIContext } from '../../context/UIContext'
import RenameModal from './RenameModal';
import ShareModal from './ShareModal';
import MoveModal from './MoveModal';
import CreateFolderModal from './CreateFolderModal';

const ModalRenderer = () => {

    const {modal, closeModal} = useUIContext();

    if(!modal.isOpen)return null;

  return (
    <div className='fixed inset-0 bg-black/40 flex items-center justify-center'>
      {modal.type === "createFolder" && (<CreateFolderModal item={modal.target} onClose={closeModal}/>)}
      {modal.type === "rename" && (<RenameModal item={modal.target} onClose={closeModal} />)}
      {modal.type === "share" && (<ShareModal data={modal.target} onClose={closeModal} />)}
      {modal.type === "move" && (<MoveModal data={modal.target} onClose={closeModal}/>)}
    </div>
  )
}

export default ModalRenderer

