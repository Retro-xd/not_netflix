import React, { Suspense } from "react";
import GoogleSigninForm from "./GoogleSigninForm";

export default function GoogleSignin() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GoogleSigninForm />
    </Suspense>
  );
}
