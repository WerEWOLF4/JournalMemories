import './JournalList.css';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JouranlItem';
import { useContext, useMemo } from 'react';
import { UserContext } from '../../context/user.context';

function JournalList({ memories, setMemory }) {
  const { userId } = useContext(UserContext);

  const sortMemories = (a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  };

  const filteredMemories = useMemo(() => memories
  .filter(memories => memories.userId === userId)
  .sort(sortMemories), [memories, userId]);

    if (memories.length === 0) {
     return <p>Înregistrări nu sunt deocamdată, adăugați cîteva.</p>
   }

  return <> 
  {filteredMemories.map(memories => (
           <CardButton key={memories.id} onClick={() => setMemory(memories)}>
           <JournalItem
           title={memories.title}
           post={memories.post}
           date={memories.data}
           />
          </CardButton>
        ))}</>;
 }
  
  export default JournalList;