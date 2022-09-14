import { useAppSelector } from "../hooks/index";

import { Header } from "../components/Header";
import { ProposalForm } from "../components/ProposalForm";
import { ProposalReview } from "../components/ProposalReview";

import { ToastContainer } from "react-toastify";

export const ProposalPage = () => {
  const isOpen = useAppSelector((state) => state.modal.isOpen);

  return (
    <>
      <div className={`${isOpen && "blur-md pointer-events-none"}`}>
        <Header />
        <div className={`mt-[8vh] p-5 ${isOpen && "mt-0"}`}>
          <ProposalForm />
        </div>
      </div>

      {isOpen && <ProposalReview />}

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};
