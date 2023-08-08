import { nanoid } from 'nanoid';
import { useSelector, useDispatch } from 'react-redux';

import Section from './Section';
import ContactsList from './ContactsList';
import Filter from './Filter';
import PhonebookForm from './PhonebookForm';
import { addContact } from 'redux/contactsSlice';
import { toggleFilter } from 'redux/filterSlice';
import { getContacts, getFilter } from 'redux/selectors';

function App() {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  const handleSubmit = ({ name, number }) => {
    const hasContact = contacts.some(contact => {
      const normalizedName = contact.name.toLowerCase();
      return normalizedName.includes(name.toLowerCase());
    });

    if (!hasContact) {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };

      dispatch(addContact(newContact));
    } else {
      alert(`${name} is already in contacts.`);
    }
  };

  const visibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <>
      <Section title={'Phonebook'}>
        <PhonebookForm onSubmit={handleSubmit} />
        <h2>Contacts</h2>
        <Filter
          filter={filter}
          onChange={e => {
            dispatch(toggleFilter(e.target.value));
          }}
        />
        <ContactsList contacts={visibleContacts()} />
      </Section>
    </>
  );
}

export default App;
