import {
  Button,
  Container,
  Heading,
  Input,
  Spacer,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaceEncodingService } from "../../../services/face-encoding/face.encoding.service";
import { FaceEncodingSession } from "../../../entities";
import Layout from "../../../components/layout/Layout";
import Loader from "../../../components/Loader/Loader";
import DataTable from "../../../components/dataTable/DataTable";
import { BsEye } from "react-icons/bs";
import FaceEncodeModal from "./face.encoding.modal";

export default function FaceEncodingSummaryPage() {
  const toast = useToast();
  const params = useParams();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<FaceEncodingSession>({
    id: "",
    status: "",
    encodings: [],
    createdAt: new Date(),
  });
  const [encode, setEncode] = useState<number[]>([]);

  useEffect(() => {
    if (params.id) {
      load(params.id);
    }
  }, [params.id]);

  const load = (id: string) => {
    setLoading(true);
    FaceEncodingService.getSession(id)
      .then((faceEncodingSession) => setSession(faceEncodingSession))
      .finally(() => setLoading(false));
  };

  const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files === null) {
      toast({
        title: "Error",
        description: "Select a file.",
        status: "error",
      });
      return;
    }

    const file = files[0];

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    FaceEncodingService.uploadImage(session.id, formData)
      .then((encoding) => {
        setSession({ ...session, encodings: [...session.encodings, encoding] });
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Failed to process the file.",
          status: "error",
        });
      })
      .finally(() => setLoading(false));
  };

  const openEncode = (encode: number[]) => {
    setEncode(encode);
    onOpen();
  };

  const columns = [
    {
      headerName: "File",
      field: "file",
    },
    {
      headerName: "Status",
      field: "status",
    },
    {
      headerName: "File",
      field: "file",
    },
    {
      headerName: "Action",
      renderCell: (row: any) => {
        return (
          <>
            <Button onClick={() => openEncode(row.encode)}>
              <BsEye />
            </Button>
          </>
        );
      },
    },
  ];

  if (loading) return <Loader />;

  return (
    <Layout>
      <Container maxWidth="70%" bg="gray.50" gap={4} p={4} mb={4}>
        <Heading as="h3" size="lg">
          Session
        </Heading>
        <div>ID: {params.id}</div>
        <div>Status: {session.status}</div>
      </Container>

      <Spacer />

      <Container maxWidth="70%" bg="gray.50" gap={4} p={4} mb={4}>
        <Heading as="h3" size="lg">
          Upload Image
        </Heading>
        <Input type="file" onChange={uploadImage} />
      </Container>

      <Container maxWidth="70%" bg="gray.50" gap={4} p={4}>
        <Heading as="h3" size="lg">
          Face Encoded
        </Heading>
        <DataTable
          rows={session.encodings}
          columns={columns}
          pagination={{ page: 1, pages: 1, pageSize: 1, count: 1 }}
          loading={loading}
          checkboxSelection={false}
        />
      </Container>
      <FaceEncodeModal isOpen={isOpen} onClose={onClose} encode={encode} />
    </Layout>
  );
}
