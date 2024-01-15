import './App.css';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalList from './components/JournalList/JournalList';
import LeftPanel from './components/layouts/LeftPanel/LeftPanel';
import Body from './components/layouts/Body/Body';
import { useState } from 'react';
import JournalForm from './components/JournalForm/JornalForm';
import { useLocalStorage } from './hooks/use.local-storage.hook';
import { UserContextProvider } from './context/user.context';

  function mapMemories(memories) {
    if (!memories) {
      return []
    }
    return memories.map (i => ({ ...i, date: new Date(i.date)}));
  }


function App() {

  const [memories, setMemories] = useLocalStorage("data");

  const [selectedMemory, setSelectedMemory] = useState(null);

  const addMemory = memory => {
    if (!memory.id) {
      setMemories([...mapMemories(memories), {
        ...memory,
        date: new Date(memory.date),
        id: memories.length > 0 ? Math.max(...memories.map(i => i.id)) + 1 : 1
       }]);
    } else {
      setMemories([...mapMemories(memories).map(new_memory => {
        if (new_memory.id === memory.id) {
          return {
            ...memory,
          };
        }
        return new_memory;
      })]);
    }
  }

  const deleteItem = (id) => {
    setMemories([...memories.filter(i => i.id !== id)])
  };

 

  return (
    <UserContextProvider>
<div className='app'>
    <LeftPanel>
      <Header/>
       <JournalAddButton clearForm={() => setSelectedMemory(null)}/>
        <JournalList memories={mapMemories(memories)} setMemory={setSelectedMemory}/>
    </LeftPanel>
    <Body>
      <JournalForm onSubmit={addMemory} onDelete={deleteItem} data={selectedMemory}/>
    </Body>
</div>
</UserContextProvider>
  );
}

export default App;
