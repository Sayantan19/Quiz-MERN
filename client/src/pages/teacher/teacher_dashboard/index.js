import React from 'react';
import { Footer, Header, TeacherDash } from '../../../components/index.js';

export default function teacherDashPage() {
  return (
    <>
        <Header name="Welcome to the Portal" />
        <TeacherDash />
        <Footer />
    </>
  );
}
