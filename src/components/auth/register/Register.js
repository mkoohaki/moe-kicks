import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { register } from "../../../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./register.css";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    type: "user",
    name: "",
    email: "",
    password: "",
  });

  const { type, name, email, password } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    register(formData);
  };

  //Redirect if logged in
  if (isAuthenticated) {
    history.push("/");
  }

  return (
    <div id='user'>
      <h3>Register</h3>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className='divs'>
          <label>Type:</label>
          <select
            name='type'
            value={type}
            onChange={(e) => onChange(e)}
            required
          >
            <option>User</option>
            <option>Staff</option>
          </select>
        </div>
        <div className='divs'>
          <label>Name:</label>
          <input
            type='text'
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='divs'>
          <label>Email:</label>
          <input
            type='text'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='divs'>
          <label>Password:</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <input className='button' type='submit' value='Join Us!' />
        </div>
        <p>
          Already have an account? <Link to='/login'>Login</Link>
        </p>
      </form>
    </div>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { register })(Register);
