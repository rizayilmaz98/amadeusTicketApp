import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTicketsAsync } from "../../redux/tickets/ticketsSlice";
import TicketAccordion from "./TicketAccordion";
import { FaFilter } from "react-icons/fa6";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import "../../style/bootstrap-override.scss";
function Ticket() {
  const { info } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTicketsAsync());
  }, [dispatch]);

  const data = useSelector((state) => state.tickets.data);
  const departure = info.split("|")[0];
  const destination = info.split("|")[1];
  const startDate = info.split("|")[2];
  const endDate = info.split("|")[3];

  const [sortByDeparture, setSortByDeparture] = useState("");
  const [sortByDestination, setSortByDestination] = useState("");

  const filterDepartureTicket = data.filter(
    (item) =>
      item.departureCity.includes(departure) &&
      item.destinationCity.includes(destination) &&
      item.departureDate === startDate
  );

  const filterDestinationTicket = data.filter(
    (item) =>
      item.departureCity.includes(destination) &&
      item.destinationCity.includes(departure) &&
      item.departureDate === endDate
  );

  const handleDepartureSortChange = (e) => {
    const selectedSortBy = e.target.value;
    setSortByDeparture(selectedSortBy);
  };

  const handleDestinationSortChange = (e) => {
    const selectedSortBy = e.target.value;
    setSortByDestination(selectedSortBy);
  };

  const getSortedDepartureTickets = () => {
    if (sortByDeparture === "timePlus") {
      return [...filterDepartureTicket].sort(
        (a, b) => a.flightTime - b.flightTime
      );
    } else if (sortByDeparture === "pricePlus") {
      return [...filterDepartureTicket].sort((a, b) => a.price - b.price);
    } else if (sortByDeparture === "departurePlus") {
      return [...filterDepartureTicket].sort((a, b) =>
        a.departureClock.localeCompare(b.departureClock)
      );
    } else if (sortByDeparture === "destinationPlus") {
      return [...filterDepartureTicket].sort((a, b) =>
        a.destinationClock.localeCompare(b.destinationClock)
      );
    } else {
      return filterDepartureTicket;
    }
  };

  const getSortedDestinationTickets = () => {
    if (sortByDestination === "timePlus") {
      return [...filterDestinationTicket].sort(
        (a, b) => a.flightTime - b.flightTime
      );
    } else if (sortByDestination === "pricePlus") {
      return [...filterDestinationTicket].sort((a, b) => a.price - b.price);
    } else if (sortByDestination === "departurePlus") {
      return [...filterDestinationTicket].sort((a, b) =>
        a.departureClock.localeCompare(b.departureClock)
      );
    } else if (sortByDestination === "destinationPlus") {
      return [...filterDestinationTicket].sort((a, b) =>
        a.destinationClock.localeCompare(b.destinationClock)
      );
    } else {
      return filterDestinationTicket;
    }
  };
  return (
    <section className="pt-5 bg-fifth">
      <div className="mt-3 info-section d-flex align-items-center">
        <div className="container">
          <div className="col-12 col-md-6 d-lg-flex my-1 gap-3">
            <div className="col-12 col-md-4 card d-flex align-items-center justify-content-center py-1">
              <p className="d-flex align-items-center gap-3 m-0">
                <FaMapMarkerAlt />
                <span>{departure}</span>
              </p>
            </div>
            <div className="col-12 col-md-4 card d-flex align-items-center justify-content-center py-1">
              <p className="d-flex align-items-center gap-3 m-0">
                <FaMapMarkerAlt />
                <span>{destination}</span>
              </p>
            </div>
            <div className="col-12 col-md-4 card d-flex align-items-center justify-content-center py-1">
              <p className="d-flex align-items-center gap-3 m-0">
                <FaCalendarAlt />
                <span>{startDate}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      {getSortedDepartureTickets().length === 0 ? (
        <div className="mt-3">
          <p className="text-center">
            Girdiğiniz Kriterlere Göre Uçuş Bulunamadı !
          </p>
        </div>
      ) : (
        <div className="container mt-5 ">
          <div className="row">
            <div className="col-12 d-grid">
              <div className="col-12">
                <div className="col-12 d-flex justify-content-end">
                  <div className="col-12 col-md-3 d-flex align-items-center justify-content-between gap-0 gap-lg-3">
                    <div className="d-none d-lg-flex">
                      <span className="fs-7 fw-semibold d-flex align-items-center gap-3">
                        <span>Filtrele</span>{" "}
                        <FaFilter className="filter-icon" />
                      </span>
                    </div>
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      value={sortByDeparture}
                      onChange={handleDepartureSortChange}
                    >
                      <option selected>Kriter Seçin !</option>
                      <option value="pricePlus">Fiyata Göre (Artan)</option>
                      <option value="timePlus">
                        Uçuş Süresine Göre (Artan)
                      </option>
                      <option value="departurePlus">
                        Varış Saatine Göre (Artan)
                      </option>
                      <option value="destinationPlus">
                        Kalkış Saatine Göre (Artan)
                      </option>
                    </select>
                  </div>
                </div>
                <div className="col-12">
                  <div class="accordion" id="accordionExample">
                    {getSortedDepartureTickets().map((item, index) => {
                      return <TicketAccordion key={index} ticketInfo={item} />;
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <hr className="mt-5" />
      <div className={`${endDate === undefined ? "d-none" : "col-12"} `}>
        <div className="mt-3 info-section d-flex align-items-center">
          <div className="container">
            <div className="col-12 col-md-6 d-lg-flex my-1 gap-3">
              <div className="col-12 col-md-4 card d-flex align-items-center justify-content-center py-1">
                <p className="d-flex align-items-center gap-3 m-0">
                  <FaMapMarkerAlt />
                  <span>{destination}</span>
                </p>
              </div>
              <div className="col-12 col-md-4 card d-flex align-items-center justify-content-center py-1">
                <p className="d-flex align-items-center gap-3 m-0">
                  <FaMapMarkerAlt />
                  <span>{departure}</span>
                </p>
              </div>
              <div className="col-12 col-md-4 card d-flex align-items-center justify-content-center py-1">
                <p className="d-flex align-items-center gap-3 m-0">
                  <FaCalendarAlt />
                  <span>{endDate}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        {getSortedDestinationTickets().length === 0 ? (
          <div className="mt-3">
            <p className="text-center">
              Girdiğiniz Kriterlere Göre Uçuş Bulunamadı !
            </p>
          </div>
        ) : (
          <div className="container mt-5">
            <div className="row">
              <div className="col-12 d-grid">
                <div className="col-12">
                  <div className="col-12 d-flex justify-content-end">
                    <div className="col-12 col-md-3 d-flex align-items-center justify-content-between gap-0 gap-lg-3">
                      <div className="d-none d-lg-flex">
                        <span className="fs-7 fw-semibold d-flex align-items-center gap-3">
                          <span>Filtrele</span>{" "}
                          <FaFilter className="filter-icon" />
                        </span>
                      </div>
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        value={sortByDestination}
                        onChange={handleDestinationSortChange}
                      >
                        <option selected>Kriter Seçin !</option>
                        <option value="pricePlus">Fiyata Göre (Artan)</option>
                        <option value="timePlus">
                          Uçuş Süresine Göre (Artan)
                        </option>
                        <option value="departurePlus">
                          Varış Saatine Göre (Artan)
                        </option>
                        <option value="destinationPlus">
                          Kalkış Saatine Göre (Artan)
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="col-12 ">
                    <div class="accordion" id="accordionExample">
                      {getSortedDestinationTickets().map((item, index) => {
                        return (
                          <TicketAccordion key={index} ticketInfo={item} />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Ticket;
