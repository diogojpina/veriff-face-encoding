import { useEffect, useState } from "react";
import Layout from "../../../components/layout/Layout";
import { FaceEncodingService } from "../../../services/face-encoding/face.encoding.service";
import DataTable from "../../../components/dataTable/DataTable";
import { FaceEncodingSession } from "../../../entities";
import { Link } from "react-router-dom";
import { BsEye, BsPlus } from "react-icons/bs";
import { Button, useToast } from "@chakra-ui/react";
import Loader from "../../../components/Loader/Loader";

export default function FaceEncodingListPage() {
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState<FaceEncodingSession[]>([]);

  useEffect(() => {
    load();
  }, []);

  const load = () => {
    setLoading(true);
    FaceEncodingService.list()
      .then((sessions) => {
        console.log(sessions);
        setSessions(sessions);
      })
      .finally(() => setLoading(false));
  };

  const addSession = () => {
    setLoading(true);
    FaceEncodingService.createSession()
      .then((session) => {
        setSessions([...sessions, session]);
        toast({
          title: "Success",
          description: "Session created succcessfully.",
          status: "success",
        });
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Error to create a new session.",
          status: "error",
        });
      })
      .finally(() => setLoading(false));
  };

  const columns = [
    {
      headerName: "Session ID",
      field: "id",
    },
    {
      headerName: "Status",
      field: "status",
    },
    {
      headerName: "Action",
      renderCell: (row: any) => {
        return (
          <>
            <Link to={`/face-encoding/${row.id}`}>
              <BsEye />
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <Layout>
      {loading && <Loader />}
      <Button onClick={addSession}>
        <BsPlus />
      </Button>
      <DataTable
        rows={sessions}
        columns={columns}
        pagination={{ page: 1, pages: 1, pageSize: 1, count: 1 }}
        loading={loading}
      />
    </Layout>
  );
}
