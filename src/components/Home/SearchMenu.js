import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowRightArrowLeft,
  FaCalendarDays,
  FaArrowRight,
} from "react-icons/fa6";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux/es/hooks/useSelector";
import "react-datepicker/dist/react-datepicker.css";
import "../../style/bootstrap-override.scss";

function SearchMenu() {
  const data = useSelector((state) => state.tickets.departureInfo);
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedWay, setSelectedWay] = useState("roundTrip");
  const [departureSearch, setDepartureSearch] = useState("");
  const [destinationSearch, setDestinationSearch] = useState("");
  const [filteredDepartureWords, setFilteredDepartureWords] = useState([]);
  const [filteredDestinationWords, setFilteredDestinationWords] = useState([]);
  const [showDepartureList, setDepartureShowList] = useState(false);
  const [showDestinationList, setDestinationShowList] = useState(false);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (autocompleteRef.current) {
        setDepartureShowList(false);
        setDestinationShowList(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  const handleOptionChange = (event) => {
    setSelectedWay(event.target.id);
  };
  const uniqueDataArray = data.reduce((accumulator, currentValue) => {
    const foundItem = accumulator.find(
      (item) =>
        item.departureCity === currentValue.departureCity &&
        item.departureAirport === currentValue.departureAirport
    );

    if (!foundItem) {
      accumulator.push(currentValue);
    }

    return accumulator;
  }, []);
  console.log(data);

  const handleInputChange = (event, whichInput) => {
    if (whichInput === "departure") {
      const search = event.target.value;
      setDepartureSearch(search);

      const filteredDepartureWords = uniqueDataArray.filter(
        (item) =>
          item.departureCity
            .toLowerCase()
            .includes(departureSearch.toLowerCase()) ||
          item.departureAirport
            .toLowerCase()
            .includes(departureSearch.toLowerCase())
      );

      setFilteredDepartureWords(filteredDepartureWords);
      setDepartureShowList(true);
    } else {
      const search = event.target.value;
      setDestinationSearch(search);

      const filteredDestinationWords = uniqueDataArray.filter(
        (item) =>
          item.departureCity
            .toLowerCase()
            .includes(destinationSearch.toLowerCase()) ||
          item.departureAirport
            .toLowerCase()
            .includes(destinationSearch.toLowerCase())
      );

      setFilteredDestinationWords(filteredDestinationWords);
      setDestinationShowList(true);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedWay === "roundTrip") {
      if (
        startDate !== "" &&
        endDate !== "" &&
        departureSearch !== "" &&
        destinationSearch !== ""
      ) {
        navigate(
          `/${departureSearch}|${destinationSearch}|${startDate.getDate()}-${
            startDate.getMonth() + 1
          }-${startDate.getFullYear()}|${endDate.getDate()}-${
            endDate.getMonth() + 1
          }-${endDate.getFullYear()}`
        );
      } else {
        window.alert("Girdiğiniz Bilgiler Eksik veya Hatalı !");
      }
    } else {
      if (
        startDate !== "" &&
        departureSearch !== "" &&
        destinationSearch !== ""
      ) {
        navigate(
          `/${departureSearch}|${destinationSearch}|${startDate.getDate()}-${
            startDate.getMonth() + 1
          }-${startDate.getFullYear()}`
        );
      } else {
        window.alert("Girdiğiniz Bilgiler Eksik veya Hatalı !");
      }
    }
  };
  return (
    <section className="searchMenu mt-5">
      <div className="container h-100 w-100">
        <div className="row h-100 w-100">
          <div className="col-12 d-flex justify-content-center justify-content-lg-start align-items-center">
            <form
              className="col-12 col-md-6 border rounded-3 py-4 px-4 bg-white d-grid"
              onSubmit={handleSubmit}
            >
              <div className="col-12 d-flex justify-content-between">
                <div className="col-5 d-grid gap-1 autocomplete-container">
                  <span>Nereden</span>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Şehir veya Havalimanı Adı Girin"
                    value={departureSearch}
                    onChange={(event) => handleInputChange(event, "departure")}
                  />
                  {showDepartureList && (
                    <ul
                      ref={autocompleteRef}
                      className="autocomplete-list w-100"
                    >
                      {filteredDepartureWords.map((word, index) => (
                        <li
                          key={index}
                          className="d-grid border-bottom w-100 li-filter"
                          onClick={() => setDepartureSearch(word.departureCity)}
                        >
                          <div>
                            <span className="fw-semibold">
                              {word.departureCity}
                            </span>
                          </div>
                          <div className="d-flex justify-content-between">
                            <span>{word.departureAirport.split("-")[0]}</span>
                            <span>{word.departureAirport.split("-")[1]}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="col-2 d-flex justify-content-center align-items-end">
                  <div
                    className="border border-2 border-fourth rounded-circle p-2 d-flex align-items-center cursor switch-animation"
                    onClick={() => {
                      setDepartureSearch(destinationSearch);
                      setDestinationSearch(departureSearch);
                    }}
                  >
                    <FaArrowRightArrowLeft className="switchIcon" />
                  </div>
                </div>
                <div className="col-5 d-grid gap-1 autocomplete-container">
                  <span>Nereye</span>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Şehir veya Havalimanı Adı Girin"
                    value={destinationSearch}
                    onChange={(event) =>
                      handleInputChange(event, "destination")
                    }
                  />
                  {showDestinationList && (
                    <ul ref={autocompleteRef} className="autocomplete-list">
                      {filteredDestinationWords.map((word, index) => (
                        <li
                          key={index}
                          className="d-grid border-bottom w-100 li-filter"
                          onClick={() =>
                            setDestinationSearch(word.departureCity)
                          }
                        >
                          <div>
                            <span className="fw-semibold">
                              {word.departureCity}
                            </span>
                          </div>
                          <div className="d-flex justify-content-between">
                            <span>{word.departureAirport.split("-")[0]}</span>
                            <span>{word.departureAirport.split("-")[1]}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="col-12 d-flex  gap-5 mt-5">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    name="tripType"
                    type="radio"
                    id="oneWay"
                    checked={selectedWay === "oneWay"}
                    onChange={handleOptionChange}
                  />
                  <label class="form-check-label" for="oneWay">
                    Tek Yön
                  </label>
                </div>

                <div class="form-check">
                  <input
                    class="form-check-input"
                    name="tripType"
                    type="radio"
                    id="roundTrip"
                    checked={selectedWay === "roundTrip"}
                    onChange={handleOptionChange}
                  />
                  <label class="form-check-label" for="roundTrip">
                    Gidiş Dönüş
                  </label>
                </div>
              </div>
              <div className="mt-4 col-12 d-flex justify-content-between">
                <div className="col-5 d-grid gap-1">
                  <div>
                    <span>Gidiş Tarihi</span>
                  </div>
                  <div className=" d-flex align-items-center gap-3">
                    <FaCalendarDays />
                    <DatePicker
                      className="form-control"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      minDate={new Date()}
                      dateFormat="dd/MM/yyyy"
                    />
                  </div>
                </div>
                <div className="col-5 d-grid gap-1">
                  <div>
                    <span
                      className={`${
                        selectedWay === "oneWay" ? "text-ninth" : ""
                      }`}
                    >
                      Dönüş Tarihi
                    </span>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <FaCalendarDays
                      className={`${
                        selectedWay === "oneWay" ? "text-ninth" : ""
                      }`}
                    />
                    <DatePicker
                      className={`form-control ${
                        selectedWay === "oneWay" ? "text-ninth" : ""
                      }`}
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      minDate={startDate}
                      dateFormat="dd/MM/yyyy"
                      disabled={selectedWay === "oneWay" ? true : false}
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 d-flex justify-content-center mt-5">
                <div className="col-6">
                  <button
                    className="btn btn-third text-secondary fw-semibold d-flex justify-content-center gap-3 align-items-center w-100"
                    type="submit"
                  >
                    <span>Uçak Bileti Bul</span> <FaArrowRight />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SearchMenu;
