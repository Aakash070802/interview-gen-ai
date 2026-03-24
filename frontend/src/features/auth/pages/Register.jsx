import { Link } from "react-router";
const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter Username"
            />
          </div>
          <div className="input-group">
            <label htmlFor="age">Age</label>
            <input
              type="text"
              id="age"
              name="age"
              placeholder="Enter Your Age"
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Your Email ID"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="passwd"
              name="password"
              placeholder="Enter Password Min 6"
            />
          </div>
          <button className="button primary-button" type="submit">
            Register
          </button>
        </form>
        <p>
          Already have an account ? <Link to={"/login"}>Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
