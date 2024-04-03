import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AxiosService from "../utils/AxiosService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import ApiRoutes from "../utils/ApiRoutes";

function Create() {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    
    const form = e.target; // Get the form element
  
    const formData = new FormData(form);
    const formProps = Object.fromEntries(formData);

    const requiredFields = [
      "name",
      "email",
      "mobile",
      "category",
      "title",
      "description",
    ];
    const emptyFields = requiredFields.filter((field) => !formProps[field]);

    if (emptyFields.length > 0) {
      toast.error("All fields are required");
      return;
    }

    try {
      let res = await AxiosService.post(ApiRoutes.SR_CREATE.path, formProps, {
        authenticate: ApiRoutes.SR_CREATE.authenticate,
      });

      if (res.status === 200) {
        toast.success("Service Request Created Successfully", {
          duration: 2000,
        });

        // Clear form fields
        form.reset();

        setTimeout(() => {
          sendEmail(); // Call the function to send email
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const sendEmail = async () => {
    try {
      // Display toast message for email sent
      toast.success("Email Sent Successfully", { duration: 2000 });
    } catch (error) {
      toast.error("Failed to send email");
    }
  };

  return (
    <div
      className="backWrapper"
      style={{
        backgroundImage: `url("https://t3.ftcdn.net/jpg/02/58/66/94/360_F_258669413_rLs4pnnhkUkExE9m8EZuhGbnkJI0izgQ.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "83vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="loginWrapper border rounded shadow-sm p-4"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          maxWidth: "500px",
          padding: "50px",
          maxHeight: "600px",
          overflowY: "auto",
        }}
      >
        <div>
          <h3 style={{ marginTop: "-20px" }}>Report us here</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2" controlId="formName">
              <Form.Label>
                Name<span className="required">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="formEmail">
              <Form.Label>
                Email address<span className="required">*</span>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="formMobile">
              <Form.Label>
                Mobile<span className="required">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Mobile"
                name="mobile"
                required
              />
            </Form.Group>

            <Form.Group className="mb-2" controlId="formCategory">
              <Form.Label>
                Category<span className="required">*</span>
              </Form.Label>
              <Form.Select defaultValue={"default"} name="category" required>
                <option value="default" disabled>
                  Select Category
                </option>
                <option value="Maintenance">Maintenance</option>
                <option value="Housekeeping">Housekeeping</option>
                <option value="Enquiry">Enquiry</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2" controlId="formTitle">
              <Form.Label>
                Title<span className="required">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                name="title"
                required
              />
            </Form.Group>

            <div style={{ marginBottom: "15px" }}></div>

            <Form.Group className="mb-2" controlId="formDescription">
              <FloatingLabel controlId="formDescription" label="Description">
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  style={{ height: "80px" }}
                  name="description"
                  required
                />
              </FloatingLabel>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Create;
