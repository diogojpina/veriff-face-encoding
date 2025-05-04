import { useEffect, useState } from "react";
import Layout from "../../../components/layout/Layout";
import { FaceEncodingService } from "../../../services/face-encoding/face.encoding.service";
import DataTable from "../../../components/dataTable/DataTable";
import { FaceEncodingSession } from "../../../entities";
import { Link } from "react-router-dom";
import { BsEye, BsPencil } from "react-icons/bs";

export default function FaceEncodingListPage() {
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
            <Link to={`/face-encoding/summary/${row.id}`}>
              <BsEye />
            </Link>
            <Link to={`/face-encoding/${row.id}`}>
              <BsPencil />
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <Layout>
      <DataTable
        rows={sessions}
        columns={columns}
        pagination={{ page: 1, pages: 1, pageSize: 1, count: 1 }}
        loading={loading}
      />
    </Layout>
  );
}
