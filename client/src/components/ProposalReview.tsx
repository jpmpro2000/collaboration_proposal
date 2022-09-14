import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useAppDispatch, useAppSelector } from "../hooks/index";
import { close } from "../redux/slices/modal.slice";
import { proposalData, remove } from "../redux/slices/proposal.slice";

import { LoadingPage } from "../pages/LoadingPage";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Proposal } from "../types";

export const ProposalReview = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const proposal: Proposal | null = useAppSelector(proposalData);

  if (!proposal) return <LoadingPage />;

  const handleConfirm = () => {
    axios
      .post("http://localhost:3001/api/proposal/sendMail", proposal)
      .then((res) => {
        // console.log(res);
        toast.success("Mail sent successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/", { state: { resetForm: true } });
        dispatch(remove());
        dispatch(close());
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error sending mail", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <div className="absolute top-0 left-0 right-0 mx-auto my-[5vh] bg-gray-50 rounded-xl w-3/4 p-2">
      <h2 className="text-center mb-2">Porposal Review</h2>

      <div className="border-t border-gray-200">
        <dl>
          <div>
            <dt>General</dt>
            <dt>Name</dt>
            <dd>{proposal.general.name}</dd>
            <dt>Email</dt>
            <dd>{proposal.general.email}</dd>
            <dt>Collaboration Start Date</dt>
            <dd>{proposal.general.collabStartDate.toString()}</dd>
          </div>
          <div>
            <dt>Financial</dt>
            <dt>Base Value</dt>
            <dd>{proposal.financial.baseValue}€</dd>
            <dt>Work Shedule Exemption</dt>
            <dd>{proposal.financial.workSchedExePct}%</dd>
            <dt>Work Shedule Exemption Value</dt>
            <dd>{proposal.financial.workSchedExeValue}€</dd>
            <dt>IRS Tax</dt>
            <dd>{proposal.financial.irsTax}%</dd>
            <dt>Vacations Twelfth</dt>
            <dd>{proposal.financial.vacationsTwelfth}€</dd>
            <dt>Christmas Twelfth</dt>
            <dd>{proposal.financial.christmasTwelfth}€</dd>
            <dt>Other Expenses</dt>
            <dd>{proposal.financial.otherExpenses}€</dd>
            <dt>Remote Work Allowance</dt>
            <dd>{proposal.financial.remoteWorkAlw}€</dd>
          </div>
          <div>
            <dt>Benefits</dt>
            <dt>Communications Plafond</dt>
            <dd>{proposal.benefits.commsPlafond}€</dd>
            <dt>Health Insurance</dt>
            <dd>{proposal.benefits.healthIns}€</dd>
            <dt>Number of Familiy Members included in Health Insurance</dt>
            <dd>{proposal.benefits.healthInsNumFamMembers}</dd>
          </div>
          <div>
            <dt>Deductions</dt>
            <dt>Base Value Social Security</dt>
            <dd>{proposal.deductions.baseValueSS}€</dd>
            <dt>Christmas Allowance Twelfth Social Security</dt>
            <dd>{proposal.deductions.christmasAlwTwelfthSS}€</dd>
            <dt>Vacations Allowance Twelfth Social Security</dt>
            <dd>{proposal.deductions.vacationsAlwTwelfthSS}€</dd>
            <dt>Base Value IRS</dt>
            <dd>{proposal.deductions.baseValueIRS}€</dd>
            <dt>Christmas Allowance Twelfth IRS</dt>
            <dd>{proposal.deductions.christmasAlwTwelfthIRS}€</dd>
            <dt>Vacations Allowance Twelfth IRS</dt>
            <dd>{proposal.deductions.vacationsAlwTwelfthIRS}€</dd>
          </div>
          <div>
            <dt>Values</dt>
            <dt>Monthly Gross Value</dt>
            <dd>{proposal.values.monthlyGrossValue}€</dd>
            <dt>Monthly Net Value</dt>
            <dd>{proposal.values.monthlyNetValue}€</dd>
            <dt>Annual Gross Value</dt>
            <dd>{proposal.values.annualGrossValue}€</dd>
            <dt>Annual Net Value</dt>
            <dd>{proposal.values.annualNetValue}€</dd>
            <dt>Monthly Benefits</dt>
            <dd>{proposal.values.monthlyBenefits}€</dd>
            <dt>Annual Benefits</dt>
            <dd>{proposal.values.annualBenefits}€</dd>
          </div>
          <div>
            <dt>Costs</dt>
            <dt>Annual Cost</dt>
            <dd>{proposal.costs.annualCost}€</dd>
            <dt>Monthly Cost</dt>
            <dd>{proposal.costs.monthlyCost}€</dd>
            <dt>Daily Cost</dt>
            <dd>{proposal.costs.dailyCost}€</dd>
          </div>
        </dl>
      </div>

      <div className="mt-2 flex">
        <button onClick={() => dispatch(close())} type="button">
          Cancelar
        </button>
        <button onClick={handleConfirm} className="ml-auto" type="button">
          Confirmar
        </button>
      </div>
    </div>
  );
};
