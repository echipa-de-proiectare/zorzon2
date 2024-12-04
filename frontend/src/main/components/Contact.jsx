import { useState } from "react";
import * as yup from "yup";
const API_URL = import.meta.env.VITE_API_URL; // Access the environment variable

// Define the validation schema
const validationSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("Numele este obligatoriu")
    .min(2, "Numele trebuie sa aiba minim 2 caractere"),
  city: yup.string().trim().required("Orasul este obligatoriu"),
  phone: yup
    .string()
    .nullable()
    .matches(/^[0-9]+$/, "Numarul de telefon trebuie sa contina doar cifre"),
  message: yup.string().trim().required("Mesajul este obligatoriu"),
});

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    phone: "",
    message: "",
  });

  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Validate the field using Yup
    validationSchema
      .validateAt(name, { [name]: value })
      .then(() => {
        // If validation is successful, clear errors for that field
        setErrors((previousErrors) => ({ ...previousErrors, [name]: "" }));
      })
      .catch((error) => {
        // If validation fails, set the error message for that field
        setErrors((previousErrors) => ({
          ...previousErrors,
          [name]: error.message,
        }));
      });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    validationSchema
      .validate(formData, { abortEarly: false })
      .then(() => {
        submitFormData(); // Call a function to handle data submission
      })
      .catch((err) => {
        // Ensure err.inner exists and is an array before attempting to use 'reduce'
        if (err.inner && Array.isArray(err.inner)) {
          const formattedErrors = err.inner.reduce((acc, current) => {
            acc[current.path] = current.message;
            return acc;
          }, {});
          setErrors(formattedErrors);
        } else {
          // Handle the case where 'inner' is undefined or not an array
          console.error("Error details not available:", err);
          // Optionally, set a general form error
          setErrors({
            general:
              "Failed to validate data. Please review your input and try again.",
          });
        }
      });
  };

  // Function to handle form data submission
  const submitFormData = () => {
    const requestData = { data: formData };
    const url = `${API_URL}/api/contact-messages`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        setFormData({ name: "", city: "", phone: "", message: "" }); // Clear form data
        setFeedbackMessage("Mesajul a fost trimis. Multumim!"); // Set success message
        setErrors({}); // Clear any errors
      })
      .catch((error) => {
        console.error("Error:", error);
        setErrors({
          general: "Mesajul nu a putut fi trimis. Te rugam sa incerci din nou.",
        });
      });
  };

  return (
    <div className="section">
      <div className="mb-3 title is-4">Salut!</div>
      <div className="mb-6 subtitle is-6">
        Dacă vrei să îți construiești sau să îți amenajezi casa, dacă vrei să ne
        întrebi ceva sau pur și simplu să ne saluți, ne poți lăsa un mesaj și
        îți vom răspunde cu drag.
      </div>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="name" className="label">
            Nume (obligatoriu)
          </label>
          <div className="control">
            <input
              type="text"
              className="input"
              id="name"
              name="name"
              required
              onChange={handleChange}
              value={formData.name}
            />
          </div>
          {errors.name && <p className="help is-danger">{errors.name}</p>}
        </div>
        <div className="field">
          <label htmlFor="city" className="label">
            Oras (obligatoriu)
          </label>
          <div className="control">
            <input
              type="text"
              className="input"
              id="city"
              name="city"
              required
              onChange={handleChange}
              value={formData.city}
            />
          </div>
          {errors.city && <p className="help is-danger">{errors.city}</p>}
        </div>
        <div className="field">
          <label htmlFor="phone" className="label">
            Telefon
          </label>
          <div className="control">
            <input
              type="tel"
              className="input"
              id="phone"
              name="phone"
              onChange={handleChange}
              value={formData.phone}
            />
          </div>
          {errors.phone && <p className="help is-danger">{errors.phone}</p>}
        </div>
        <div className="field">
          <label htmlFor="message" className="label">
            Mesaj (obligatoriu)
          </label>
          <div className="control">
            <textarea
              className="textarea"
              id="message"
              name="message"
              rows="3"
              required
              onChange={handleChange}
              value={formData.message}
            ></textarea>
          </div>
          {errors.message && <p className="help is-danger">{errors.message}</p>}
        </div>
        <div className="field">
          <div className="control">
            <button type="submit" className="button" onSubmit={handleSubmit}>
              Trimite
            </button>
          </div>
        </div>
        {feedbackMessage && (
          <p className="help is-success">{feedbackMessage}</p>
        )}
        {errors.general && <p className="help is-danger">{errors.general}</p>}
      </form>
    </div>
  );
};

export default Contact;
