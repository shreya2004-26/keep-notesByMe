import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegPlusSquare } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useSearch } from "../context/SearchContext";
const Home = () => {
  const { view, setView } = useSearch();
  const [noteData, setNoteData] = useState({ title: "", description: "" });
  const { searchTerm } = useSearch();
  const [notes, setNotes] = useState([]);
  const [email, setEmail] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editNoteData, setEditNoteData] = useState({
    id: "",
    title: "",
    description: "",
  });
  useEffect(() => {
    fetchNotes();
  }, []);

  // useEffect(() => {
  //   setEmail(localStorage.getItem("email"));
  //   console.log(email);

  //   if (email) {
  //     fetchNotes();
  //   }
  // }, [email]);

  // fetch notes from the api
  console.log(import.meta.env.VITE_BACKEND_URL);

  const fetchNotes = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/notes`,
        {
          withCredentials: true,
        }
      ); //if you want to send cookies in the request then you have to write {withCredentials:true}
      console.log(res?.data[0].notes);

      setNotes(res?.data[0]?.notes || []);
    } catch (error) {
      // ✅ Catch errors properly
      console.error("Error fetching notes:", error);
    }
  };

  //function to add a new note
  const addNote = async () => {
    if (!noteData.title || !noteData.description) return;
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/notes`,
        {
          title: noteData.title,
          description: noteData.description,
        },
        {
          withCredentials: true,
        }
      );
      fetchNotes();
      //update notes state locally
      // setNotes([...notes, noteData]);

      // clear input fields
      setNoteData({ title: "", description: "" });
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      console.log(noteId);

      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/notes?id=${noteId}`,
        {
          withCredentials: true,
        }
      );
      setNotes(
        notes.filter((note, idx) => {
          return note._id !== noteId;
        })
      );
    } catch (error) {
      console.log("error deleting note", error);
    }
  };

  //enable edit node and set selected note data
  const enableEdit = async (note) => {
    setEditNoteData({
      id: note._id,
      title: note.title,
      description: note.description,
    });
    setEditMode(true);
  };

  //update the note in the backend
  const updateNote = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/notes`,
        {
          id: editNoteData.id,
          title: editNoteData.title,
          description: editNoteData.description,
        },
        { withCredentials: true }
      );

      // update notes in state
      setNotes(
        notes.map((note) => {
          return note._id === editNoteData.id ? editNoteData : note;
        })
      );

      // reset edit mode
      setEditMode(false);
      setEditNoteData({ id: "", title: "", description: "" });
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const filterNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(searchTerm.toLowerCase());
  });
  return (
    <div className="w-screen flex flex-col justify-center items-center mt-8">
      <div className="flex flex-col w-[500px] px-4 py-3 border border-gray-200 rounded shadow-md text-md">
        <input
          placeholder="Title.."
          className="border-none outline-none font-semibold text-black mb-5"
          value={noteData.title}
          onChange={(e) => {
            setNoteData({ ...noteData, title: e.target.value });
          }}
        />
        <div className="flex justify-between items-center">
          <textarea
            placeholder="Add a note.."
            className="border-none outline-none font-semibold text-black resize-none w-full"
            value={noteData.description}
            onChange={(e) => {
              setNoteData({ ...noteData, description: e.target.value });
            }}
          />
          <FaRegPlusSquare
            className="cursor-pointer text-green-700"
            onClick={addNote}
          />
        </div>
      </div>

      {/* edit note */}
      {editMode && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-75">
          <div className=" flex flex-col bg-white text-sm p-5 rounded-lg shadow-lg w-[400px] relative">
            <p className="text-lg font-bold p-3">Edit Note</p>
            <input
              className="border w-full p-1 rounded mb-3"
              value={editNoteData.title}
              onChange={(e) =>
                setEditNoteData({ ...editNoteData, title: e.target.value })
              }
            />
            <textarea
              className="border w-full p-1 rounded mb-2"
              value={editNoteData.description}
              onChange={(e) =>
                setEditNoteData({
                  ...editNoteData,
                  description: e.target.value,
                })
              }
            />
            <div className="flex justify-end gap-3">
              <button
                className="px-2 py-1 bg-gray-500 text-white rounded cursor-pointer"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded cursor-pointer"
                onClick={updateNote}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* display notes */}
      <div
        className={
          view === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8 w-[900px]"
            : "flex flex-col w-[800px] mt-8 gap-4"
        }
      >
        {filterNotes.length > 0
          ? filterNotes.map((note, index) => {
              return (
                <div
                  key={index}
                  className="border border-gray-300 p-6 rounded shadow-md w-full"
                >
                  <p>{note.title}</p>
                  <p>{note.description}</p>
                  <div className="flex gap-3 mt-4 w-[80px]">
                    <MdDelete
                      onClick={() => deleteNote(note._id)}
                      className="text-red-800 cursor-pointer"
                    />
                    <FaRegEdit
                      onClick={() => enableEdit(note)}
                      className="text-yellow-600 cursor-pointer"
                    />
                  </div>
                </div>
              );
            })
          : "No notes found"}
      </div>
    </div>
  );
};

export default Home;
