import React, { useEffect, useState } from "react";
import './style.css'
import debounce from "lodash/debounce";
import SuggestionList from "./suggestion-list";

const Autocomplete = ({
    placeholder = "",
    staticData,
    fetchSuggestions,
    dataKey = "",
    customLoading = "Loading...",
    onSelect = () => {},
    onChange = () => {},
    onBlur = () => {},
    onFocus = () => {},
    customStyles = {},
}) => {
    const [inputValue, setInputValue] = useState("");   
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    console.log(suggestions)

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        onChange(event.target.value);   
    };

    const getSuggestions = async (query) => {
        setError(null);
        setLoading(true);
        try {
            let result;
            if (staticData) {
                result = staticData.filter((item) => {
                    return item.toLowerCase().includes(query.toLowerCase());
                });
            } else if (fetchSuggestions) {
                result = await fetchSuggestions(query);
            }
            setSuggestions(result);
        } catch (err) {
            setError("Failed to fetch suggestions");
            setSuggestions([]);
        } finally {
            setLoading(false);
        }
    };
    
    

    useEffect(() => {
        if (inputValue.length > 1){
            getSuggestions(inputValue);
        }else{
            setSuggestions([])
        }

    }, [inputValue]);


const handleSuggestionsClick = (suggestion) => {
    setInputValue(dataKey ? suggestion[dataKey] : suggestion);
    onSelect(suggestion);
    setSuggestions([]);

}

    return (
        <div className="container">
            <input 
                type="text"
                value={inputValue}
                placeholder={placeholder}
                style={customStyles}
                onChange={handleInputChange}
                onBlur={onBlur}
                onFocus={onFocus}
            />

{(suggestions.length>0||loading||error) &&(<ul className="suggestion-list">
            {error && <div className="error">{error}</div>}
            {loading && <div className="loading">{customLoading}</div>}
        <SuggestionList dataKey={dataKey}
        
        highlight={inputValue}
        suggestions={suggestions}
        onSuggestionClick={handleSuggestionsClick}
        />
</ul>)}

        </div>
    );
};

export default Autocomplete;
