import React from "react";
import Ticket from "../components/Ticket/Ticket";
import Navbar from "../components/everyWhere/Navbar";
import "../style/bootstrap-override.scss";
function TicketPage() {
  return (
    <div className="bg-fifth" style={{ height: "100vh" }}>
      <Navbar />
      <Ticket />
    </div>
  );
}

export default TicketPage;
