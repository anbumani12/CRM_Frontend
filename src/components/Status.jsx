import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AxiosService from "../utils/AxiosService";
import toast from "react-hot-toast";
import ApiRoutes from "../utils/ApiRoutes";
import Table from "react-bootstrap/Table";

function Status() {
  let [data, setData] = useState({});
  const [showToast, setShowToast] = useState(false);

  const getSrDetails = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    let srno = formProps.srno;

    if (!srno) {
      if (!showToast) {
        toast.error("Please enter a valid SR No");
        setShowToast(true);
      }
      return;
    }

    try {
      let res = await AxiosService.get(`${ApiRoutes.SR.path}/${srno}`, {
        authenticate: ApiRoutes.SR.authenticate,
      });

      if (res.status === 200) {
        if (!showToast) {
          toast.success("Data Fetch Successfully");
          setShowToast(true);
        }
        setData(res.data.data);
      }
    } catch (error) {
      if (!showToast) {
        toast.error(error.response.data.message);
        setShowToast(true);
      }
    }
  };

  return (
    <div className="backgroundWrapper">
      <div className="loginWrapper border rounded shadow-sm p-3">
        <Form onSubmit={getSrDetails}>
          <Form.Group className="mb-3">
            <Form.Label>Service Request Number:</Form.Label>
            <Form.Control type="text" placeholder="Enter SR No" name="srno" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
      {Object.keys(data).length > 0 && (
        <div className="detail-wrapper">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Item</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(data).map((e, i) => (
                <tr key={i}>
                  <td>{e.toUpperCase()}</td>
                  <td>{data[e] !== null ? data[e] : "-"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default Status;
