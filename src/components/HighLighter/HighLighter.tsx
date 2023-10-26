import { useState, type ChangeEvent } from 'react';

function HighLighter() {
  const [result, setResult] = useState('');
  const [sourceText, setSourceText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);

  function onSourceTextChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const { value } = event.target;
    setSourceText(value);
    highlightText(searchTerm, value, caseSensitive);
  }

  function onSearchTermChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setSearchTerm(value);
    highlightText(value, sourceText, caseSensitive);
  }

  function handleCaseSensitiveChange(event: ChangeEvent<HTMLInputElement>) {
    const { checked } = event.target;
    setCaseSensitive(checked);
    highlightText(searchTerm, sourceText, checked);
  }

  function highlightText(
    searchTerm: string,
    sourceText: string,
    caseSensitive: boolean,
  ) {
    const regexFlags = caseSensitive ? 'g' : 'gi';
    const regex = new RegExp(searchTerm, regexFlags);
    const highlighted = sourceText.replace(
      regex,
      (match) => `<mark>${match}</mark>`,
    );
    setResult(highlighted);
  }

  return (
    <section className='wrapper'>
      <textarea
        rows={15}
        value={sourceText}
        className='original-text'
        data-testid='source-text'
        onChange={onSourceTextChange}
        placeholder='Original text...'
      />
      <input
        type='text'
        value={searchTerm}
        className='search-term'
        data-testid='search-term'
        placeholder='Search for...'
        onChange={onSearchTermChange}
      />
      <label>
        Case sensitive?:
        <input
          type='checkbox'
          checked={caseSensitive}
          data-testid='case-sensitive'
          onChange={handleCaseSensitiveChange}
        />
      </label>
      <div
        className='result'
        data-testid='result'
        dangerouslySetInnerHTML={{ __html: result }}
      />
    </section>
  );
}

export default HighLighter;
