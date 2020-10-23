import React from 'react';

const forman = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [clicked, setClicked] = useState(false);
  let history = useHistory();
  console.log('signin called!');
  const dispatch = useDispatch();

  

  useEffect(() => {
    console.log(email);
  }, []);

  const handleChange = (e) => {
    e.target.name === 'email' && setEmail(e.target.value);
    e.target.name === 'password' && setPassword(e.target.value);
    console.log('changed');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(signIn({ email, password }));
    history.push('/');
  };

  const handleOnBlurInput = (e) => {
    !e.target.value ? setClicked(false) : setClicked(true);
  };

  const handleOnClickInput = (e) => {
    setClicked(true);
  };

  const handleOnLoadInput = (e) => {
    console.log('loaded input');
  };

  return (
    <div className="form__container">
      <div className="form__img-box">
        <img src={`uploads/tours/tour-1-1.jpg`} alt="tour" />
      </div>
      <Form
        autocomplete="off"
        clicked={clicked}
        onSubmit={(e) => handleSubmit(e)}
        className="form"
      >
        <div className="form__user-box">
          <label htmlFor="email">email</label>
          <input
            className="form__input"
            onChange={(e) => handleChange(e)}
            type="email"
            id="email"
            name="email"
            onBlur={(e) => handleOnBlurInput(e)}
            onClick={(e) => handleOnClickInput(e)}
            onBeforeInput={(e) => handleOnLoadInput(e)}
          />
        </div>
        <div className="form__user-box">
          <label htmlFor="password">password</label>
          <input
            className="form__input"
            onChange={(e) => handleChange(e)}
            type="password"
            id="password"
            name="password"
          />
        </div>

        <button style={{ position: 'absolute', bottom: '0' }} type="submit">
          submit
        </button>
      </Form>
    </div>
  );
};

const Form = styled.form`
  flex-basis: 60%;
  &__user-box {
    position: relative;
  }
  &__input {
    width: 100%;
    padding: 0.6rem 0;
    font-size: 2rem;

    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid black;
    border-radius: 0;
    outline: none;
    background: transparent;
  }

  /* label {
    position: absolute;
    top: 0;
    left: 0;
    padding: ${(props) => (props.clicked ? '0' : '1rem 0')};
    font-size: ${(props) => (props.clicked ? '1rem' : '2rem')};

    pointer-events: none;
    transition: 0.5s;
  } */
`;

export default forman;
