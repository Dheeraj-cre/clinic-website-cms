import { useForm } from "react-hook-form";
import API from "../services/api";
import "./BookAppointment.css";

const BookAppointment = ({ onBooked }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  // Today's date (to disable past dates)
  const today = new Date().toISOString().split("T")[0];

  const submit = async (data) => {
    const payload = {
      ...data,
      date: new Date(data.date) // calendar compatible
    };

    try {
      await API.post("/appointments", payload);
      alert("Appointment booked successfully");

      if (onBooked) onBooked(); // calendar refresh
      reset(); // form reset
    } catch (error) {
      console.error(error);
      alert("Failed to book appointment");
    }
  };

  return (
    <div className="appointment-wrapper">
      <h2 className="appointment-title">Book Appointment</h2>

      <form onSubmit={handleSubmit(submit)} className="appointment-table">
        
        {/* Patient Name */}
        <div className="row">
          <label>Patient Name</label>
          <input
            type="text"
            placeholder="Enter patient name"
            {...register("patientName", { 
              required: "Patient name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters"
              }
            })}
          />
        </div>
        {errors.patientName && (
          <div className="row">
            <small>{errors.patientName.message}</small>
          </div>
        )}

        {/* Doctor Name */}
        <div className="row">
          <label>Doctor Name</label>
          <input
            type="text"
            placeholder="Enter doctor name"
            {...register("doctorName", { 
              required: "Doctor name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters"
              }
            })}
          />
        </div>
        {errors.doctorName && (
          <div className="row">
            <small>{errors.doctorName.message}</small>
          </div>
        )}

        {/* Phone Number (10 digits only) */}
        <div className="row">
          <label>Phone</label>
          <input
            type="tel"
            placeholder="Enter 10-digit mobile number"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Phone number must be exactly 10 digits"
              }
            })}
          />
        </div>
        {errors.phone && (
          <div className="row">
            <small>{errors.phone.message}</small>
          </div>
        )}

        {/* Email */}
        <div className="row">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email address (optional)"
            {...register("email", {
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
          />
        </div>
        {errors.email && (
          <div className="row">
            <small>{errors.email.message}</small>
          </div>
        )}

        {/* Problem */}
        <div className="row">
          <label>Problem</label>
          <input
            type="text"
            placeholder="Describe your medical concern (optional)"
            {...register("problem")}
          />
        </div>

        {/* Date (past disabled) */}
        <div className="row">
          <label>Date</label>
          <input
            type="date"
            min={today}  
            {...register("date", { required: "Date is required" })}
          />
        </div>
        {errors.date && (
          <div className="row">
            <small>{errors.date.message}</small>
          </div>
        )}

        {/* Address */}
        <div className="row">
          <label>Address</label>
          <textarea
            rows={3}
            placeholder="Enter your full address"
            {...register("address", {
              required: "Address is required",
              minLength: {
                value: 10,
                message: "Address must be at least 10 characters"
              }
            })}
          />
        </div>
        {errors.address && (
          <div className="row">
            <small>{errors.address.message}</small>
          </div>
        )}

        {/* Submit Button */}
        <div className="row submit-row">
          <button type="submit">Book Appointment</button>
        </div>
      </form>
    </div>
  );
};

export default BookAppointment;