import { Button, Container, Input, Spacer, useToast } from "@chakra-ui/react";
import Layout from "../../components/layout/Layout";
import { FormEvent, useState } from "react";
import { AuthService } from "../../services/auth/auth.service";
import { useNavigate } from "react-router-dom";

export default function AuthLoginPage() {
  const toast = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const login = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    AuthService.login(form)
      .then(() => {
        navigate("/face-encoding");
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "An error occurred while saving the user.",
          status: "error",
        });
      });
  };

  return (
    <Layout>
      <Container maxWidth="70%" bg="gray.50" gap={4} p={4}>
        <h2>Login</h2>
        <form onSubmit={login}>
          <Input
            placeholder="Email"
            value={form.email}
            onChange={(event) =>
              setForm({ ...form, email: event.target.value })
            }
          />
          <Spacer />
          <Input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(event) =>
              setForm({ ...form, password: event.target.value })
            }
          />
          <Button type="submit" colorScheme="blue">
            Login
          </Button>
        </form>
      </Container>
    </Layout>
  );
}
