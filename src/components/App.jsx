import React, { useState } from 'react';
import  css from './App.module.css';

export const App = () => {
  const [includeInput, setIncludeInput] = useState('');
  const [excludeInput, setExcludeInput] = useState('');
  const [tags, setTags] = useState([]);

  const handleIncludeInputChange = (event) => {
    setIncludeInput(event.target.value);
  };

  const handleExcludeInputChange = (event) => {
    setExcludeInput(event.target.value);
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
      addTag(excludeInput);
      setExcludeInput('');
    }
  };

  const addTag = (text) => {
    if (text.trim() === '') return;
    setTags([...tags, text]);
  };

  const removeTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const generateSearchRequest = () => {
    const searchRequest = {'job_title': tags.join('AND')};
    alert(JSON.stringify(searchRequest));
  };

  return (
    <div className={css.container}>
      <form onSubmit={generateSearchRequest} className={css.form}>
        <input className={css.input}
          type="text"
          value={includeInput}
          onChange={handleIncludeInputChange}
          onKeyDown={handleIncludeInputKeyPress}
          placeholder="Include job title"
        />
        <input className={css.input}
          type="text"
          value={excludeInput}
          onChange={handleExcludeInputChange}
          onKeyDown={handleExcludeInputKeyPress}
          placeholder="Exclude job title"
        />
        <button type="submit" className={css.formButton}>Search</button>
      </form>

      <div className={css.tagContainer}>
        {tags.map((tag, index) => (
          <div className={css.tag} key={index}>
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
