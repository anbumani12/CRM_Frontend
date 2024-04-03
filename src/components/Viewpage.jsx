import React, { useEffect, useState } from "react";
import AxiosService from "../utils/AxiosService";
import toast from "react-hot-toast";
import ApiRoutes from "../utils/ApiRoutes";
import Table from "react-bootstrap/Table";
import { useParams } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { Spin } from "antd";

function Viewpage() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true); // Initially set loading to true
  const params = useParams();
  const { id } = params;
  const logout = useLogout();

  const getData = async () => {
    try {
      setLoading(true); // Set loading to true when fetching data
      const res = await AxiosService.get(`${ApiRoutes.SERVICE.path}/${id}`, {
        authenticate: ApiRoutes.SERVICE.authenticate,
      });
      if (res.status === 200) {
        setData(res.data.data);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      if (error.response.status === 401) logout();
    } finally {
      setLoading(false); // Set loading to false after data fetching is complete
    }
  };

  useEffect(() => {
    if (id) getData();
  }, [id]); // Fetch data whenever the id changes

  const changeStatus = async (payload) => {
    try {
      const res = await AxiosService.put(
        `${ApiRoutes.CHANGE_STATUS.path}/${payload.id}`,
        payload,
        {
          authenticate: ApiRoutes.CHANGE_STATUS.authenticate,
        }
      );

      if (res.status === 200) {
        toast.success(res.data.message);
        getData();
      }
    } catch (error) {
      toast.error(error.response.data.message);
      if (error.response.status === 401) logout();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    formProps.id = data._id;
    changeStatus(formProps);
  };

  return (
    <>
      {/* Render the loading spinner while loading */}
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <Spin size="large" tip="Loading..." />
        </div>
      ) : (
        <div className="details-wrapper">
          <Table striped bordered hover style={{ tableLayout: "fixed", width: "100%" }}>
            <thead>
              <tr>
                <th style={{ width: "30%" }}>Item</th>
                <th style={{ width: "70%" }}>Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(data).map((e, i) => {
                return (
                  <tr key={i}>
                    <td>{e}</td>
                    <td>{data[e] !== null ? data[e] : "-"}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
}

export default Viewpage;
