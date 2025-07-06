import React, { useState,useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { getBaseUrl } from "../../../utils/baseURL";
function EditEmployee() {
    
  const { id } = useParams();
  console.log(id)
  const [imagePreview, setImagePreview] = useState("/static/img/default-avatar.png");
  const [formData, setFormData] = useState({
    user: "1",
    title: "Mr",
    firstname: "",
    lastname: "",
    othername: "",
    salary:"",
    sex: "",
    email: "",
    tel: "+8801712345678",
    bio: "",
    birthday: "",
    religion: "",
    nationality: "",
    hometown: "",
    region: "",
    residence: "",
    address: "",
    education: "Senior High",
    lastwork: "",
    position: "",
    nidnumber: "",
    tinnumber: "",
    department: "",
    role: "",
    startdate: "",
    image:null,
    employeetype: "Full-Time",
    employeeid: "",
    dateissued: ""
  });
  useEffect(() => {
    // Fetch employe from the API
    axios.get(`${getBaseUrl()}/api/employeelist/${id}/`) // Example API
        .then(response => {
          setFormData(response.data);
          setImagePreview(response.data.image)
            setLoading(false);
        })
        .catch(error => {
            setError(error.message);
            setLoading(false);
        });
}, [id]);
const handleChange = (e) => {
  const { name, value, files } = e.target;

  if (name === "image" && files && files[0]) {
    // Handle image file input
    const file = files[0];
    setFormData({
      ...formData,
      [name]: file, // Update the image field with the file object
    });

    // Update the image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  } else {
    // Handle regular form fields
    setFormData({
      ...formData,
      [name]: value,
    });
  }
};


 
// Sample data, you can replace with dynamic values later
const [error, setError] = useState(null);
const [loading, setLoading] = useState(false);
const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);
  setLoading(true);

  try {
    // Create a FormData object
    const data = new FormData();

    // Append all form fields to the FormData object
    for (const key in formData) {
      if (formData[key] !== null && formData[key] !== undefined) {
        data.append(key, formData[key]);
      }
    }

    // Send the update request with FormData
    const response = await axios.put(
      `${getBaseUrl()}/api/employeelist/update/${id}/`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure the correct content type
        },
      }
    );

    console.log("Updated Employee successfully:", response.data);
    toast.success("Employee updated successfully!");
  } catch (err) {
    setError("Update failed. Please try again.");
    console.error("Error during update:", err);
  } finally {
    setLoading(false);
  }
};
const [users, setUsers] = useState([]); // Store the list of employees

// Fetch employees from the API
useEffect(() => {
  setLoading(true);
  axios
    .get(`${getBaseUrl()}/api/allusers/`) // Example API
    .then((response) => {
      setUsers(response.data); // Set the list of employees
      setLoading(false);
      console.log(response.data)
    })
    .catch((error) => {
      setError(error.message);
      setLoading(false);
    });
}, []);

  return (
    <section className="flex flex-wrap">
      <section className="w-full lg:w-2/3 md:w-full sm:w-full p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* CSRF Token */}
          <input type="hidden" name="csrfmiddlewaretoken" value="X1lp0nIN5MsOUh5xVcUHz8gsuPVP7dnhJgCmopYjiFdXnSGrUhTwefoenTYIl7AU" />

          {/* User */}
          <div className="form-group">
            <label htmlFor="user" className="block text-sm font-semibold">User <span className="text-red-500">*</span></label>
            <select name="user" value={formData.user} onChange={handleChange} id="user" className="w-full p-2 border border-gray-300 rounded-md">
            {users.map((users) => (
              <option key={users.id} value={users.id}>
                {users.username}
              </option>
            ))}
            </select>
          </div>

          {/* Title */}
          <div className="form-group">
            <label htmlFor="title" className="block text-sm font-semibold">Title <span className="text-red-500">*</span></label>
            <select name="title" value={formData.title} onChange={handleChange} id="title" className="w-full p-2 border border-gray-300 rounded-md">
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
              <option value="Mss">Mss</option>
              <option value="Dr">Dr</option>
              <option value="Sir">Sir</option>
              <option value="Madam">Madam</option>
            </select>
          </div>

          {/* Firstname */}
          <div className="form-group">
            <label htmlFor="firstname" className="block text-sm font-semibold">Firstname <span className="text-red-500">*</span></label>
            <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} id="firstname" className="w-full p-2 border border-gray-300 rounded-md" required />
          </div>

          {/* Lastname */}
          <div className="form-group">
            <label htmlFor="lastname" className="block text-sm font-semibold">Lastname <span className="text-red-500">*</span></label>
            <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} id="lastname" className="w-full p-2 border border-gray-300 rounded-md" required />
          </div>

          {/* Othername */}
          <div className="form-group">
            <label htmlFor="othername" className="block text-sm font-semibold">Othername (optional)</label>
            <input type="text" name="othername" value={formData.othername} onChange={handleChange} id="othername" className="w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div className="form-group">
            <label htmlFor="salary" className="block text-sm font-semibold">Salary</label>
            <input type="text" name="salary" value={formData.salary} onChange={handleChange} id="salary" className="w-full p-2 border border-gray-300 rounded-md" />
          </div>

          {/* Sex */}
          <div className="form-group">
            <label htmlFor="sex" className="block text-sm font-semibold">Sex <span className="text-red-500">*</span></label>
            <select name="sex" value={formData.sex} onChange={handleChange} id="sex" className="w-full p-2 border border-gray-300 rounded-md" required>
              <option value="">---------</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="Not Known">Not Known</option>
            </select>
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email" className="block text-sm font-semibold">Email (optional)</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} id="email" className="w-full p-2 border border-gray-300 rounded-md" />
          </div>

          {/* Phone Number */}
          <div className="form-group">
            <label htmlFor="tel" className="block text-sm font-semibold">Phone Number <span className="text-red-500">*</span></label>
            <input type="tel" name="tel" value={formData.tel} onChange={handleChange} id="tel" className="w-full p-2 border border-gray-300 rounded-md" required />
            <small className="text-xs text-gray-500">Enter number with Country Code Eg. +8801712345678</small>
          </div>

          {/* Bio */}
          <div className="form-group">
            <label htmlFor="bio" className="block text-sm font-semibold">Bio</label>
            <textarea name="bio" value={formData.bio} onChange={handleChange} id="bio" className="w-full p-2 border border-gray-300 rounded-md" rows="4"></textarea>
            <small className="text-xs text-gray-500">Tell me something about yourself.</small>
          </div>

          {/* Birthday */}
          <div className="form-group">
            <label htmlFor="birthday" className="block text-sm font-semibold">Birthday <span className="text-red-500">*</span></label>
            <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} id="birthday" className="w-full p-2 border border-gray-300 rounded-md" required />
          </div>
{/* Sex */}
<div className="form-group">
            <label htmlFor="Religion" className="block text-sm font-semibold">Religion <span className="text-red-500">*</span></label>
            <select name="religion" value={formData.religion} onChange={handleChange} id="Religion" className="w-full p-2 border border-gray-300 rounded-md" required>
              <option value="">---------</option>
              <option value="1">Islam</option>
             
            </select>
            <label htmlFor="Nationality" className="block text-sm font-semibold">Nationality <span className="text-red-500">*</span></label>
            <select name="nationality" value={formData.nationality} onChange={handleChange} id="Nationality" className="w-full p-2 border border-gray-300 rounded-md" required>
              <option value="">---------</option>
              <option value="1">Indian</option>
             
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="Hometown" className="block text-sm font-semibold">Hometown </label>
            <input type="text" name="hometown" value={formData.hometown} onChange={handleChange} id="Hometown" className="w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div className="form-group">
          <label htmlFor="id_region" className="requiredField">
            Region<span className="asteriskField">*</span>
          </label>
          <select
            name="region"
            id="id_region"
            className="select form-control"
            value={formData.region}
            onChange={handleChange}
            required
          >
            <option value="">---------</option>
            <option value="East">East</option>
            <option value="West">West</option>
            <option value="North">North</option>
            <option value="South">South</option>
          </select>
          <small id="hint_id_region" className="form-text text-muted">
            What region of the country are you from?
          </small>
        </div>
        <div className="form-group">
            <label htmlFor="Current Residence" className="block text-sm font-semibold">Current Residence </label>
            <input type="text" name="residence" value={formData.residence} onChange={handleChange} id="Current Residence" className="w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div className="form-group">
            <label htmlFor="Address" className="block text-sm font-semibold">Address </label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} id="Address" className="w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div className="form-group">
          <label htmlFor="id_education" className="requiredField">
            Education<span className="asteriskField">*</span>
          </label>
          <select
            name="education"
            id="id_education"
            className="select form-control"
            value={formData.education}
            onChange={handleChange}
            required
          >
            <option value="Senior High">Senior High School</option>
            <option value="Junior High">Junior High School</option>
            <option value="Primary Level">Primary School</option>
            <option value="Bachelors">Bachelors/University/Polytechnic</option>
            <option value="O-LEVEL">OLevel</option>
            <option value="Other">Other</option>
          </select>
          <small id="hint_id_education" className="form-text text-muted">
            Highest educational standard ie. your last level of schooling
          </small>
        </div>
        <div className="form-group">
            <label htmlFor="Last place of work" className="block text-sm font-semibold">Last place of work </label>
            <input type="text" name="lastwork" value={formData.lastwork} onChange={handleChange} id="Last place of work" className="w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div className="form-group">
            <label htmlFor="Position Held" className="block text-sm font-semibold">Position Held </label>
            <input type="text" name="position" value={formData.position} onChange={handleChange} id="Position Held" className="w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div className="form-group">
            <label htmlFor="National ID Number" className="block text-sm font-semibold">National ID Number </label>
            <input type="text" name="nidnumber" value={formData.nidnumber} onChange={handleChange} id="National ID Number" className="w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div className="form-group">
            <label htmlFor="TIN" className="block text-sm font-semibold">TIN </label>
            <input type="text" name="nidnumber" value={formData.tinnumber} onChange={handleChange} id="TIN" className="w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div className="form-group">
          <label htmlFor="id_department" className="requiredField">
            Department<span className="asteriskField">*</span>
          </label>
          <select
            name="department"
            id="id_department"
            className="select form-control"
            value={formData.department}
            onChange={handleChange}
            required
          >
            <option value="">---------</option>
            <option value="1">CS</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="id_role" className="requiredField">
            Role<span className="asteriskField">*</span>
          </label>
          <select
            name="role"
            id="id_role"
            className="select form-control"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">---------</option>
            <option value="1">Manager</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="id_startdate" className="requiredField">
            Employment Date<span className="asteriskField">*</span>
          </label>
          <input
            type="date"
            name="startdate"
            id="id_startdate"
            className="dateinput form-control"
            value={formData.startdate}
            onChange={handleChange}
            required
          />
          <small id="hint_id_startdate" className="form-text text-muted">
            Date of employment
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="id_employeetype" className="requiredField">
            Employee Type<span className="asteriskField">*</span>
          </label>
          <select
            name="employeetype"
            id="id_employeetype"
            className="select form-control"
            value={formData.employeetype}
            onChange={handleChange}
            required
          >
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Contract">Contract</option>
            <option value="Intern">Intern</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="id_employeeid" className="requiredField">
            Employee ID<span className="asteriskField">*</span>
          </label>
          <input
            type="text"
            name="employeeid"
            id="id_employeeid"
            className="textinput form-control"
            value={formData.employeeid}
            onChange={handleChange}
            placeholder="Please enter 5 characters without BDE or slashes eg. A0025"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="id_dateissued" className="requiredField">
            Date Issued<span className="asteriskField">*</span>
          </label>
          <input
            type="date"
            name="dateissued"
            id="id_dateissued"
            className="dateinput form-control"
            value={formData.dateissued}
            onChange={handleChange}
            required
          />
          <small id="hint_id_dateissued" className="form-text text-muted">
            Date staff ID was issued
          </small>
        </div>
          {/* Submit */}
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">    {loading ? 'loading...' : 'Submit'}</button>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        </form>

      </section>

      {/* Image Preview Section */}
      <section className="w-full lg:w-1/3 md:w-full sm:w-full text-center p-4">
        <div className="prev-holder">
          <img src={imagePreview} alt="Preview" id="temp-preview-image" className="w-32 h-32 rounded-full mx-auto" />
        </div>
        <input type="file" name="image" onChange={handleChange} accept="image/*" className="mt-4 p-2 border border-gray-300 rounded-md" />
      </section>
    </section>
  );
}

export default EditEmployee;
