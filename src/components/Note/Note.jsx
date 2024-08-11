import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles
import { FaItalic, FaBold, FaUnderline } from "react-icons/fa";
import { TiUserAdd } from "react-icons/ti";
import Modal from "../Modal";
import { IoSettings } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { verifyAccess, updateNote, getNoteById } from '../../utils/api';
import socket from '../../utils/socketService';

const Note = () => {
    const { id } = useParams();
    const [content, setContent] = useState('');
    const [showModal, setShowModal] = useState(false);

    const [showUnauthorizedModal, setShowUnauthorizedModal] = useState(false);

    const [showNoEditAccess, setShowNoEditAccess] = useState(false);

    const modules = {
        toolbar: [
            [{ 'font': [] }, { 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline'],
        ]
    };


    const handleQuillChange = (value) => {
        updateNote(id, value).then((response) => {
            if (response.error == true) {
                setShowNoEditAccess(true);
            }
            else if (response.error == false) {
                setContent(response.data.content);
            }
        })
    };

    useEffect(() => {
        if (id != undefined) {
            // Join the room when the component mounts
            socket.emit('joinNote', id);

            verifyAccess(id).then((response) => {
                if (response.error == true) {
                    setShowUnauthorizedModal(true);
                }
                //if authorized,then get data
                else {
                    getNoteById(id).then((response) => {
                        if (response.error == false) {
                            setContent(response.data.content)
                        }
                    })
                }
            })

        }

        // Cleanup on unmount
        return () => {
            socket.emit('leaveNote', id);
        };
    }, [id])

    useEffect(() => {
        socket.on("updatedNote", (data) => {
            if (data.error == false) {
                setContent(data.data.content);
            }
        })

        // Cleanup when component unmounts
        return () => {
            socket.off('updatedNote');
        };
    }, [])

    return (
        <div className="h-screen p-2.5">
            {showUnauthorizedModal && <div className='absolute flex justify-center items-center h-screen w-full '>
                <div className='relative p-5 border-2 border-black rounded-lg h-[350px] w-[400px] flex justify-center items-center'>
                    <p className='text-center text-[20px]'> You don't have access rights to read/edit this document. Please contact the owner.</p>
                </div>
            </div>}
            {showNoEditAccess && <div className='absolute flex justify-center items-center h-screen w-full '>
                <div className='relative p-5 border-2 border-black rounded-lg h-[350px] w-[400px] flex justify-center items-center'>
                    <IoMdClose className="absolute text-[30px] right-2 top-1 cursor-pointer" onClick={() => setShowNoEditAccess(false)} />
                    <p className='text-center text-[20px]'> You don't have access to Edit this document. Please contact the owner.</p>
                </div>
            </div>}
            {!showNoEditAccess && !showUnauthorizedModal && showModal && <Modal noteId={id} onClose={() => setShowModal(false)} />}
            <div className={`p-2.5 overflow-y-auto ${(showUnauthorizedModal || showNoEditAccess) && 'blur-sm disabled:'}`}>
                <div className="flex gap-5 mb-3">
                    <div className="flex-1 flex justify-end">
                        <button className="flex gap-2 p-3 border-[0.5px] rounded-md text-white bg-black hover:text-black hover:bg-white border-neutral-300" onClick={() => setShowModal(!showModal)}>
                            <div className="flex items-center justify-center">
                                <IoSettings className="text-[22px]" />
                            </div>

                        </button>
                    </div>
                </div>
                <ReactQuill
                    value={content}
                    onChange={handleQuillChange}
                    modules={modules}
                    placeholder="Enter your note here..."
                    className="h-full"
                />
            </div>
        </div>
    );
};

export default Note;
