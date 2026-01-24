import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

export const UIContext = createContext();

export const UIProvider = ({children})=>{
    
    const [viewMode, setViewMode] = useState("list"); // "list" or "grid"
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("name"); // "name", "date", "size"
    const [selectedIds, setSelectedIds] = useState([]); // array of selected file/folder IDs

    const [modal, setModal] = useState({isOpen: false, type: null, target: null});
    
    const showToast = (type, message)=>{
        console.log("Toast called")
        type==="error"?toast.error(message):toast.success(message);
    }

    const openModal = (type, target)=>{
        setModal({isOpen: true, type: type, target: target});
    }

    const closeModal = ()=>{
        setModal({isOpen: false, type: null, target: null});
    }

    const toggleSelect = (id)=>{
        setSelectedIds((prev)=>prev.includes(id) ? prev.filter((x)=>x!==id) : [...prev, id]);
    }

    const clearSelection = ()=>{
        setSelectedIds([]);
    }

    return <UIContext.Provider value={{viewMode, modal, showToast, openModal, closeModal, setViewMode, searchQuery, setSearchQuery, sortBy, setSortBy, selectedIds, toggleSelect, clearSelection}}>{children}</UIContext.Provider>
}

export const useUIContext = ()=>useContext(UIContext);