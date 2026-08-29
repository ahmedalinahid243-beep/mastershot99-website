import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "./AdminAuth";
import AdminLayout from "./AdminLayout";

export default function RequireAdminAuth({ children }: { children: ReactNode }) {
  const { isAuthed } = useAdminAuth();
  if (!isAuthed) return <Navigate to="/admin/login" replace />;
  return <AdminLayout>{children}</AdminLayout>;
}
