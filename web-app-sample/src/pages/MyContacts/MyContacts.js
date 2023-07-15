import React, { useEffect, useState } from "react";
import { Title } from "../../components";
import "./MyContacts.css";
const MyContacts = (props) => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [genderFilter, setGenderFilter] = useState("all");
  const [nationalityFilter, setNationalityFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage] = useState(9);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch("https://randomuser.me/api/?results=100");
      const data = await response.json();
      setContacts(data.results);
    } catch (error) {
      console.log("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    filterContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contacts, genderFilter, nationalityFilter]);

  const filterContacts = () => {
    let filtered = contacts;

    if (genderFilter !== "all") {
      filtered = filtered.filter((contact) => contact.gender === genderFilter);
    }

    if (nationalityFilter !== "all") {
      filtered = filtered.filter(
        (contact) => contact.nat === nationalityFilter
      );
    }

    setFilteredContacts(filtered);
  };

  const handleGenderFilterChange = (event) => {
    setGenderFilter(event.target.value);
  };

  const handleNationalityFilterChange = (event) => {
    setNationalityFilter(event.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = filteredContacts.slice(
    indexOfFirstContact,
    indexOfLastContact
  );

  const renderContacts = () => {
    if (currentContacts.length === 0) {
      return <p>No contacts found.</p>;
    }

    return currentContacts.map((contact, index) => (
      <div key={index} className="contact-card">
        <div className="contact-card-image">
          <img src={contact.picture.large} alt="Profile" />
        </div>
        <div className="contact-card-content">
          <p
            style={{ fontWeight: "600" }}
          >{`${contact.name.first} ${contact.name.last}`}</p>
          <p>Email: {contact.email}</p>
          <p>Mobile: {contact.cell}</p>
          <p>
            Address:{" "}
            {`${contact.location.street.number} ${contact.location.street.name}`}
          </p>
        </div>
      </div>
    ));
  };

  const renderPagination = () => {
    const pageNumbers = Math.ceil(filteredContacts.length / contactsPerPage);

    if (pageNumbers <= 1) {
      return null;
    }

    const handlePrevPage = () => {
      setCurrentPage((prevPage) => prevPage - 1);
    };

    const handleNextPage = () => {
      setCurrentPage((prevPage) => prevPage + 1);
    };

    return (
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          &lt;
        </button>
        {Array.from({ length: pageNumbers }, (_, i) => i + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={currentPage === pageNumber ? "active" : ""}
            >
              {pageNumber}
            </button>
          )
        )}
        <button onClick={handleNextPage} disabled={currentPage === pageNumbers}>
          &gt;
        </button>
      </div>
    );
  };
  return (
    <div className="myContact-main">
      <Title titleSubOne="My" titleSubTwo="Contacts" innerTitle />
      <div>
        <div className="filters">
          <div className="filter-container">
            <select
              className="filter-select"
              value={genderFilter}
              onChange={handleGenderFilterChange}
            >
              <option value="all">All</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <div className="filter-arrow"></div>
          </div>
          <div className="filter-container">
            <select
              className="filter-select"
              value={nationalityFilter}
              onChange={handleNationalityFilterChange}
            >
              <option value="all">All</option>
              <option value="AU">AU</option>
              <option value="BR">BR</option>
              {/* Rest of the nationality options */}
            </select>
            <div className="filter-arrow"></div>
          </div>
        </div>
        <div className="contact-list">{renderContacts()}</div>
        {renderPagination()}
      </div>
    </div>
  );
};
export default MyContacts;
