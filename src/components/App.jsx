import React, { useState } from 'react';
import  css from './App.module.css';

const BASE_URL = 'http://example.com/api/search?'

export const App = () => {
  const [includeInput, setIncludeInput] = useState('');
  const [excludeInput, setExcludeInput] = useState('');
  const [tags, setTags] = useState([]);

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    name === 'include' ? setIncludeInput(value) : setExcludeInput(value)
  };

  const handleIncludeInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addTag(includeInput);
      setIncludeInput('');
    }
  };

  const handleExcludeInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addTag('-' + excludeInput);
      setExcludeInput('');
    }
  };

  const addTag = (text) => {
    if (text.trim() === '') return;
    if (tags.includes(text.trim())) {
      alert('This tag is already exsist');
    return;
  }
    setTags([...tags, text]);
  };

  const removeTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const searchRequest = {'job_title': tags.filter(tag => !tag.startsWith('-')).join(' AND ')};
    alert(JSON.stringify(searchRequest));

    fetch(`${BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(searchRequest)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // 
    })
    .catch(error => {
      console.error(error);
    });
  };

  return (
    <div className={css.container}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input className={css.input}
          type="text"
          name='include'
          value={includeInput}
          onChange={handleInputChange}
          onKeyDown={handleIncludeInputKeyPress}
          placeholder="Job title include"
        />
        <input className={css.input}
          type="text"
          name='exclude'
          value={excludeInput}
          onChange={handleInputChange}
          onKeyDown={handleExcludeInputKeyPress}
          placeholder="Job title exclude"
        />
        <button type="submit" className={css.formButton}>Search</button>
      </form>

      <div className={css.tagContainer}>
        {tags.map((tag, index) => (
          <div className={css.tag} key={tag}>
            {tag}
            <button className={css.tagButton} 
              onClick={() => removeTag(index)}>X</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
