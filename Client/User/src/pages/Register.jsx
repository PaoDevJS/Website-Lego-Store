import { Link } from "react-router-dom";
import { useState } from "react";

//  React icons
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Register = () => {
  const [eye, setEye] = useState(false);
  const [eyeConfirm, setEyeConfirm] = useState(false);
  const [err, setErr] = useState(false);
  const [errFirstName, setErrFirstName] = useState(false);
  const [errLastName, setErrLastName] = useState(false);
  const [errEmail, setErrEmail] = useState(false);
  const [errPhone, setErrPhone] = useState(false);
  const [errPassword, setErrPassword] = useState(false);
  const [errConfirmPassword, setErrConfirmPassword] = useState(false);
  const [messEmail, setMessEmail] = useState("");
  const [messPhone, setMessPhone] = useState("");
  const [messPassword, setMessPassword] = useState("");
  const [messConfirmPassword, setMessConfirmPassword] = useState("");
  const [mess, setMess] = useState("");
  const [messLastName, setMessLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const message = "Vui lòng không để trống trường này."

  // check first name
  const CheckFirstName = () => {
    if (!firstName) {
      setErrFirstName(true);
      setMess(message);
      return;
    }

    setErrFirstName(false)
    setMess("")
  };

  // Check last name
  const CheckLastName = () => {
    if (!lastName) {
      setErrLastName(true);
      setMessLastName(message);
      return;
    }

    setErrLastName(false)
    setMessLastName("")
  }

  // Check email 
  const CheckEmail = () => {
    if(!email) {
        setErrEmail(true)
        setMessEmail(message)
        return
    }

    const re = /^\S+@\S+\.\S+$/
    if(!re.test(email)) {
        setErrEmail(true)
        setMessEmail("Email không hợp lệ, vui lòng nhập lại.")
        return
    }


    setErrEmail(false)
    setMessEmail("")
  }

  // Check phone number

  const CheckPhoneNumber = () => {
    if (!phone) {
      setErrPhone(true);
      setMessPhone(message);
      return;
    }

    const relex = /^[0-9]+$/
    if(!relex.test(phone)) {
      setErrPhone(true)
      setMessPhone("Số điện thoại không hợp lệ, vui lòng nhập lại.")
      return
    }
    

    setErrPhone(false)
    setMessPhone("")
  }

  // Check password
  const CheckPassword = () => {
    if(!password) {
      setErrPassword(true)
      setMessPassword(message)
      return
    }

    setErrPassword(false)
    setMessPassword("")
  }

  // check confirm password
  const CheckConfirmPassword = () => {
    if(!confirmPassword) {
      setErrConfirmPassword(true)
      setMessConfirmPassword(message)
      return
    }
    setErrConfirmPassword(false)
    setMessConfirmPassword("")
  }

  // const CheckPasswordAndConfirmPassword = () => {

  //   if(password != confirmPassword) {
  //     setErrConfirmPassword(true)
  //     setMess("Vui lòng không để trống trường này.")
  //     return
  //   }

  //   setErrConfirmPassword(false)
  //   setMess("")
  // }

  const handleSubmitRegister = (e) => {
    e.preventDefault();

    CheckConfirmPassword();
    CheckPassword();
    CheckEmail();
    CheckFirstName();
    CheckLastName();
    CheckPhoneNumber();
  };
  return (
    <div className="w-full h-[90vh] flex items-center justify-center">
      <div className="2xl:w-[30%] md:w-[50%] w-[70%] py-5 px-10 rounded-md">
        <form className="flex flex-col gap-7">
          <div className="my-5">
            <h1 className="text-3xl font-bold ">Đăng ký tài khoản</h1>
            <p className="text-[16px] leading-10 text-gray-600">
              Hãy nhập thông tin để đăng ký tài khoản
            </p>
          </div>

          {/* Enter FirstName & LastName */}
          <div className="flex items-center justify-between">
            <div className={`w-[45%] py-3 px-4 rounded-md border relative border-gray-300 ${errFirstName? "border border-red-600" : "border border-gray-300"}`}>
              <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={vail => setFirstName(vail.target.value)}
                placeholder="Nhập Họ"
                className="outline-none w-full placeholder:font-[500]"
              />
              <small className={`${errFirstName? "block" : "hidden"} absolute bottom-[-20px] left-1 w-[200px] text-red-600`}>{mess}</small>
            </div>
            <div className={`w-[45%] py-3 px-4 rounded-md relative ${errLastName? "border border-red-600" : "border border-gray-300"}`}>
              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={vail => setLastName(vail.target.value)}
                placeholder="Nhập tên"
                className="outline-none w-full placeholder:font-[500]"
              />
              <small className={`${errLastName? "block" : "hidden"} absolute bottom-[-20px] left-0 w-[200px] text-red-600`}>{messLastName}</small>
            </div>
          </div>

          {/* Enter email */}
          <div className={`py-3 px-4 rounded-md relative ${errEmail? "border border-red-600" : "border border-gray-300"}`}>
            <input
              type="text"
              name="email"
              value={email}
              onChange={vail => setEmail(vail.target.value)}
              placeholder="Nhập email"
              className="outline-none w-full placeholder:font-[500]"
            />
            <small className={`${errEmail? "block" : "hidden"} absolute bottom-[-20px] left-1 w-[200px] text-red-600`}>{messEmail}</small>
          </div>

          {/* Enter phone number */}
          <div className={`py-3 px-4 rounded-md relative ${errPhone? "border border-red-600" : "border border-gray-300"}`}>
            <input
              type="text"
              placeholder="Nhập số điện thoại"
              onChange={vail => setPhone(vail.target.value)}
              className="outline-none w-full placeholder:font-[500]"
            />
            <small className={`${errPhone? "block" : "hidden"} absolute bottom-[-20px] left-1 text-red-600`}>{messPhone}</small>
          </div>

          {/* Enter password */}
          <div className={`py-3 px-4 rounded-md relative flex items-center gap-4 ${errPassword? "border border-red-600" : "border border-gray-300"}`}>
            <input
              type={`${eye ? "text" : "password"}`}
              placeholder="Nhập mật khẩu"
              name="password"
              value={password}
              onChange={vail => setPassword(vail.target.value)}
              className="outline-none w-full placeholder:font-[500]"
            />
            {eye ? (
              <FaRegEye
                size={20}
                onClick={() => setEye(false)}
                className="cursor-pointer text-gray-400 hover:text-dark"
              />
            ) : (
              <FaRegEyeSlash
                onClick={() => setEye(true)}
                size={20}
                className="cursor-pointer text-gray-400 hover:text-dark"
              />
            )}
            <small className={`${errPassword? "block" : "hidden"} absolute bottom-[-20px] left-1 w-[200px] text-red-600`}>{messPassword}</small>
          </div>

          {/* Enter confirm password */}
          <div className = {`py-3 px-4 rounded-md relative flex items-center gap-4 ${errConfirmPassword? "border border-red-600" : "border border-gray-300"}`}>
            <input
              type={`${eye ? "text" : "password"}`}
              placeholder="Nhập lại mật khẩu"
              name="confirmPassword"
              value={confirmPassword}
              onChange={vail => setConfirmPassword(vail.target.value)}
              className="outline-none w-full placeholder:font-[500]"
            />
            {eyeConfirm ? (
              <FaRegEye
                size={20}
                onClick={() => setEyeConfirm(false)}
                className="cursor-pointer text-gray-400 hover:text-dark"
              />
            ) : (
              <FaRegEyeSlash
                onClick={() => setEyeConfirm(true)}
                size={20}
                className="cursor-pointer text-gray-400 hover:text-dark"
              />
            )}
            <small className={`${errConfirmPassword? "block" : "hidden"} absolute bottom-[-20px] left-1 w-[200px] text-red-600`}>{messConfirmPassword}</small>
          </div>

          {/* btn submit create account */}
          <div className="mt-3">
            <button
              onClick={handleSubmitRegister}
              className="py-3 w-full bg-red-700 rounded-full font-bold text-[16px] text-white cursor-pointer hover:bg-red-700/80 transition duration-200 ease-in"
            >
              Tạo tài khoản
            </button>
            <p className="text-[16px] text-gray-600 text-center py-5">
              Bạn đã có tài khoản?{" "}
              <Link to={"/customer/account/login"}>
                <span className="font-[500] text-dark underline hover:text-red-500">
                  Đăng nhập ngay
                </span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
