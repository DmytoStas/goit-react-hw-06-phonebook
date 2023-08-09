import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import { useSelector, useDispatch } from 'react-redux';

import { addContact } from 'redux/contactsSlice';
import { getContacts } from 'redux/selectors';

import { FormContainer, Label, FormButton } from './PhonebookForm.styled';

function PhonebookForm({ onSubmit }) {
  const contacts = useSelector(getContacts);
  const initialValues = { name: '', number: '' };

  const dispatch = useDispatch();

  const schema = Yup.object().shape({
    name: Yup.string()
      .required('Name required')
      .matches(
        /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
        'Invalid name'
      ),
    number: Yup.string()
      .length(9)
      .required('Number required')
      .matches(
        /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d/,
        'Invalid number'
      ),
  });

  const handleSubmit = (values, actions) => {
    const { name, number } = values;
    const hasContact = contacts.some(contact => {
      const normalizedName = contact.name.toLowerCase();
      return normalizedName === name.toLowerCase();
    });

    if (!hasContact) {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };

      dispatch(addContact(newContact));
      actions.resetForm();
    } else {
      alert(`${name} is already in contacts.`);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Form autoComplete="off">
        <FormContainer>
          <Label htmlFor="name">Name</Label>
          <Field
            type="text"
            name="name"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          />
          <ErrorMessage name="name" />
          <Label htmlFor="number">Number</Label>
          <Field
            type="tel"
            name="number"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          />
          <ErrorMessage name="number" />
          <FormButton type="submit">Add contact</FormButton>
        </FormContainer>
      </Form>
    </Formik>
  );
}

export default PhonebookForm;
