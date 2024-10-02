import React from 'react'
import swal from "sweetalert";

const Swalpop = (message, status) => {
  return swal(message, "", status);
};

export default Swalpop;
