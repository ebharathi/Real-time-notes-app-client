import { useEffect, useState } from "react";
import { TiUserAdd } from "react-icons/ti";
import { IoMdClose } from "react-icons/io";
import { grantAccess, getAccessList, revokeAccess, updateAccessLevel } from "../utils/api";
import { AiFillDelete } from "react-icons/ai";
const Modal = ({ noteId, onClose }) => {
    const [email, setEmail] = useState("");
    const [members, setMembers] = useState([]);
    const [error, setError] = useState("");
    const handleNewAccess = async () => {
        grantAccess(noteId, email, "read").then((response) => {
            if (response.error == false)
                getAllSharedAccessMembers();
        })
    }

    const getAllSharedAccessMembers = async () => {
        getAccessList(noteId).then((response) => {
            if (response.error == false)
                setMembers(response.data);
            else
                setError(response.message)
        })
    }
    const handleRevokeAccess = async (email) => {
        revokeAccess(noteId, email).then((response) => {
            if (response.error == false)
                getAllSharedAccessMembers();
        })
    }
    const handleAccessLevel = async (email, level) => {
        updateAccessLevel(noteId, email, level).then((response) => {
            if (response.error == false)
                getAllSharedAccessMembers();
        })
    }

    useEffect(() => {
        if (noteId != undefined)
            getAllSharedAccessMembers();
    }, [])
    return (
        <div className="absolute flex justify-center items-center h-screen w-full ">
            {
                error != "" ?
                    <div className="relative p-5 border-2 border-black rounded-lg h-[350px] w-[400px]">
                        <IoMdClose className="absolute text-[30px] right-2 top-1 cursor-pointer" onClick={onClose} />
                        <div className="text-center h-full flex justify-center items-center">
                            <p className="text-[20px]">{error}</p>
                        </div>
                    </div>
                    :
                    <div className="relative p-5 border-2 border-black rounded-lg h-[350px] w-[400px]">
                        <IoMdClose className="absolute text-[30px] right-2 top-1 cursor-pointer" onClick={onClose} />
                        <div className="flex flex-row border-[1px] border-neutral-500 rounded-md py-3 px-3 mt-5">
                            <input type="email" placeholder="Add Email.." className="min-w-[300px] outline-none" onChange={(e) => setEmail(e.target.value)} />
                            <TiUserAdd className="text-[25px] hover:text-primary-500 cursor-pointer" onClick={handleNewAccess} />
                        </div>
                        <div className="mt-3 flex flex-col overflow-y-auto max-h-[230px]">
                            <div className="flex flex-row border-b-[1px] border-b-neutral-600">
                                <div className="flex-[2]">Email</div>
                                <div className="flex-1 flex justify-end">Access Level</div>
                            </div>

                            {
                                members.map((single, index) => (
                                    <div key={index} className="flex flex-row py-2">
                                        <div className="flex-[2]">{single.email}</div>
                                        <div className="flex-1 flex justify-end">
                                            <select defaultValue={single.access_level} onChange={(e) => handleAccessLevel(single.email, e.target.value)}>
                                                <option value="read">Read</option>
                                                <option value="write">Write</option>
                                            </select>
                                        </div>
                                        <div className="px-2 pt-1">
                                            <AiFillDelete className="text-black hover:text-red-500 cursor-pointer" onClick={() => handleRevokeAccess(single.email)} />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
            }
        </div>
    )
}

export default Modal;