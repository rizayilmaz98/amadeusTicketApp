import React, { useState } from "react";
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaClock,
  FaMoneyBillWave,
  FaMapMarkedAlt,
  FaPlane,
} from "react-icons/fa";

function TicketAccordion({ ticketInfo }) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };
  console.log(ticketInfo);
  return (
    <div>
      <div class="accordion-item mt-2">
        <h2 class="accordion-header">
          <button
            class="accordion-button bg-eighth"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`collapse-${ticketInfo.id}`}
            aria-expanded="true"
            aria-controls="collapseOne"
            onClick={handleToggle}
          >
            <div className="col-12">
              <div className="col-12 d-grid gap-2 gap-lg-0 align-items-center d-lg-flex">
                <div className="col-12 col-md-4 d-flex">
                  <div className="col d-flex justify-content-center align-items-center gap-2">
                    <FaPlaneDeparture className="accordion-icon" />
                    <span className="text-center fw-semibold">
                      {ticketInfo.departureCity}
                    </span>
                  </div>
                  <div className="col d-flex justify-content-center align-items-center gap-2">
                    <FaPlaneArrival className="accordion-icon" />
                    <span className="text-center fw-semibold">
                      {ticketInfo.destinationCity}
                    </span>
                  </div>
                </div>

                <div className="col-12 col-md-4 d-flex">
                  <div className="col d-flex justify-content-center align-items-center gap-2">
                    <FaClock className="accordion-icon" />
                    <span className="text-center fw-semibold">{`${Math.floor(
                      ticketInfo.flightTime / 60
                    )} saat ${
                      ticketInfo.flightTime % 60 === 0
                        ? ""
                        : `${ticketInfo.flightTime % 60} dakika`
                    }`}</span>
                  </div>
                  <div className="col d-flex justify-content-center align-items-center gap-2">
                    <FaClock className="accordion-icon" />
                    <span className="text-center fw-semibold">
                      {ticketInfo.departureClock}
                    </span>
                  </div>
                </div>

                <div className="col-12 col-md-4 d-flex">
                  <div className="col d-flex justify-content-center align-items-center gap-2">
                    <FaClock className="accordion-icon" />
                    <span className="text-center fw-semibold">
                      {ticketInfo.destinationClock}
                    </span>
                  </div>
                  <div className="col d-flex justify-content-center align-items-center gap-2">
                    <FaMoneyBillWave className="accordion-icon" />
                    <span className="text-center fw-semibold">
                      {ticketInfo.price} ₺
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </button>
        </h2>
        <div
          id={`collapse-${ticketInfo.id}`}
          class={`accordion-collapse collapse ${isCollapsed ? "" : "show"}`}
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body d-grid d-lg-flex justify-content-center gap-5 gap-lg-0">
            <div className="col-12 col-md-3 d-grid justify-content-center">
              <div className="d-flex justify-content-center align-items-center gap-2">
                <FaMapMarkedAlt />
                <span>Kalkış Havalimanı</span>
              </div>
              <hr />
              <span className="text-eleventh">
                {ticketInfo.departureAirport}
              </span>
            </div>
            <div className="col-12 col-md-3 d-grid justify-content-center">
              <div className="d-flex justify-content-center align-items-center gap-2">
                <FaMapMarkedAlt />
                <span>Varış Havalimanı</span>
              </div>
              <hr />
              <span className="text-eleventh">
                {ticketInfo.destinationAirport}
              </span>
            </div>
            <div className="col-12 col-md-3 d-grid justify-content-center">
              <div className="d-flex justify-content-center align-items-center gap-2">
                <FaPlane />
                <span>Uçak Kodu</span>
              </div>
              <hr />
              <span className="text-center text-eleventh">
                {ticketInfo.airplaneCode}
              </span>
            </div>
            <div className="col-12 col-md-3 d-grid justify-content-center">
              <div className="d-flex justify-content-center align-items-center gap-2">
                <FaClock />
                <span>Tahmini Rötar Süresi</span>
              </div>
              <hr />
              <span className="text-center text-eleventh">5 dakika</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketAccordion;
