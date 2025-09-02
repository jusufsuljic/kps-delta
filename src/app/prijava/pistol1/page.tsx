'use client'

import { useState } from "react";
import styled from "styled-components";

// --- Main Component ---
export default function Pistol1Signup() {

  // --- NEW: State for handling submission status ---
  const [isLoading, setIsLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submissionMessage, setSubmissionMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // --- NEW: Start loading state and reset previous messages ---
    setIsLoading(true);
    setSubmissionStatus('idle');

    const formElement = e.currentTarget as HTMLFormElement;
    const formData = new FormData();

    // Append all form data
    formData.append("ime", formElement.ime.value);
    formData.append("prezime", formElement.prezime.value);
    formData.append("kontaktTelefon", formElement.kontaktTelefon.value);
    formData.append("email", formElement.email.value);
    formData.append("brojLicneKarte", formElement.brojLicneKarte.value);

    try {
      const response = await fetch("/api/register/pistol1", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        // --- NEW: Handle success ---
        setSubmissionStatus('success');
        setSubmissionMessage("Uspješno ste poslali registraciju! Kontaktirat ćemo Vas uskoro.");
        // Reset form fields for a new submission
        formElement.reset();
      } else {
        // --- NEW: Handle server error ---
        setSubmissionStatus('error');
        setSubmissionMessage(`Greška prilikom slanja: ${result.error || 'Nepoznata greška na serveru.'}`);
      }
    } catch (err) {
      // --- NEW: Handle network or other critical errors ---
      setSubmissionStatus('error');
      setSubmissionMessage("Došlo je do greške pri slanju forme. Provjerite internet konekciju.");
      console.error(err);
    } finally {
      // --- NEW: Stop loading regardless of outcome ---
      setIsLoading(false);
    }
  };

  return (
    <SignUpPageContainer>
      <SignUpForm
        onSubmit={handleSubmit}
        name="registracija"
        encType="multipart/form-data"
      >
        <h1>FORMA ZA DELTA - PISTOL LEVEL 1</h1>

        {/* All your input fields remain the same... */}
        <CustomSignUpInputContainer>
          <label>Ime</label>
          <input name="ime" required></input>
        </CustomSignUpInputContainer>
        <CustomSignUpInputContainer>
          <label>Prezime</label>
          <input name="prezime" required></input>
        </CustomSignUpInputContainer>
        <CustomSignUpInputContainer>
          <label>Kontakt telefon</label>
          <input name="kontaktTelefon" required></input>
        </CustomSignUpInputContainer>
        <CustomSignUpInputContainer>
          <label>Email</label>
          <input type="email" name="email" required></input>
        </CustomSignUpInputContainer>
        <CustomSignUpInputContainer>
          <label>Broj lične karte</label>
          <input name="brojLicneKarte" required></input>
        </CustomSignUpInputContainer>
        
        {/* --- NEW: Button now shows spinner and is disabled while loading --- */}
        <CustomSignUpButton type="submit" disabled={isLoading}>
          {isLoading ? <Spinner /> : "PRIJAVI SE"}
        </CustomSignUpButton>

        {/* --- NEW: Status message box appears after submission attempt --- */}
        {submissionStatus !== 'idle' && (
          <SubmissionStatusBox status={submissionStatus}>
            {submissionMessage}
          </SubmissionStatusBox>
        )}
      </SignUpForm>
    </SignUpPageContainer>
  );
}

// --- Styled Components ---

// --- NEW: Spinner animation component ---
const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border-left-color: #000;
  animation: spin 1s ease infinite;
  margin: auto;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

// --- NEW: Component for success/error messages ---
const SubmissionStatusBox = styled.div<{ status: 'success' | 'error' }>`
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
  color: #fff;
  background-color: ${({ status }) => (status === 'success' ? '#28a745' : '#dc3545')};
  animation: fadeIn 0.5s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// --- MODIFIED: Button now handles disabled state ---
const CustomSignUpButton = styled.button`
  background-color: #CEFF51;
  border: none;
  color: #000000;
  font-family: var(--font-mohave);
  font-size: 1.5rem;
  font-weight: bold;
  height: 4rem;
  cursor: pointer;
  display: flex; /* Added for centering spinner */
  justify-content: center; /* Added for centering spinner */
  align-items: center; /* Added for centering spinner */
  transition: opacity 0.2s ease;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.65;
  }
`;

// --- All your other styled-components remain unchanged ---
const SignUpPageContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 20rem;
  @media screen and (max-width: 767px) {
    padding: 2rem;
  }
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
`;

const CustomSignUpInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  input {
    background-color: #1a1a1a;
    color: #fff;
    height: 2.5rem;
    width: 100%;
    border-radius: 6px;
    padding-left: 1rem;
    border: 2px solid gray;
    transition: border-color 0.2s ease;
    
    &:focus {
      outline: none;
      border-color: #CEFF51;
    }
  }
`;
