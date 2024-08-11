import { useEffect, useState } from "react";
import { createNote, readNotes, deleteNote } from "../../utils/api";

import { useNavigate } from "react-router-dom";

import { FaRegPlusSquare } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { MdModeEditOutline } from "react-icons/md";
import { IoShareSocial } from "react-icons/io5";
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
            if (response.error == false) {
                setNotes(response.data);
            }
        })
    }

    const handleDeleteNote = async (noteId) => {
        await deleteNote(noteId).then((repsonse) => {
            getNotes();
        })
    }

    const handleShare = (noteId) => {
        const link = window.location.origin + `/notes/${noteId}`;
        navigator.clipboard.writeText(link).then(() => {
            alert('Link copied to clipboard!');
        });
    }

    useEffect(() => {
        if (!localStorage.getItem("token"))
            navigate("/login")
        getNotes();
    }, [])
    return (
        <div className="py-20 m-2 relative">
            <div className="absolute top-0 right-2">
                <button className="bg-primary-500 text-white rounded-lg cursor-pointer px-5 py-2 hover:shadow-xl" onClick={() => { localStorage.removeItem("token"); navigate("/login") }}>Logout</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                <div onClick={handleNewNote} className="relative flex justify-center items-center border-[0.2px] border-neutral-300 cursor-pointer shadow-md hover:shadow-xl rounded-xl h-48 md:h-80  ">
                    <FaRegPlusSquare className="text-[40px] text-neutral-300" />
                </div>
                {
                    notes.map((single) =>
                        <div className="overflow-hidden relative border-[0.2px] border-neutral-300  shadow-md hover:shadow-xl rounded-xl h-48 md:h-80 ">
                            <span className="absolute px-3 py-1 bg-primary-500 text-white rounded-full top-2 right-2">
                                {single.id}
                            </span>
                            <span className="absolute px-3 py-1  rounded-full bottom-2 right-0">
                                <AiFillDelete className=" text-red-400 hover:text-red-600 text-[30px] hover:text-[35px]" onClick={() => handleDeleteNote(single.id)} />
                            </span>
                            <span className="absolute px-3 py-1  rounded-full bottom-2 right-8">
                                <IoShareSocial className="text-green-500 hover:text-[35px] cursor-pointer text-[30px]" onClick={() => handleShare(single.id)} />
                            </span>
                            <span className="absolute px-3 py-1  rounded-full bottom-2 right-16">
                                <MdModeEditOutline className="text-primary-500 hover:text-[35px] cursor-pointer text-[30px]" onClick={() => navigate(`/notes/${single.id}`)} />
                            </span>

                            <div className="mt-10  text-wrap" onClick={() => navigate(`/notes/${single.id}`)}>
                                {
                                    single.content !== "" ?
                                        <div className="text-[10px] px-5" dangerouslySetInnerHTML={{ __html: single.content }}></div>
                                        :
                                        <div className="flex justify-center items-center"><p className="text-[12px] text-neutral-400">Empty Note</p></div>
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Home;