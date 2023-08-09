import { useSelector, useDispatch } from 'react-redux';

import { getContacts, getFilter } from 'redux/selectors';
import { removeContact } from '../../redux/contactsSlice';

import { ContactsListUl, ListItemWrapp } from './ContactsList.styled';

function ContactsList() {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  const visibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <ContactsListUl>
      {visibleContacts().map(contact => (
        <li key={contact.id}>
          <ListItemWrapp>
            <p>
              {contact.name}: <span>{contact.number}</span>
            </p>

            <button
              type="button"
              id={contact.id}
              onClick={() => {
                dispatch(removeContact(`${contact.id}`));
              }}
            >
              Delete
            </button>
          </ListItemWrapp>
        </li>
      ))}
    </ContactsListUl>
  );
}

export default ContactsList;
