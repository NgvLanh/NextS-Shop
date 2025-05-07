'use client';
import axios from 'axios';
import { MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks/use-debouse';

interface Suggestion {
  place_id: string;
  description: string;
}

export default function GoongAutocomplete() {
  const [query, setQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const fetchSuggestions = async (input: string) => {
    try {
      const res = await axios.get('https://rsapi.goong.io/Place/AutoComplete', {
        params: {
          api_key: 'QTxAIPBsE2hDKqWZ378Ie5FkpQ3se2KlvUhyKbAU',
          input,
        },
      });
      setSuggestions(res.data.predictions);
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
    }
  };

  const debouncedFetch = useDebounce(fetchSuggestions, 300);

  useEffect(() => {
    if (query.length > 2) debouncedFetch(query);
    else setSuggestions([]);
  }, [query]);

  const handleSelect = (description: string) => {
    setQuery(description);
    setSuggestions([]);
  };

  return (
    <div className='relative p-4 max-w-md mx-auto'>
      <input
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Tìm địa điểm...'
        className='border p-2 w-full rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
      {suggestions.length > 0 && (
        <ul className='absolute w-full mt-1 bg-white border rounded shadow-md max-h-60 overflow-y-auto z-10'>
          {suggestions.map((item) => (
            <li
              key={item.place_id}
              className='p-2 hover:bg-blue-100 cursor-pointer flex items-center gap-2'
              onClick={() => handleSelect(item.description)}
            >
              <MapPin color='gray' size={20} /> {item.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
