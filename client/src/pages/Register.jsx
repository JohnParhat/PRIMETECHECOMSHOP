import {useState } from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';
import { useDispatch } from 'react-redux';
import { register } from '../redux/apiCalls';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url('https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: '75%' })}
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  text-align: center;
  width: 100%;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Field = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const ErrorSpan = styled.span`
  margin-top: 5px;
  font-size: 15px;
  color: red;
`;
const Input = styled.input`
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;
const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;
const Register = () => {
  const initialValues = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setformErrors] = useState({});
  const [registerError, setRegisterError] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setformErrors(validate(formValues));
    if (Object.keys(formErrors).length === 0 && formValues) {
      const errorMessage = await register(dispatch, formValues);
      if (errorMessage) setRegisterError(errorMessage);
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!values.firstname) {
      errors.firstname = 'Firstname is required!';
    }
    if (!values.lastname) {
      errors.lastname = 'Lastname is required!';
    }
    if (!values.username) {
      errors.username = 'Username is required!';
    }
    if (!values.email) {
      errors.email = 'Email is required!';
    } else if (!regex.test(values.email)) {
      errors.email = 'This is not a valid email format!';
    }
    if (!values.password) {
      errors.password = 'Password is required!';
    } else if (values.password.length < 6) {
      errors.password = 'Password must be at lease 6 characters';
    }
    if (!values.confirmpassword) {
      errors.confirmpassword = 'Confirm Password is required!';
    } else if (values.password !== values.confirmpassword) {
      errors.confirmpassword = 'Confirm Password must be same as Password';
    }
    return errors;
  };
  console.log(registerError);
  return (
    <Container>
      <Wrapper>
        <Title>Create AN ACCOUNT</Title>
        <Form onSubmit={handleSubmit}>
          <Field>
            <Input
              name='firstname'
              type='text'
              placeholder='firstname'
              value={formValues.firstname}
              onChange={handleChange}
            />
            <ErrorSpan>{formErrors.firstname}</ErrorSpan>
          </Field>
          <Field>
            <Input
              name='lastname'
              type='text'
              placeholder='lastname'
              value={formValues.lastname}
              onChange={handleChange}
            />
            <ErrorSpan>{formErrors.lastname}</ErrorSpan>
          </Field>

          <Field>
            <Input
              name='username'
              onChange={handleChange}
              type='text'
              placeholder='username'
              value={formValues.username}
            />
            <ErrorSpan>{formErrors.username}</ErrorSpan>
          </Field>
          <Field>
            <Input
              name='email'
              placeholder='email'
              value={formValues.email}
              onChange={handleChange}
            />
            <ErrorSpan>{formErrors.email}</ErrorSpan>
          </Field>
          <Field>
            <Input
              name='password'
              type='password'
              placeholder='password'
              value={formValues.password}
              onChange={handleChange}
            />
            <ErrorSpan>{formErrors.password}</ErrorSpan>
          </Field>
          <Field>
            <Input
              name='confirmpassword'
              type='password'
              placeholder='confirm password'
              value={formValues.confirmpassword}
              onChange={handleChange}
            />
            <ErrorSpan>{formErrors.confirmpassword}</ErrorSpan>
          </Field>
          {(registerError === 'username is already registered!' ||
            registerError === 'email is already registered!') && (
            <ErrorSpan>{registerError}</ErrorSpan>
          )}
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button type='submit'>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
