import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { removeContact } from '../../redux/contactsSlice';

import { ContactsListUl, ListItemWrapp } from './ContactsList.styled';

function ContactsList({ contacts }) {
  const dispatch = useDispatch();

  return (
    <ContactsListUl>
      {contacts.map(contact => (
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

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ContactsList;
