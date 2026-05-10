import { Button, Html, Head, Body } from "react-email";
import * as React from "react";

export default function Welcome() {
  return (
    <Html>
      <Head />
      <Body>
        <h1> Welcome to the Job Application Newsletter Board! </h1>
        <p> Thank you for joining our community!</p>
      </Body>
    </Html>
  );
}