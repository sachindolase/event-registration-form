import React from 'react';
import useForm from '../hooks/useForm';
import '../styles/EventRegistrationForm.css';

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Name is required';
  }
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email is invalid';
  }
  if (!values.age) {
    errors.age = 'Age is required';
  } else if (isNaN(values.age) || values.age <= 0) {
    errors.age = 'Age must be a number greater than 0';
  }
  if (values.attendingWithGuest && !values.guestName) {
    errors.guestName = 'Guest Name is required if attending with a guest';
  }
  return errors;
};

const EventRegistrationForm = () => {
  const initialValues = {
    name: '',
    email: '',
    age: '',
    attendingWithGuest: false,
    guestName: '',
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    initialValues,
    validate
  );

  const onSubmit = () => {
    alert(`Form Submitted:\n${JSON.stringify(values, null, 2)}`);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e, onSubmit)} className="form">
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
        />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div>
        <label>Age</label>
        <input
          type="number"
          name="age"
          value={values.age}
          onChange={handleChange}
        />
        {errors.age && <p className="error">{errors.age}</p>}
      </div>
      <div>
        <label>Are you attending with a guest?</label>
        <input
          type="checkbox"
          name="attendingWithGuest"
          checked={values.attendingWithGuest}
          onChange={handleChange}
        />
      </div>
      {values.attendingWithGuest && (
        <div>
          <label>Guest Name</label>
          <input
            type="text"
            name="guestName"
            value={values.guestName}
            onChange={handleChange}
          />
          {errors.guestName && <p className="error">{errors.guestName}</p>}
      </div>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default EventRegistrationForm;
