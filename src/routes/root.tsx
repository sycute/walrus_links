import { Header } from "@/components/Header";
import { Container } from "@radix-ui/themes";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

export function Root() {
    return (
        <div>
            <Toaster position="bottom-center" />
            <Header />
            <Container>
                <Outlet />
            </Container>
        </div>
    )
}