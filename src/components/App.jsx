import Section from './Section';
import ContactsList from './ContactsList';
import Filter from './Filter';
import PhonebookForm from './PhonebookForm';

function App() {
  return (
    <>
      <Section title={'Phonebook'}>
        <PhonebookForm />
        <h2>Contacts</h2>
        <Filter />
        <ContactsList />
      </Section>
    </>
  );
}

export default App;
