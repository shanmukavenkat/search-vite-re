
const SuggestionList = ({suggestions =[],

highlight,
dataKey,
onSuggestionClick,

}) => {

const getHighlightedText = (text,highlight) => {
   const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return <span>
        {parts.map((part,index)=>(
            <span key={index} style={part.toLowerCase() === highlight.toLowerCase() ? {fontWeight:"bold"} : {} }>
                {part}
            </span>
        ))}
    </span>

}

  return(<>
  {suggestions.map((suggestion,index)=>{
    const currentSuggestion = dataKey ? suggestion[dataKey] : suggestion;
    return (
        <li key={index}
        onClick ={()=>onSuggestionClick(suggestion)}
        className="suggestion-item"
        >
         {getHighlightedText(currentSuggestion,highlight)}   
        </li>
    )
  })}
  </>
)}

export default SuggestionList