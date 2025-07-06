import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { getBaseUrl } from '../utils/baseURL';
import { Link, useNavigate, useParams } from "react-router-dom";
const EmployeProfile = () => {
    const { id } = useParams();
    console.log(id)
  // Sample data, you can replace with dynamic values later
  const [employees, setemploye] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
      // Fetch employe from the API
      const fetchProduct = async () => {
        try {
            const response = await axios.get(`${getBaseUrl()}/api/employeelist/${id}`);
            setemploye(response.data);
            console.log(response.data)
            setLoading(false);
          } catch (err) {
            setError("Error fetching the product.");
            setLoading(false);
          }
        };
      
        fetchProduct();
          
  }, [id]);

  if (loading) {
      return <div>Loading...</div>;
  }

  if (error) {
      return <div>Error: {error}</div>;
  }
  return (
    <section className="content py-6">



    <section className="container mx-auto">
      {/* Back Link */}
      <section className="row">
        <section className="col col-lg-12">
          <span>
            <Link
              to="/dashboard/"
              className="text-gray-600 hover:text-gray-800"
            >
              Back
            </Link>
          </span>
        </section>
      </section>

      {/* Profile Section */}
      <section className="row mt-6">
        <section className="col col-lg-12 text-center">
          <h3>
            <span className="employee-name-title">Employee Name : {employees.firstname}</span>
          </h3>
        </section>
      </section>

      {/* Profile Details */}
      <section className="row mt-4">
        <section className="col col-lg-4 col-md-4 col-sm-12 profile-wrapper">
          {/* Profile Image */}
          <img
            src={employees.image}
            className=" rounded-full mx-auto  md:w-32 lg:w-32 h-32 md:h-32 lg:h-32 mb-4"
            alt="Profile"
          />

          <section className="text-center mt-3">
            <ul className="list-group">
              <li className="list-group-item flex justify-between py-2">
                <span>Fullname</span>
                <div>{employees.firstname}</div>
              </li>
              <li className="list-group-item flex justify-between py-2">
                <span>Nationality</span>
                <div className='text-black'>{employees.nationality}</div>
              </li>
              <li className="list-group-item flex justify-between py-2">
                <span>Department</span>
                <div>{employees.department?.name}</div>
              </li>
              <li className="list-group-item flex justify-between py-2">
                <span>Employee Type</span>
                <div>{employees.employeetype}</div>
              </li>
              <li className="list-group-item flex justify-between py-2">
                <span>Role</span>
                <div>{employees.role?.name}</div>
              </li>
              <li className="list-group-item flex justify-between py-2">
                <span>Date of Birth</span>
                <div>{employees.birthday}</div>
              </li>
              <li className="list-group-item flex justify-between py-2">
                <span>Age</span>
                <div>31</div>
              </li>
              <li className="list-group-item flex justify-between py-2">
                <span>Status</span>
                <div>Active</div>
              </li>
            </ul>

            <div className="mt-4 italic text-gray-500">
              <span>Updated - {employees.dateissued}</span>
            </div>
          </section>
        </section>

        {/* Accordion Sections */}
        <section className="col col-lg-8">
          <div className="accordion" id="accordionExample">
            {/* Personal Information */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Personal Information
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-lg-6">
                        <h4 className='text-white'>
                          No Information found, to add click{" "}
                          <a href="/dashboard/family/create/" className="text-blue-600 hover:text-blue-800">
                            here
                          </a>
                        </h4>
                      </div>
                      <div className="col-lg-6">
                        <div>
                          <span>Last update - </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Family Information */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Family Information
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <section className="container-fluid">
                    <div className="row">
                      <h4>
                        No Information found, to add click{" "}
                        <a href="/dashboard/family/create/" className="text-blue-600 hover:text-blue-800">
                          here
                        </a>
                      </h4>
                    </div>
                  </section>
                </div>
              </div>
            </div>

            {/* Emergency Information */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  Emergency Information
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <section className="container-fluid">
                    <div className="row">
                      <div className="list-group">
                        <a
                          className="list-group-item list-group-item-action"
                          href="#"
                        >
                          <span>Fullname</span> <div>None</div>
                        </a>
                        <a
                          className="list-group-item list-group-item-action"
                          href="#"
                        >
                          <span>Telephone</span> <div>+8801712345678</div>
                        </a>
                        <a
                          className="list-group-item list-group-item-action"
                          href="#"
                        >
                          <span>Residence</span> <div>None</div>
                        </a>
                        <a
                          className="list-group-item list-group-item-action"
                          href="#"
                        >
                          <span>Relationship</span> <div>Father</div>
                        </a>
                        <span>
                          <a href="/dashboard/emergency/update/2" className="text-blue-600 hover:text-blue-800">
                            Edit
                          </a>
                        </span>
                      </div>
                      <div>
                        <span>Last update - 3 days, 4 hours ago</span>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>

            {/* Bank Account Information */}
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingFour">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                  aria-expanded="false"
                  aria-controls="collapseFour"
                >
                  Bank Account Information
                </button>
              </h2>
              <div
                id="collapseFour"
                className="accordion-collapse collapse"
                aria-labelledby="headingFour"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <section className="container-fluid">
                    <div className="row">
                      <h4>
                        No Information found, to add click{" "}
                        <a href="/dashboard/bank/create/" className="text-blue-600 hover:text-blue-800">
                          here
                        </a>
                      </h4>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </section>
  </section>
  );
};

export default EmployeProfile;
