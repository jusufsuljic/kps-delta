'use client'

import { useState } from "react";
import styled from "styled-components";

// --- Main Component ---
export default function SignUp() {
  // Existing state
  const [hasWeapon, setHasWeapon] = useState(false);
  // const [selectedPackage, setSelectedPackage] = useState<'starter' | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<'starter' | null>("starter");
  const [photoFile, setPhotoFile] = useState<File | null>(null);

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
    formData.append("brojLicneKarte", formElement.brojLicneKarte.value);
    formData.append("adresaStanovanja", formElement.adresaStanovanja.value);
    formData.append("hasWeapon", hasWeapon ? "Da" : "Ne");
    formData.append("brojOruzanogLista", hasWeapon ? formElement.brojOruzanogLista?.value || "" : "");
    formData.append("paket", selectedPackage || "");
    if (photoFile) {
      formData.append("fotografija", photoFile);
    } else {
      // Basic client-side validation
      setSubmissionStatus('error');
      setSubmissionMessage("Molimo Vas da priložite fotografiju.");
      setIsLoading(false);
      return;
    }

    if (selectedPackage !== 'starter' || selectedPackage == null) {
      setSubmissionStatus('error');
      setSubmissionMessage("Molimo Vas da odaberete paket.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/register", {
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
        setHasWeapon(false);
        setSelectedPackage(null);
        setPhotoFile(null);
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
        <h1>FORMA ZA REGISTRACIJU</h1>

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
          <label>Broj lične karte</label>
          <input name="brojLicneKarte" required></input>
        </CustomSignUpInputContainer>
        <CustomSignUpInputContainer>
          <label>Fotografija</label>
          <HiddenFileInput
            type="file"
            id="photo"
            accept="image/*"
            name="fotografija"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setPhotoFile(e.target.files[0]);
              }
            }}
          />
          <CustomUploadLabel htmlFor="photo">
            {photoFile ? photoFile.name : "Odaberi fotografiju"}
          </CustomUploadLabel>
        </CustomSignUpInputContainer>
        <CustomSignUpInputContainer>
          <label>Adresa stanovanja</label>
          <input name="adresaStanovanja" required></input>
        </CustomSignUpInputContainer>
        <CustomSignUpInputContainer>
          <label>Posjedujem oružje</label>
          <CustomRadioGroup>
            <input
              type="radio"
              id="yes1"
              name="hasWeapon"
              value="yes"
              checked={hasWeapon}
              onChange={() => setHasWeapon(true)}
            />
            <label htmlFor="yes1">Da</label>
            <input
              type="radio"
              id="no1"
              name="hasWeapon"
              value="no"
              checked={!hasWeapon}
              onChange={() => setHasWeapon(false)}
            />
            <label htmlFor="no1">Ne</label>
          </CustomRadioGroup>
        </CustomSignUpInputContainer>
        {hasWeapon && (
          <CustomSignUpInputContainer>
            <label>Broj oružnog lista</label>
            <input name="brojOruzanogLista" required></input>
          </CustomSignUpInputContainer>
        )}
        {/* <PackageSelectionContainer>
          <PackageBox
            selected={selectedPackage === 'starter'}
            onClick={() => setSelectedPackage('starter')}
          >
            <h2>STARTER</h2>
            <ul>
              <li>Osnovni pristup</li>
              <li>Jedan trening sedmično</li>
              <li>Grupne sesije</li>
              <li>Podrška putem e-maila i WhatsApp-a</li>
            </ul>
            <Price>150 KM/god</Price>
          </PackageBox>
        </PackageSelectionContainer> */}
        {/* <input required hidden value={selectedPackage || ''} readOnly name="paket"></input> */}

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

const CustomRadioGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;

  input[type='radio'] {
    display: none;
  }

  label {
    padding: 0.5rem 1rem;
    border: 2px solid gray;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-weight: 500;
  }

  input[type='radio']:checked + label {
    background-color: #ceff51;
    border-color: #ceff51;
    color: black;
  }
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

const PackageSelectionContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  margin: 2rem 0;
  flex-wrap: wrap;

  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
`;

const PackageBox = styled.div<{ selected: boolean; premium?: boolean }>`
  flex: 1;
  min-width: 240px;
  padding: 1.5rem;
  border-radius: 12px;
  border: 2px solid #ceff51;
  background-color: ${({ selected }) => (selected ? '#ceff51' : 'transparent')};
  color: ${({ selected }) => (selected ? '#000' : '#ceff51')};
  box-shadow: ${({ premium }) => premium ? '0 0 10px rgba(206, 255, 81, 0.4)' : 'none'};
  cursor: pointer;
  transition: all 0.25s ease;
  text-align: left;

  &:hover {
    background-color: #ceff51;
    color: #000;
  }

  h2 {
    margin-top: 0;
    margin-bottom: 0.5rem;
  }

  ul {
    margin: 1rem 0;
    padding-left: 1.2rem;
    list-style-type: disc;
    font-size: 0.95rem;
  }
`;

const Price = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  margin-top: 1rem;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const CustomUploadLabel = styled.label`
  display: inline-block;
  background-color: transparent;
  color: #ceff51;
  border: 2px solid #ceff51;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 0.5rem;
  text-align: center;
  transition: all 0.25s ease;

  &:hover {
    background-color: #ceff51;
    color: black;
  }
`;