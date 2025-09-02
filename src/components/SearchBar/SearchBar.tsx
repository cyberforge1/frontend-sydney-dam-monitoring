// src/components/SearchBar/SearchBar.tsx
import React, { useCallback, useId, useMemo, useState } from 'react';
import './SearchBar.scss';
import { useGetAllDamsQuery } from '../../services/damsApi';
import type { Dam } from '../../types/types';

type Props = {
  value: string;
  onChange: (next: string) => void;
  onSearch: (query: string) => void;   // existing behavior (still called)
  placeholder?: string;
  ariaLabel?: string;
  buttonLabel?: string;
  autoFocus?: boolean;
  className?: string;
  maxResults?: number;                  // optional cap on suggestions
};

const normalize = (s: string) => s.toLowerCase().trim();

const SearchBar: React.FC<Props> = ({
  value,
  onChange,
  onSearch,
  placeholder = 'Search…',
  ariaLabel = 'Search',
  buttonLabel = 'Search',
  autoFocus = false,
  className,
  maxResults = 8,
}) => {
  // Get all dams once; RTK Query caches this across the app.
  const { data: dams = [], isLoading } = useGetAllDamsQuery();

  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);

  const listId = useId(); // unique id for a11y

  const results: Dam[] = useMemo(() => {
    const q = normalize(value);
    if (!q) return [];
    return dams
      .filter((d) => {
        const name = normalize(d.dam_name ?? '');
        const id = normalize(d.dam_id ?? '');
        return name.includes(q) || id.includes(q);
      })
      .slice(0, maxResults);
  }, [dams, value, maxResults]);

  const doSearch = useCallback(() => {
    // If a suggestion is highlighted, prefer it.
    if (activeIdx >= 0 && activeIdx < results.length) {
      onSearch(results[activeIdx].dam_id);
      return;
    }
    // Otherwise perform the original search behavior with the raw input.
    const q = value.trim();
    if (q) onSearch(q);
  }, [activeIdx, results, value, onSearch]);

  const select = (dam: Dam) => {
    onSearch(dam.dam_id);
    setOpen(false);
    setActiveIdx(-1);
  };

  return (
    <div
      className={['SearchBar', className].filter(Boolean).join(' ')}
      role="combobox"
      aria-expanded={open}
      aria-owns={listId}
      aria-haspopup="listbox"
    >
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        aria-label={ariaLabel}
        aria-autocomplete="list"
        aria-controls={listId}
        aria-activedescendant={
          activeIdx >= 0 ? `${listId}-opt-${activeIdx}` : undefined
        }
        autoFocus={autoFocus}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
          setActiveIdx(-1);
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            setOpen(true);
            setActiveIdx((prev) =>
              results.length ? (prev + 1 + results.length) % results.length : -1
            );
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setOpen(true);
            setActiveIdx((prev) =>
              results.length ? (prev - 1 + results.length) % results.length : -1
            );
          } else if (e.key === 'Enter') {
            e.preventDefault();
            doSearch();
          } else if (e.key === 'Escape') {
            setOpen(false);
            setActiveIdx(-1);
          }
        }}
        onBlur={() => {
          // Delay closing to allow click selection (handled via onMouseDown)
          setTimeout(() => setOpen(false), 0);
        }}
      />
      <button type="button" onClick={doSearch}>
        {buttonLabel}
      </button>

      {open && (isLoading || results.length > 0) && (
        <ul id={listId} role="listbox" className="SearchBar__dropdown">
          {isLoading && (
            <li className="SearchBar__option is-muted" aria-disabled="true">
              Loading dams…
            </li>
          )}

          {!isLoading &&
            results.map((d, idx) => (
              <li
                key={d.dam_id}
                id={`${listId}-opt-${idx}`}
                role="option"
                aria-selected={idx === activeIdx}
                className={[
                  'SearchBar__option',
                  idx === activeIdx ? 'is-active' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                // Use mousedown so blur doesn't cancel the click
                onMouseDown={(e) => {
                  e.preventDefault();
                  select(d);
                }}
              >
                <span className="name">{d.dam_name ?? 'Unnamed Dam'}</span>
                <span className="id">{d.dam_id}</span>
              </li>
            ))}
          {!isLoading && results.length === 0 && value.trim() && (
            <li className="SearchBar__option is-muted" aria-disabled="true">
              No matches
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
