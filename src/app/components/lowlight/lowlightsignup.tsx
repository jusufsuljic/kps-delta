'use client';

import { useState } from "react";
import styled from "styled-components";

export default function LowlightSignup() {
    const [isLoading, setIsLoading] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [submissionMessage, setSubmissionMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setSubmissionStatus('idle');

        const formElement = e.currentTarget as HTMLFormElement;
        const formData = new FormData();

        formData.append("ime", formElement.ime.value);
        formData.append("prezime", formElement.prezime.value);
        formData.append("kontaktTelefon", formElement.kontaktTelefon.value);
        formData.append("email", formElement.email.value);
        formData.append("brojLicneKarte", formElement.brojLicneKarte.value);

        try {
            const response = await fetch("/api/register/lowlight", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                setSubmissionStatus('success');
                setSubmissionMessage("Uspješno ste poslali registraciju! Bićete obaviješteni o satnici treninga putem poruke (vaš broj telefona).");
                formElement.reset();
            } else {
                setSubmissionStatus('error');
                setSubmissionMessage(`Greška prilikom slanja: ${result.error || 'Nepoznata greška na serveru.'}`);
            }
        } catch (err) {
            setSubmissionStatus('error');
            setSubmissionMessage("Došlo je do greške pri slanju forme. Provjerite internet konekciju.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SignUpPageContainer>
            <SignUpForm onSubmit={handleSubmit}>
                <h1>REGISTRACIJA ZA DELTA - LOW LIGHT (27.12.2025.)</h1>

                <CustomSignUpInputContainer>
                    <label>Ime</label>
                    <input name="ime" required />
                </CustomSignUpInputContainer>

                <CustomSignUpInputContainer>
                    <label>Prezime</label>
                    <input name="prezime" required />
                </CustomSignUpInputContainer>

                <CustomSignUpInputContainer>
                    <label>Kontakt telefon</label>
                    <input name="kontaktTelefon" required />
                </CustomSignUpInputContainer>

                <CustomSignUpInputContainer>
                    <label>Email</label>
                    <input type="email" name="email" required />
                </CustomSignUpInputContainer>

                <CustomSignUpInputContainer>
                    <label>Broj lične karte</label>
                    <input name="brojLicneKarte" required />
                </CustomSignUpInputContainer>

                <CustomSignUpButton type="submit" disabled={isLoading}>
                    {isLoading ? <Spinner /> : "PRIJAVI SE"}
                </CustomSignUpButton>

                {submissionStatus !== 'idle' && (
                    <SubmissionStatusBox status={submissionStatus}>
                        {submissionMessage}
                    </SubmissionStatusBox>
                )}
            </SignUpForm>
        </SignUpPageContainer>
    );
}

// --- Styled Components (same as before, unchanged) ---
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
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const CustomSignUpButton = styled.button`
  background-color: #CEFF51;
  border: none;
  color: #000;
  font-family: var(--font-mohave);
  font-size: 1.5rem;
  font-weight: bold;
  height: 4rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.2s ease;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.65;
  }
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border-left-color: #000;
  animation: spin 1s ease infinite;
  margin: auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;