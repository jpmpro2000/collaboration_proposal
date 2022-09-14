import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLocation } from "react-router-dom";
import moment from "moment";
import axios from "axios";

import { useAppDispatch } from "../hooks/index";
import { open } from "../redux/slices/modal.slice";
import { add } from "../redux/slices/proposal.slice";

import { ProposalInputs, CalcDVC } from "../types";
import { ValidationError } from "./ValidationError";

export const ProposalForm = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ProposalInputs>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      general: {
        name: "",
        email: "",
        collabStartDate: moment().format("yyyy-MM-DD"),
      },
      financial: {
        baseValue: 0,
        workSchedExePct: 25,
        workSchedExeValue: 0,
        irsTax: 0,
        vacationsTwelfth: 0,
        christmasTwelfth: 0,
        otherExpenses: 0,
        remoteWorkAlw: 15,
      },
      benefits: {
        commsPlafond: 25,
        healthIns: 30,
        healthInsNumFamMembers: 0,
      },
    },
  });
  const [showInput, setShowInput] = useState(false);
  const { state }: any = location;

  useEffect(() => {
    if (state?.resetForm === true) {
      reset();
      setShowInput(false);
      state.resetForm = false;
    }
  }, [state, reset]);

  const onSubmitProposal: SubmitHandler<ProposalInputs> = (data) => {
    const values: CalcDVC = {
      financial: {
        baseValue: data.financial.baseValue,
        workSchedExeValue: data.financial.workSchedExeValue,
        christmasTwelfth: data.financial.christmasTwelfth,
        vacationsTwelfth: data.financial.vacationsTwelfth,
        irsTax: data.financial.irsTax,
        otherExpenses: data.financial.otherExpenses,
        remoteWorkAlw: data.financial.remoteWorkAlw,
      },
      benefits: {
        commsPlafond: data.benefits.commsPlafond,
        healthIns: data.benefits.healthIns,
      },
    };

    if (isValid) {
      axios
        .post("http://localhost:3001/api/proposal/calcDVC", values)
        .then((res) => {
          const proposal = { ...data, ...res.data };
          dispatch(open());
          dispatch(add(proposal));
        })
        .catch((error) => console.log(error));
    }
  };

  const calcWorkSchedExeValue = () => {
    if (
      getValues("financial.baseValue") &&
      getValues("financial.workSchedExePct")
    ) {
      const values = {
        baseValue: getValues("financial.baseValue"),
        workSchedExePct: getValues("financial.workSchedExePct"),
      };

      axios
        .post("http://localhost:3001/api/proposal/calcWSEV", values)
        .then(({ data }) => {
          setValue("financial.workSchedExeValue", data);
          calcTwelfths();
        })
        .catch((error) => console.log(error));
    }
  };

  const calcTwelfths = async () => {
    if (
      getValues("financial.baseValue") &&
      getValues("financial.workSchedExeValue")
    ) {
      const values = {
        baseValue: getValues("financial.baseValue"),
        workSchedExeValue: getValues("financial.workSchedExeValue"),
      };

      axios
        .post("http://localhost:3001/api/proposal/calcTwelfths", values)
        .then(({ data }) => {
          setValue("financial.vacationsTwelfth", data);
          setValue("financial.christmasTwelfth", data);
        })
        .catch((error) => console.log(error));
    }
  };

  const calcHealthIns = () => {
    setValue("benefits.healthIns", 30);

    if (
      getValues("benefits.healthIns") &&
      getValues("benefits.healthInsNumFamMembers")
    ) {
      const values = {
        healthIns: getValues("benefits.healthIns"),
        healthInsNumFamMembers: getValues("benefits.healthInsNumFamMembers"),
      };

      axios
        .post("http://localhost:3001/api/proposal/calcHealthIns", values)
        .then(({ data }) => {
          setValue("benefits.healthIns", data);
        })
        .catch((error) => console.log(error));
    }
  };

  const handleCheckbox = () => {
    setShowInput(!showInput);

    setValue("benefits.healthIns", 30);
    setValue("benefits.healthInsNumFamMembers", 0);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitProposal)} className="space-y-6">
      <section>
        <h2>GENERAL</h2>

        <div>
          <label>
            Name<span>*</span>
          </label>
          <input
            {...register("general.name", {
              required: { value: true, message: "Name is required" },
              maxLength: {
                value: 64,
                message: "Max length of 64 characters exceeded",
              },
            })}
            type="text"
            className="inputs w-full rounded-md"
          />
          <ValidationError error={errors.general?.name} />
        </div>

        <div>
          <label>
            Email<span>*</span>
          </label>
          <input
            {...register("general.email", {
              required: { value: true, message: "Email is required" },
            })}
            type="email"
            className="inputs w-full rounded-md"
          />
          <ValidationError error={errors.general?.email} />
        </div>

        <div>
          <label>
            Collaboration Start Date<span>*</span>
          </label>
          <input
            {...register("general.collabStartDate", {
              required: {
                value: true,
                message: "Collaboration start date is required",
              },
              min: {
                value: moment().add(1, "days").startOf("day").toString(),
                message:
                  "Collaboration start date needs to be atleast tomorrow",
              },
            })}
            type="date"
            className="inputs w-[8.5rem] rounded-md"
          />
          <ValidationError error={errors.general?.collabStartDate} />
        </div>
      </section>

      <section>
        <h2>FINANCIAL</h2>

        <div>
          <label>
            Base Value<span>*</span>
          </label>
          <div>
            <input
              {...register("financial.baseValue", {
                onBlur: calcWorkSchedExeValue,
                valueAsNumber: true,
                required: {
                  value: true,
                  message: "Base value is required",
                },
                min: { value: 0, message: "Base value cannot be less than 0" },
              })}
              type="number"
              step=".01"
              className="inputs"
            />
            <span>€</span>
          </div>
          <ValidationError error={errors.financial?.baseValue} />
        </div>

        <div className="inputs-flex">
          <div className="w-1/2">
            <label>
              Work Schedule Exemption<span>*</span>
            </label>
            <div>
              <input
                {...register("financial.workSchedExePct", {
                  onBlur: calcWorkSchedExeValue,
                  valueAsNumber: true,
                  required: {
                    value: true,
                    message: "Work schedule exemption is required",
                  },
                  min: {
                    value: 0,
                    message: "Work schedule exemption cannot be less than 0",
                  },
                })}
                type="number"
                step=".01"
                className="inputs"
              />
              <span>%</span>
            </div>
            <ValidationError error={errors.financial?.workSchedExePct} />
          </div>

          <div className="w-1/2">
            <label>Work Schedule Exemption Value</label>
            <div>
              <input
                {...register("financial.workSchedExeValue", {
                  valueAsNumber: true,
                })}
                disabled
                type="number"
                step=".01"
                className="inputs"
              />
              <span>€</span>
            </div>
          </div>
        </div>

        <div>
          <label>
            IRS Tax<span>*</span>
          </label>
          <div>
            <input
              {...register("financial.irsTax", {
                valueAsNumber: true,
                required: {
                  value: true,
                  message: "IRS tax is required",
                },
                min: { value: 0, message: "IRS tax cannot be less than 0" },
                // max: {
                //   value: 43.8,
                //   message: "IRS tax cannot be more than 43.8",
                // },
              })}
              type="number"
              step=".01"
              className="inputs"
            />
            <span>%</span>
          </div>
          <ValidationError error={errors.financial?.irsTax} />
        </div>

        <div className="inputs-flex">
          <div className="w-1/2">
            <label>Vacations Twelfth</label>
            <div>
              <input
                {...register("financial.vacationsTwelfth", {
                  valueAsNumber: true,
                })}
                disabled
                type="number"
                step=".01"
                className="inputs"
              />
              <span>€</span>
            </div>
          </div>

          <div className="w-1/2">
            <label>Christmas Twelfth</label>
            <div>
              <input
                {...register("financial.christmasTwelfth", {
                  valueAsNumber: true,
                })}
                disabled
                type="number"
                step=".01"
                className="inputs"
              />
              <span>€</span>
            </div>
          </div>
        </div>

        <div>
          <label>
            Other Expenses<span>*</span>
          </label>
          <div>
            <input
              {...register("financial.otherExpenses", {
                valueAsNumber: true,
                required: {
                  value: true,
                  message: "Other expenses is required",
                },
                min: {
                  value: 0,
                  message: "Other expenses cannot be less than 0",
                },
              })}
              type="number"
              step=".01"
              className="inputs"
            />
            <span>€</span>
          </div>
          <ValidationError error={errors.financial?.otherExpenses} />
        </div>

        <div>
          <label>
            Remote Work Allowance<span>*</span>
          </label>
          <div>
            <input
              {...register("financial.remoteWorkAlw", {
                valueAsNumber: true,
                required: {
                  value: true,
                  message: "Remote work allowance is required",
                },
                min: {
                  value: 0,
                  message: "Remote work allowance cannot be less than 0",
                },
              })}
              type="number"
              step=".01"
              className="inputs"
            />
            <span>€</span>
          </div>
          <ValidationError error={errors.financial?.remoteWorkAlw} />
        </div>
      </section>

      <section>
        <h2>BENEFITS</h2>

        <div>
          <label>
            Communications Plafond<span>*</span>
          </label>
          <div>
            <input
              {...register("benefits.commsPlafond", {
                valueAsNumber: true,
                required: {
                  value: true,
                  message: "Communications plafond is required",
                },
                min: {
                  value: 0,
                  message: "Communications plafond cannot be less than 0",
                },
              })}
              type="number"
              step=".01"
              className="inputs"
            />
            <span>€</span>
          </div>
          <ValidationError error={errors.benefits?.commsPlafond} />
        </div>

        <div>
          <label>Health Insurance</label>
          <div>
            <input
              {...register("benefits.healthIns", {
                valueAsNumber: true,
              })}
              disabled
              type="number"
              className="inputs"
            />
            <span>€</span>
          </div>
        </div>

        <div>
          <label>
            Include Family Members in Health Insurance?
            <input
              onClick={handleCheckbox}
              type="checkbox"
              className="ml-2 w-4 h-4"
            />
          </label>
          {showInput && (
            <>
              <label>Number of Family Members</label>
              <input
                {...register("benefits.healthInsNumFamMembers", {
                  onBlur: calcHealthIns,
                  valueAsNumber: true,
                })}
                type="number"
                step="1"
                className="inputs rounded-md"
              />
              <ValidationError
                error={errors.benefits?.healthInsNumFamMembers}
              />
            </>
          )}
        </div>
      </section>

      <div className="flex items-center justify-center">
        <button
          type="submit"
          // disabled={!isValid}
          className={`${!isValid && "opacity-50"}`}
        >
          View Proposal
        </button>
      </div>
    </form>
  );
};
