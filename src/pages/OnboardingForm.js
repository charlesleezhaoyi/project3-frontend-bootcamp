import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import CategoryRanking from "../components/Common/CategoryRanking";
import axios from "axios";
import { BACKEND_URL } from "../constants";

const Onboarding = () => {
  const { isAuthenticated, user, logout } = useAuth0();
  const [, setErrorMessage] = useOutletContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    bookPreferences: [],
    smsConsent: false,
    emailConsent: false,
  });

  const handleSaveBtnClick = async (e) => {
    e.preventDefault();
    if (isAuthenticated && user) {
      try {
        if (!user.email_verified) {
          throw new Error("Please verify your email address.");
        }
        const { firstName, lastName, phone, smsConsent, emailConsent } =
          formData;
        if (
          !formData.firstName.length ||
          !formData.lastName.length ||
          !formData.phone.length
        ) {
          throw new Error("Missing user data");
        }
        const userObj = {
          email: user.email,
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          smsConsent: smsConsent,
          emailConsent: emailConsent,
        };
        await axios.put(`${BACKEND_URL}/users`, userObj);
        navigate("/home");
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
  };

  const requestAuth0ExplorerToken = async () => {
    const options = {
      method: "POST",
      url: process.env.REACT_APP_AUTH0_ENDPOINT_URL,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
        client_secret: process.env.REACT_APP_AUTH0_CLIENT_SECRET,
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        grant_type: "client_credentials",
      },
    };

    try {
      const response = await axios(options);
      const Auth0Token = response.data;
      return Auth0Token;
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleVerifyEmailBtnClick = async (e) => {
    e.preventDefault();

    if (isAuthenticated && user) {
      try {
        const token = await requestAuth0ExplorerToken();
        let data = JSON.stringify({
          user_id: user.sub,
          client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
        });

        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: process.env.REACT_APP_AUTH0_EMAIL_ENDPOINT_URL,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token.access_token}`,
          },
          data: data,
        };

        axios
          .request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, type } = event.target;
    const value =
      type === "checkbox" ? event.target.checked : event.target.value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="px-4 sm:P-12 lg:px-16">
      <form className="text-left">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      First name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={(event) => handleInputChange(event)}
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Last name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="lastName"
                          id="lastName"
                          autoComplete="family-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={(event) => handleInputChange(event)}
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="phone"
                          id="hone"
                          autoComplete="phone"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={(event) => handleInputChange(event)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Book Preferences
            </h2>
            <CategoryRanking />
          </div>
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Notifications
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              We'll always let you know about important changes, but you pick
              what else you want to hear about.
            </p>

            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">
                  By Email
                </legend>
                <div className="mt-6 space-y-6">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="emailConsent"
                        name="emailConsent"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="comments"
                        className="font-medium text-gray-900"
                      >
                        Requests
                      </label>
                      <p className="text-gray-500">
                        Get notified when your request is accepted by donor
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">
                  SMS Notifications
                </legend>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  These are delivered via SMS to your mobile phone.
                </p>
                <div className="mt-6 space-y-6">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="smsConsent"
                        name="smsConsent"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="comments"
                        className="font-medium text-gray-900"
                      >
                        Requests
                      </label>
                      <p className="text-gray-500">
                        Get notified when your request is accepted by donor
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={() => logout()}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="sticky rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleVerifyEmailBtnClick}
          >
            Verify Email
          </button>
          <button
            type="submit"
            className="sticky rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleSaveBtnClick}
          >
            Complete
          </button>
        </div>
      </form>
    </div>
  );
};

export default Onboarding;
