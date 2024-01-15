import CardButton from '../CardButton/CardButton';
import './JournalAddButton.css';

function JournalAddButton({clearForm}) {
     return (
      <CardButton className="journal-add" onClick={clearForm}>
      <img className='add-frame' src="/add-frame.svg" alt="AddFrame.svg" />
          Noua Amintire
      </CardButton>
    )
  }
  
  export default JournalAddButton;