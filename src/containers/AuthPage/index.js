import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function Auth() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
