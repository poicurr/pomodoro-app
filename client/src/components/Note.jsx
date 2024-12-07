import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import axios from 'axios';
import debounce from 'lodash.debounce';

function Note() {
  const [note, setNote] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/note/note`, { withCredentials: true })
      .then((res) => setNote(res.data))
      .catch((error) => {
        const status = error.response?.status;
        if (status === 401 || status === 403) navigate("/login");
      });
  }, []);

  const saveNote = debounce((noteContent) => {
    axios
      .post(`http://localhost:5000/api/note/note`, { note: noteContent }, { withCredentials: true })
      .catch((error) => {
        const status = error.response?.status;
        if (status === 401 || status === 403) navigate("/login");
      });
  }, 1000); // 1秒間の遅延

  useEffect(() => {
    saveNote(note);
  }, [note]);

  return (
    <TextField
      multiline
      rows={30}
      fullWidth
      spellCheck={false}
      variant="outlined"
      placeholder="Write a note here..."
      value={note}
      onChange={(e) => {
        setNote(e.target.value)
      }}
      onKeyDown={(e) => {
        if (e.key === 'Tab') { // タブ入力は半角space2つに置き換える
          e.preventDefault();
          // ここではthisの代わりにe.targetとなる
          const start = e.target.selectionStart;
          const end = e.target.selectionEnd;
          e.target.value = e.target.value.substring(0, start) + '  ' + e.target.value.substring(end);
          e.target.selectionStart = e.target.selectionEnd = start + 2;
        }
      }}
      style={{
        marginTop: '16px',
        fontSize: '1.2rem',
      }}
      sx={{
        height: '80vh',
        '& .MuiInputBase-root': {
          height: '100%',
        },
        '& .MuiInputBase-input': {
          height: '100% !important',
          overflow: 'auto',
        },
      }}
    />
  );
}

export default Note;
