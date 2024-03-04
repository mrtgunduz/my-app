import React, { useState, useEffect } from 'react';

function Pagination({ data, itemsPerPage, currentPage, setCurrentPage }) {
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className={currentPage === 1 ? "page-item disabled" : "page-item"}>
          <button className="page-link" onClick={() => handleClick(currentPage - 1)}>&laquo;</button>
        </li>
        {Array.from({ length: totalPages }, (_, index) => (
          <li key={index} className={currentPage === index + 1 ? "page-item active" : "page-item"}>
            <button className="page-link" onClick={() => handleClick(index + 1)}>{index + 1}</button>
          </li>
        ))}
        <li className={currentPage === totalPages ? "page-item disabled" : "page-item"}>
          <button className="page-link" onClick={() => handleClick(currentPage + 1)}>&raquo;</button>
        </li>
      </ul>
    </nav>
  );
}

function Main({ onSort }) {
  debugger
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/turkeys.json'); 
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const itemsPerPage = 15;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);


  const handleSort = (isAscending) => {
    let sortedData;
    if (isAscending) {
      // A-Z sıralama
      sortedData = [...data].sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // Z-A sıralama
      sortedData = [...data].sort((a, b) => b.name.localeCompare(a.name));
    }
    setData(sortedData);
  };

  return (
    
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Şehir İsmi</th>
                <th scope="col">Bulunduğu Bölge</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((city, index) => (
                <tr key={index}>
                  <td>{city.name}</td>
                  <td>{city.region}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            data={data}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default Main;
