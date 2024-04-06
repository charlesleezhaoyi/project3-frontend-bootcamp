import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { BACKEND_URL } from "../../constants";
import LogoutButton from "../LogoutButton";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const Settings = ({ open, setOpen, setErrorMessage }) => {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const [userData, setUserData] = useState(null);
  const [userDonation, setUserDonation] = useState([]);
  const [userRequest, setUserRequest] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const userDataRes = await axios.get(
          `${BACKEND_URL}/users/${user.email}`
        );
        setUserData(userDataRes.data);
        const donationsRes = await axios.get(
          `${BACKEND_URL}/donations/user/${user.email}`
        );
        setUserDonation(donationsRes.data);
        const requestRes = await axios.get(
          `${BACKEND_URL}/requests/user/${user.email}`
        );
        setUserRequest(requestRes.data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    getData();
  }, [user.email, setErrorMessage]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                entyer="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => setOpen(false)}
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                        About You
                      </Dialog.Title>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      <div className="text-lg font-semibold">
                        {userData
                          ? `${userData.firstName} ${userData.lastName}`
                          : null}
                      </div>
                      <div className="mt-4 text-base font-semibold">
                        Donations
                      </div>
                      <ul>
                        {userDonation &&
                          userDonation.map((donation, index) => (
                            <div
                              key={index}
                              className="mt-2 p-4 bg-white rounded-xl shadow-md"
                              onClick={() => navigate(`/books/${donation.id}`)}
                            >
                              {donation.book.title}
                            </div>
                          ))}
                      </ul>
                      <div className="mt-4 text-base font-semibold">
                        Requests
                      </div>
                      <ul>
                        {userRequest &&
                          userRequest.map((request, index) => (
                            <div
                              key={index}
                              className="mt-2 p-4 bg-white rounded-xl shadow-md"
                            >
                              {request.donation.book.title}
                            </div>
                          ))}
                      </ul>
                      <div className="mt-4">
                        <LogoutButton />
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Settings;
