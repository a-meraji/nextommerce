import { useForm } from "react-hook-form";

export default function signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async (form) => {

    const res = await fetch("/api/auth/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if(data.user){
      alert(data.message)
    }
  };

  return (
    <div className="bg-secondary text-secondary py-10">
      <form
        className="w-4/5 max-w-[500px] border-2 bg-third border-third p-6 sm:px-10 mx-auto rounded-xl flex flex-col"
        onSubmit={handleSubmit(submitHandler)}
      >
        <label className="mb-1 text-primary text-lg" htmlFor="name">
          First Name:
        </label>
        <input
          className="rounded-full px-2 mb-6 bg-secondary"
          placeholder="enter your First Name"
          id="name"
          type="text"
          {...register("name", { required: true, maxLength: 20 })}
        />
        {errors.name && (
          <p className="text-red-700 -mt-4 mb-4">
            {errors.name.type == "required"
              ? "* please enter your firstname"
              : "* maximum lenght for first name is 20 character"}
          </p>
        )}
        <label className="mb-1 text-primary text-lg" htmlFor="lastname">
          Last Name:
        </label>
        <input
          id="lastname"
          className="rounded-full px-2 mb-6 bg-secondary"
          placeholder="enter your Last Name"
          type="text"
          {...register("lastname", { required: true, maxLength: 20 })}
        />
        {errors.lastname && (
          <p className="text-red-700 -mt-4 mb-4">
            {errors.lastname.type == "required"
              ? "* please enter your last name"
              : "* maximum lenght for last name is 20 character"}
          </p>
        )}
        <label className="mb-1 text-primary text-lg" htmlFor="email">
          Email:
        </label>
        <input
          id="email"
          className="rounded-full px-2 mb-6 bg-secondary"
          placeholder="enter your Email"
          type="email"
          {...register("email", {
            required: true,
            pattern:
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
        />
        {errors.email && (
          <p className="text-red-700 -mt-4 mb-4">
            {errors.email.type == "required"
              ? "* please enter your email"
              : "* invalid Email"}
          </p>
        )}
        <label className="mb-1 text-primary text-lg" htmlFor="password">
          Password:
        </label>
        <input
          id="password"
          className="rounded-full px-2 mb-6 bg-secondary"
          placeholder="enter a Password"
          type="password"
          {...register("password", {
            required: true,
            pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,40}$/,
          })}
        />
        {errors.password && (
          <p className="text-red-700 -mt-4 mb-4">
            {errors.password.type == "required"
              ? "* please enter a password"
              : "* password must be between 6 and 40 characters included capital letters and numbers"}
          </p>
        )}
        <label className="mb-1 text-primary text-lg" htmlFor="phone">
          Phone:
        </label>
        <input
          className="rounded-full px-2 mb-6 bg-secondary"
          id="phone"
          type="text"
          placeholder="enter your phone number"
          {...register("phone", {
            pattern: /^\d+$/,
          })}
        />
        {errors.phone && (
          <p className="text-red-700 -mt-4 mb-4">* phone number not valid</p>
        )}

        <label className="mb-1 text-primary text-lg" htmlFor="address">
          Address:
        </label>
        <input
          className="rounded-full px-2 mb-6 bg-secondary"
          id="address"
          type="text"
          placeholder="enter your address"
          {...register("address")}
        />

        <button
          type="submit"
          className="bg-accent text-gray-200 my-5 text-lg rounded-full py-3 px-5"
        >
          Create account
        </button>
      </form>
    </div>
  );
}
