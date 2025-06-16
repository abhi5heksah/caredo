"use server";
import {createClient} from "@/lib/supabase/server";
import {redirect} from "next/navigation";

type Props = {
    children: React.ReactNode;
}

const AuthProvider = async ({children}:Props) => {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect("/auth/login");
    }
    return children;
};
export default AuthProvider;
