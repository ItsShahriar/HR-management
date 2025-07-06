import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getBaseUrl } from '../utils/baseURL';
const Family = () => {
  const [formData, setFormData] = useState({
    employee: '',
    status: '',
    spouse: '',
    occupation: '',
    tel: '',
    children: 0,
    nextofkin: '',
    contact: '',
    relationship: '',
    father: '',
    foccupation: '',
    mother: '',
    moccupation: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [employee, setEmployeeId] = useState();
  const [employees, setemploye] = useState([]);
  useEffect(() => {
    // Fetch employe from the API
    axios.get(`${getBaseUrl()}/api/employeelist/`) // Example API
        .then(response => {
          setEmployeeId(response.data.id);
          setemploye(response.data);
            setLoading(false);
        })
        .catch(error => {
            setError(error.message);
            setLoading(false);
        });
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Family submitted:', formData);
    // You can perform further actions like sending data to an API here

    setError(null);
    // Show loading indicator
    setLoading(true);
    try {
      const response = await axios.post(`${getBaseUrl()}/api/FamilyCreate/create`, formData);
      console.log('family added successful:', response.data);
      toast("family added!");
      // Handle success (redirect, show success message, etc.)
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error('Error during registration:', err);
    } finally {
      setLoading(false);
    }

  };

  return (
    <section className="row">
      <section className="col-lg-12 col-md-12 col-sm-12">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* CSRF Token */}
          <input
            type="hidden"
            name="csrfmiddlewaretoken"
            value="9ke3Sq55VFaKFZzrnLMKB3hY6qGGmMZqVzv0gslB8yVT8AalmQLzgapKZuJzAGc3"
          />

          {/* Employee Select */}
          <div className="form-group">
            <label htmlFor="employee" className="block text-sm font-semibold">
              Employee
            </label>
          
            <select
            className="w-full p-2 border rounded"
            value={formData.employee}
              name="employee"
              id="employee"
            onChange={handleChange}
            required
          >
            <option value="">Select Employee</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.firstname} {employee.lastname} 
              </option>
            ))  }
          </select>
          </div>

          {/* Marital Status Select */}
          <div className="form-group">
            <label htmlFor="status" className="block text-sm font-semibold">
              Marital Status<span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              id="status"
              className="form-control mt-1 p-2 rounded-lg w-full border"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="Married">Married</option>
              <option value="Single">Single</option>
              <option value="Divorced">Divorced</option>
              <option value="Widow">Widow</option>
              <option value="Widower">Widower</option>
            </select>
          </div>

          {/* Spouse Input */}
          <div className="form-group">
            <label htmlFor="spouse" className="block text-sm font-semibold">
              Spouse (Fullname)
            </label>
            <input
              type="text"
              name="spouse"
              id="spouse"
              value={formData.spouse}
              onChange={handleChange}
              className="form-control mt-1 p-2 rounded-lg w-full border"
            />
          </div>

          {/* Occupation Input */}
          <div className="form-group">
            <label htmlFor="occupation" className="block text-sm font-semibold">
              Occupation
            </label>
            <input
              type="text"
              name="occupation"
              id="occupation"
              value={formData.occupation}
              onChange={handleChange}
              className="form-control mt-1 p-2 rounded-lg w-full border"
            />
            <small className="text-gray-500 mt-1 block">Spouse occupation</small>
          </div>

          {/* Spouse Phone Number Input */}
          <div className="form-group">
            <label htmlFor="tel" className="block text-sm font-semibold">
              Spouse Phone Number (Example +8801712345678)
            </label>
            <input
              type="tel"
              name="tel"
              id="tel"
              value={formData.tel}
              onChange={handleChange}
              className="form-control mt-1 p-2 rounded-lg w-full border"
            />
            <small className="text-gray-500 mt-1 block">Enter number with Country Code Eg. +8801712345678</small>
          </div>

          {/* Number of Children Input */}
          <div className="form-group">
            <label htmlFor="children" className="block text-sm font-semibold">
              Number of Children
            </label>
            <input
              type="number"
              name="children"
              id="children"
              value={formData.children}
              onChange={handleChange}
              min="0"
              className="form-control mt-1 p-2 rounded-lg w-full border"
            />
          </div>

          {/* Next of Kin Input */}
          <div className="form-group">
            <label htmlFor="nextofkin" className="block text-sm font-semibold">
              Next of Kin<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="nextofkin"
              id="nextofkin"
              value={formData.nextofkin}
              onChange={handleChange}
              required
              className="form-control mt-1 p-2 rounded-lg w-full border"
            />
            <small className="text-gray-500 mt-1 block">Full name of next of kin</small>
          </div>

          {/* Next of Kin Phone Number Input */}
          <div className="form-group">
            <label htmlFor="contact" className="block text-sm font-semibold">
              Next of Kin Phone Number (Example +8801712345678)
            </label>
            <input
              type="tel"
              name="contact"
              id="contact"
              value={formData.contact}
              onChange={handleChange}
              className="form-control mt-1 p-2 rounded-lg w-full border"
            />
            <small className="text-gray-500 mt-1 block">Phone Number of Next of Kin</small>
          </div>

          {/* Relationship with Next of Kin Select */}
          <div className="form-group">
            <label htmlFor="relationship" className="block text-sm font-semibold">
              Relationship with Next of Kin<span className="text-red-500">*</span>
            </label>
            <select
              name="relationship"
              id="relationship"
              className="form-control mt-1 p-2 rounded-lg w-full border"
              value={formData.relationship}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                ---------
              </option>
              <option value="Father">Father</option>
              <option value="Mother">Mother</option>
              <option value="Sister">Sister</option>
              <option value="Brother">Brother</option>
              <option value="Uncle">Uncle</option>
              <option value="Aunty">Aunty</option>
              <option value="Husband">Husband</option>
              <option value="Wife">Wife</option>
              <option value="Fiance">Fiance</option>
              <option value="Cousin">Cousin</option>
              <option value="Fiancee">Fiancee</option>
              <option value="Niece">Niece</option>
              <option value="Nephew">Nephew</option>
              <option value="Son">Son</option>
              <option value="Daughter">Daughter</option>
            </select>
            <small className="text-gray-500 mt-1 block">Who is this person to you?</small>
          </div>

          {/* Father's Name Input */}
          <div className="form-group">
            <label htmlFor="father" className="block text-sm font-semibold">
              Father's Name
            </label>
            <input
              type="text"
              name="father"
              id="father"
              value={formData.father}
              onChange={handleChange}
              className="form-control mt-1 p-2 rounded-lg w-full border"
            />
          </div>

          {/* Father's Occupation Input */}
          <div className="form-group">
            <label htmlFor="foccupation" className="block text-sm font-semibold">
              Father's Occupation
            </label>
            <input
              type="text"
              name="foccupation"
              id="foccupation"
              value={formData.foccupation}
              onChange={handleChange}
              className="form-control mt-1 p-2 rounded-lg w-full border"
            />
          </div>

          {/* Mother's Name Input */}
          <div className="form-group">
            <label htmlFor="mother" className="block text-sm font-semibold">
              Mother's Name
            </label>
            <input
              type="text"
              name="mother"
              id="mother"
              value={formData.mother}
              onChange={handleChange}
              className="form-control mt-1 p-2 rounded-lg w-full border"
            />
          </div>

          {/* Mother's Occupation Input */}
          <div className="form-group">
            <label htmlFor="moccupation" className="block text-sm font-semibold">
              Mother's Occupation
            </label>
            <input
              type="text"
              name="moccupation"
              id="moccupation"
              value={formData.moccupation}
              onChange={handleChange}
              className="form-control mt-1 p-2 rounded-lg w-full border"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary btn-lg btn-block mt-4 p-3 bg-blue-500 text-white rounded-lg w-full hover:bg-blue-600"
          >
              {loading ? 'loading...' : 'Submit'}
          </button>
        </form>
      </section>
    </section>
  );
};

export default Family;
