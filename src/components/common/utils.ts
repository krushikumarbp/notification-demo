import { DynamicFieldOptionTypes } from "./contentEditorTypes";

export const _getDynamicFieldOptions = (): DynamicFieldOptionTypes[] => {
  return [
    {
      value: "relatedusername",
      renderText: "*Related User Name*",
      label: "Related User Name",
    },
    {
      value: "recipientname",
      renderText: "*Recipient Name*",
      label: "Recipient Name",
    },
    {
      value: "trainingname",
      renderText: "*Training Name*",
      label: "Training Name",
    },
    {
      value: "elearninglink",
      renderText: "*eLearning Link*",
      label: "eLearning Link",
    },
    {
      value: "supervisorname",
      renderText: "*Supervisor Name*",
      label: "Supervisor Name",
    },
    {
      value: "companyname",
      renderText: "*Company Name*",
      label: "Company Name",
    },
  ];
};
