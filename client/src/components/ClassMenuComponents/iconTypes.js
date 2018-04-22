//Below we have the corresopding icons for each type of class
// Accounting ACC icon = account_balance
// Business BUS 160 = business_center
// English 111 = mode_edit
// Astronomy AST 120 = wb_sunny
// Biology BIO 170 = accessibility
// History COR 100 = history
// Computer Science CSC 126 = code
// Math MTH = add_box

export var iconType = icon => {
  switch (icon) {
    case "CSC":
      return "code";
    case "MTH":
      return "add_box";
    case "COR100":
      return "history";
    case "BIO":
      return "accessibility";
    case "AST":
      return "wb_sunny";
    case "ENG":
      return "mode_edit";
    case "BUS":
      return "cobusiness_centerde";
    case "ACC":
      return "account_balance";
    default:
      return "";
  }
};
