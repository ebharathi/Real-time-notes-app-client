import { useEffect, useState } from "react";
import { createNote, readNotes } from "../../utils/api";
import { IoMdAddCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { CiFileOn } from "react-icons/ci";
import { FiFilePlus } from "react-icons/fi";
import { FaFileCirclePlus } from "react-icons/fa6";


const Home = () => {
    const navigate = useNavigate();
    const [notes, setNotes] = useState([]);

    const handleNewNote = async () => {
        await createNote("").then((response) => {
            if (response.error == false)
                navigate(`/notes/${response.data.id}`)
        })
    }

    const getNotes = async () => {
        await readNotes().then((response) => {
            console.log("Res==>", response);
            if (response.error == false) {
                setNotes(response.data);
            }
        })
    }


    useEffect(() => {
        getNotes();
    }, [])
    return (
        <div className="m-10 ">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
                <FaFileCirclePlus onClick={handleNewNote} className="cursor-pointer hover:p-2 h-48 w-36 md:h-80 md:w-48" />
                {
                    notes.map((single) =>
                        <div className="relative">
                            <CiFileOn onClick={() => navigate(`/notes/${single.id}`)} className="cursor-pointer hover:p-2 h-48 w-36 md:h-80 md:w-48" />
                            <div className="absolute top-2/4 left-1/2 text-xl font-extrabold">{single.id}</div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Home;