import React, { useState, useEffect } from "react";
import AxiosService from "../utils/AxiosService";
import ApiRoutes from "../utils/ApiRoutes";
import toast from "react-hot-toast";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { Spin } from "antd";

function AdminDashboard() {
  const [countData, setCountData] = useState([]);
  const [data, setData] = useState([]);
  const [assigned, setAssigned] = useState([]);
  const [opened, setOpened] = useState([]);
  const [closed, setClosed] = useState([]);
  const [loading, setLoading] = useState(false);
  const logout = useLogout();
  const navigate = useNavigate();

  const getDashboardCount = async () => {
    try {
      setLoading(true);
      let res = await AxiosService.get(ApiRoutes.DASHBOARD_COUNT.path, {
        authenticate: ApiRoutes.DASHBOARD_COUNT.authenticate,
      });

      if (res?.status === 200) {
        setCountData(res?.data);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const loadData = async (statusAction) => {
    try {
      setLoading(true);
      let res = await AxiosService.get(
        `${ApiRoutes.LIST.path}/${statusAction}`,
        {
          authenticate: ApiRoutes.LIST.authenticate,
        }
      );

      if (res?.status === 200) {
        setData(res?.data.data);
        const ress = res.data.data;
        if (statusAction === "Assigned") {
          setAssigned(ress.length);
          setOpened(0);
          setClosed(0);
        }
        if (statusAction === "Open") {
          setOpened(ress.length);
          setAssigned(0);
          setClosed(0);
        }
        if (statusAction === "Closed") {
          setClosed(ress.length);
          setOpened(0);
          setAssigned(0);
        }
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleError = (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        toast.error("Unauthorized! Please login again.");
        logout();
      } else {
        toast.error(error.response.data.message);
      }
    } else if (error.request) {
      toast.error("Network error! Please try again later.");
    } else {
      toast.error("An error occurred! Please try again later.");
    }
  };

  useEffect(() => {
    getDashboardCount();
  }, []);

  const handleViewButtonClick = (no) => {
    navigate(`/admin/service/${no}`);
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <div className="cardWrapper">
          <Card
            style={{
              width: "18rem",
              cursor: "pointer",
              marginTop: "20px",
              height: "80px",
              marginLeft: "20px",
            }}
            onClick={() => loadData("Open")}
          >
            <Card.Body
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Card.Title style={{ marginLeft: "5px", marginTop: "9px" }}>
                Open
              </Card.Title>

              {opened}
            </Card.Body>
          </Card>

          <Card
            style={{
              width: "18rem",
              cursor: "pointer",
              marginTop: "20px",
              height: "80px",
              marginLeft: "20px",
            }}
            onClick={() => loadData("Assigned")}
          >
            <Card.Body
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Card.Title style={{ marginLeft: "5px", marginTop: "9px" }}>
                Assigned{" "}
              </Card.Title>
              {assigned}
            </Card.Body>
          </Card>
          <Card
            style={{
              width: "18rem",
              cursor: "pointer",
              marginTop: "20px",
              height: "80px",
              marginLeft: "20px",
            }}
            onClick={() => loadData("Closed")}
          >
            <Card.Body
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Card.Title style={{ marginLeft: "5px", marginTop: "9px" }}>
                Closed
              </Card.Title>
              {closed}
            </Card.Body>
          </Card>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "50px" }}>
        {loading && <Spin size="large" tip="Loading..." />}
      </div>

      <div>
        {!loading && data.length ? (
          <div
            className="details-wrapper border rounded shadow-sm p-3"
            style={{
              marginLeft: "70px",
              marginRight: "100px",
              marginTop: "80px",
              width: "90%",
            }}
          >
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Created Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((e, i) => {
                  return (
                    <tr key={e._id}>
                      <td>{i + 1}</td>
                      <td>{e.title}</td>
                      <td>{e.category}</td>
                      <td>{e.name}</td>
                      <td>{e.email}</td>
                      <td>{e.status}</td>
                      <td>{e.createdAt}</td>
                      <td>
                        <Button
                          variant="primary"
                          onClick={() => handleViewButtonClick(e.no)}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        ) : (
          !loading && (
            <h3
              style={{
                textAlign: "center",
                marginTop: "100px",
                marginLeft: "40px",
              }}
            >
              Click the Card to Get Data
            </h3>
          )
        )}
      </div>
    </>
  );
}

export default AdminDashboard;
