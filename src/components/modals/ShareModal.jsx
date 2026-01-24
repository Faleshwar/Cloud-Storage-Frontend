import React, { useState } from 'react'
import { useUIContext } from '../../context/UIContext'
import { getCurrentDate } from '../../Util/DateUtil';
import {useShareContext} from '../../context/ShareContext'




const ShareModal = ({data, onClose}) => {

  const options = [{name:"Viewer", value:"VIEWER"},{name:"Editor", value:"EDITOR"}, {name:"Public User", value:"PUBLIC_USER"}];
  const [sharedWith, setSharedWith] = useState({email:"", accessType:options[0].value, expiresAt: new Date()});

  const {shareFile} = useShareContext();

  
  const {showToast} = useUIContext();

  const handleShare = async (e)=>{
    e.preventDefault();
    try{
      const res = await shareFile(data.item.id, sharedWith);
      showToast("success", res.data.message);
      console.log(res.data);
    }catch(err){
      console.error(err);
      showToast("error", "File sharing error");
    }finally{
      onClose();
    }
  
  }
  
  

  return (
  <div className='bg-white p-4 rounded w-96'>
      <h2 className='text-lg font-semibold'>Share</h2>

<div>
   
      <label htmlFor="email">Email</label>
      <input type="email" value={sharedWith.email} onChange={(e)=>setSharedWith({...sharedWith, email:e.target.value})} className='border w-full mt-2 p-2 rounded' />
        <label htmlFor="permission">Permission</label>
        <select className='border w-full mt-2 p-2 rounded' id='permission' value={sharedWith.accessType} onChange={(e)=>setSharedWith({...sharedWith, accessType: e.target.value})}>

        <option value="" disabled >Select Access Level</option>
        {options.map((o, id)=>(<option key={id} value={o.value} >{o.name}</option>))}
      </select>

      <label htmlFor="dateTime">Expired At</label>
      <input id='dateTime' value={sharedWith.dateTime} onChange={(e)=>setSharedWith({...sharedWith, expiresAt: e.target.value})} className='border w-full mt-2 p-2 rounded' type="datetime-local"/>
      
   </div>

      <div className='flex justify-end gap-2 mt-4'>
        <button className='px-4 py-2 bg-gray-400 text-white rounded cursor-pointer' onClick={onClose}>Cancel</button>
        <button onClick={handleShare} disabled={!sharedWith.email} className={`px-4 py-2 bg-blue-400 rounded cursor-pointer`}>Share</button>
      </div>
      

    </div>
  )
}

export default ShareModal
