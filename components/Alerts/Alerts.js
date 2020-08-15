import React, { useEffect } from "react";
import { connect } from "react-redux";

import { ToastContainer, toast } from "react-toastify";

function Alerts({ alerts }) {
  useEffect(() => {
    if (alerts.length > 0) {
      alerts.map((alert) => {
        if (alert.alertType === "success") {
          toast.success(alert.message, { autoClose: 2000 });
        } else if (alert.alertType === "danger") {
          toast.error(alert.message, { autoClose: 2000 });
        } else if (alert.alertType === "info") {
          toast.info(alert.message, { autoClose: 2000 });
        }
      });
    }
  }, [alerts]);

  return (
    <div>
      <ToastContainer />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    alerts: state.alert,
  };
};

export default connect(mapStateToProps)(Alerts);
