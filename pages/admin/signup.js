import { useForm } from "react-hook-form";

export default function signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async (form) => {
    const res = await fetch("/api/auth/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div>
      <form className="flex flex-col" onSubmit={handleSubmit(submitHandler)}>
        <label>First Name</label>
        <input
          placeholder="First Name"
          type="text"
          {...register("name", { required: true, maxLength: 20 })}
        />
        {errors.name && (
          <p className="text-red-700">
            {errors.name.type == "required"
              ? "please enter the firstname"
              : "maximum lenght for first name is 20 character"}
          </p>
        )}
        <label>Last Name</label>
        <input
          placeholder="Last Name"
          type="text"
          {...register("lastname", { required: true, maxLength: 20 })}
        />
        {errors.lastname && (
          <p className="text-red-700">
            {errors.lastname.type == "required"
              ? "please enter the last name"
              : "maximum lenght for last name is 20 character"}
          </p>
        )}
        <label>Email</label>
        <input
          placeholder="Email"
          type="email"
          {...register("email", {
            required: true,
            pattern:
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
        />
        {errors.email && (
          <p className="text-red-700">
            {errors.email.type == "required"
              ? "please enter an email"
              : "this email seems to be not valid"}
          </p>
        )}
        <label>Password</label>
        <input
          placeholder="Password"
          type="password"
          {...register("password", {
            required: true,
            pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,40}$/,
          })}
        />
        {errors.password && (
          <p className="text-red-700">
            {errors.password.type == "required"
              ? "please enter a password"
              : "password must be between 6 and 40 characters included capital letters and numbers"}
          </p>
        )}
        <label>Role</label>
        <input
          placeholder="admin"
          type="text"
          {...register("role", {
            required: true,
          })}
        />
        {errors.role && <p className="text-red-700">please enter the role</p>}
        <p>choose an access root condition</p>
        <div>
          <input
            type="radio"
            id="true"
            name="root"
            value="true"
            {...register("root")}
          />
          <label for="true">true</label> <br />
          <input
            type="radio"
            id="false"
            name="root"
            value="false"
            {...register("root")}
          />
          <label for="false">false</label> <br />
        </div>
        <label>Admin Email</label>
        <input
          placeholder="admin Email"
          type="email"
          {...register("adminEmail", {
            required: true,
            pattern:
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
        />
        {errors.adminEmail && (
          <p className="text-red-700">
            {errors.adminEmail.type == "required"
              ? "please enter admin email"
              : "this email seems to be not valid"}
          </p>
        )}
        <label>Admin Password</label>
        <input
          placeholder="Admin Password"
          type="adminPassword"
          {...register("adminPassword", {
            required: true,
            pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,40}$/,
          })}
        />
        {errors.adminPassword && (
          <p className="text-red-700">
            {errors.adminPassword.type == "required"
              ? "please enter admin password"
              : "password must be between 6 and 40 characters included capital letters and numbers"}
          </p>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
