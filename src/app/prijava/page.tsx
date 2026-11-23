'use client'

import { useState } from "react";
import styled from "styled-components";
import { SignUpPageContainer, SignUpForm, CustomSignUpInputContainer, CustomSignUpButton, Spinner, StatusBox as SubmissionStatusBox } from "../components/ui/FormStyles";

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
    formData.append("email", formElement.email.value);
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
          <label htmlFor="ime">Ime</label>
          <input id="ime" name="ime" required></input>
        </CustomSignUpInputContainer>
        <CustomSignUpInputContainer>
          <label htmlFor="prezime">Prezime</label>
          <input id="prezime" name="prezime" required></input>
        </CustomSignUpInputContainer>
        <CustomSignUpInputContainer>
          <label htmlFor="kontaktTelefon">Kontakt telefon</label>
          <input id="kontaktTelefon" name="kontaktTelefon" required></input>
        </CustomSignUpInputContainer>
        <CustomSignUpInputContainer>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required></input>
        </CustomSignUpInputContainer>
        <CustomSignUpInputContainer>
          <label htmlFor="brojLicneKarte">Broj lične karte</label>
          <input id="brojLicneKarte" name="brojLicneKarte" required></input>
        </CustomSignUpInputContainer>
        <CustomSignUpInputContainer>
          <label htmlFor="photo">Fotografija</label>
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
          <label htmlFor="adresaStanovanja">Adresa stanovanja</label>
          <input id="adresaStanovanja" name="adresaStanovanja" required></input>
        </CustomSignUpInputContainer>
        <CustomSignUpInputContainer>
          <label>Posjedujem oružje</label>
          <CustomRadioGroup role="radiogroup" aria-label="Posjedujem oružje">
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
            <label htmlFor="brojOruzanogLista">Broj oružnog lista</label>
            <input id="brojOruzanogLista" name="brojOruzanogLista" required></input>
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
          <SubmissionStatusBox role="status" $status={submissionStatus}>
            {submissionMessage}
          </SubmissionStatusBox>
        )}
      </SignUpForm>
    </SignUpPageContainer>
  );
}



const CustomRadioGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;

  input[type='radio'] {
    position: absolute; width: 1px; height: 1px; opacity: 0;
  }
  input[type='radio']:focus-visible + label { outline: 2px solid var(--accent); outline-offset: 4px; }

  label {
    min-height: 50px;
    min-width: 72px;
    display: grid;
    place-items: center;
    padding: 0.5rem 1.25rem;
    font-size: 1.1rem;
    background: #0e100d;
    border: 1px solid var(--border-strong);
    border-radius: 0;
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
  position: absolute; width: 1px; height: 1px; opacity: 0;
  &:focus-visible + label { outline: 2px solid var(--accent); outline-offset: 4px; }
`;

const CustomUploadLabel = styled.label`
  display: inline-block;
  background-color: transparent;
  color: #ceff51;
  border: 1px dashed #ceff51;
  padding: 0.75rem 1rem;
  border-radius: 0;
  cursor: pointer;
  margin-top: 0;
  min-height: 50px;
  font-size: 1.05rem;
  overflow-wrap: anywhere;
  text-align: center;
  transition: all 0.25s ease;

  &:hover {
    background-color: #ceff51;
    color: black;
  }
`;