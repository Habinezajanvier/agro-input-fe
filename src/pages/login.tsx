import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import apis from "../store/apis";
import { UnknownAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { useNavigate } from "react-router-dom";

enum SelectedTab {
  LOGIN,
  SIGNUP,
}

type InputChangeState =
  | React.Dispatch<React.SetStateAction<LoginData>>
  | React.Dispatch<React.SetStateAction<SignupData>>;

type FocusedInput = keyof LoginData | keyof SignupData;

const Login = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [signupData, setSignupData] = useState<SignupData>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });
  const [selectedTab, setSelectedTab] = useState<SelectedTab>(
    SelectedTab.LOGIN
  );
  const [focused, setFocused] = useState<FocusedInput>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, message, loading, success } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (error || success) {
      setTimeout(() => {
        dispatch(apis.resetAll());
        if (success) {
          navigate("/", {});
        }
      }, 4000);
    }
  }, [error, dispatch, success, navigate]);

  const handleInputChange =
    (setState: InputChangeState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setState((state: any) => ({ ...state, [name]: value }));
    };

  const handleChangeTabSelection = (tab: SelectedTab) => () => {
    setSelectedTab(tab);
    setFocused(
      Object.keys(
        tab === SelectedTab.LOGIN ? loginData : signupData
      )[0] as FocusedInput
    );
  };

  const handleLoginForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(apis.login(loginData) as unknown as UnknownAction);
  };

  const handleRegisterForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(apis.register(signupData) as unknown as UnknownAction);
  };

  return (
    <div className="auth_page">
      <div className="auth_container">
        <div className="auth_head">
          <div
            className={
              selectedTab === SelectedTab.LOGIN ? "auth_head_selected" : ""
            }
            onClick={handleChangeTabSelection(SelectedTab.LOGIN)}
          >
            <h2>Login</h2>
          </div>
          <div
            className={
              selectedTab === SelectedTab.SIGNUP ? "auth_head_selected" : ""
            }
            onClick={handleChangeTabSelection(SelectedTab.SIGNUP)}
          >
            <h2>Register</h2>
          </div>
        </div>
        <div className={success ? "auth_success" : "auth_error"}>
          {error && <p>{message}</p>}
        </div>
        {/* <div className="auth_error">
          <p>message</p>
        </div> */}
        {selectedTab === SelectedTab.LOGIN && (
          <form onSubmit={handleLoginForm}>
            <div>
              {Object.keys(loginData).map((item, index) => (
                <div
                  key={index}
                  className={
                    focused === item ? "custom_input_focus" : "custom_input"
                  }
                >
                  <input
                    onFocus={() => setFocused(item as keyof LoginData)}
                    onChange={handleInputChange(setLoginData)}
                    name={item}
                    type={item}
                    value={loginData[item as keyof LoginData]}
                    placeholder={item}
                  />
                </div>
              ))}
            </div>
            <button disabled={loading} type="submit">
              {loading ? "Loading..." : "Submit"}
            </button>
          </form>
        )}
        {selectedTab === SelectedTab.SIGNUP && (
          <form onSubmit={handleRegisterForm}>
            <div>
              {Object.keys(signupData).map((item, index) => (
                <div
                  key={index}
                  className={
                    focused === item ? "custom_input_focus" : "custom_input"
                  }
                >
                  <input
                    onFocus={() => setFocused(item as keyof SignupData)}
                    type={item ?? "text"}
                    name={item}
                    value={signupData[item as keyof SignupData]}
                    onChange={handleInputChange(setSignupData)}
                    placeholder={item}
                  />
                </div>
              ))}
            </div>
            <button disabled={loading} type="submit">
              {loading ? "Loading..." : "Submit"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
