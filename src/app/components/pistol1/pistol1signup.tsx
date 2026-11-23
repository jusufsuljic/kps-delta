'use client';

import { useState } from "react";
import styled from "styled-components";
import { SignUpPageContainer, SignUpForm, CustomSignUpInputContainer, CustomSignUpButton } from "../ui/FormStyles";

type Group = {
    id: number;
    label: string;
    visible: boolean;
    full: boolean;
};

export default function Pistol1Signup({ groups }: { groups: Group[] }) {
    const [isLoading, setIsLoading] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [submissionMessage, setSubmissionMessage] = useState('');
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

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
        formData.append("termin", selectedGroup!.label);
        formData.append("groupId", selectedGroup!.id.toString());

        try {
            const response = await fetch("/api/register/pistol1", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                setSubmissionStatus('success');
                setSubmissionMessage("Uspješno ste poslali registraciju! Bićete obaviješteni o satnici treninga putem poruke (vaš broj telefona).");
                formElement.reset();
                setSelectedGroup(null);
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
                <h1>REGISTRACIJA ZA DELTA - PISTOL LEVEL 1 (24.10.2026.)</h1>

                <CustomSignUpInputContainer>
                    <label htmlFor="ime">Ime</label>
                    <input id="ime" name="ime" required />
                </CustomSignUpInputContainer>

                <CustomSignUpInputContainer>
                    <label htmlFor="prezime">Prezime</label>
                    <input id="prezime" name="prezime" required />
                </CustomSignUpInputContainer>

                <CustomSignUpInputContainer>
                    <label htmlFor="kontaktTelefon">Kontakt telefon</label>
                    <input id="kontaktTelefon" name="kontaktTelefon" required />
                </CustomSignUpInputContainer>

                <CustomSignUpInputContainer>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" required />
                </CustomSignUpInputContainer>

                <CustomSignUpInputContainer>
                    <label htmlFor="brojLicneKarte">Broj lične karte</label>
                    <input id="brojLicneKarte" name="brojLicneKarte" required />
                </CustomSignUpInputContainer>

                <TimeframeContainer data-full-width>
                    <label>Odaberite termin</label>
                    <TimeframeOptions>
                        {groups
                            .filter((g) => g.visible)
                            .map((group) => (
                                <TimeframeBox
                                    key={group.id}
                                    type="button"
                                    $selected={selectedGroup?.id === group.id}
                                    aria-pressed={selectedGroup?.id === group.id}
                                    disabled={group.full}
                                    onClick={() => !group.full && setSelectedGroup(group)}
                                >
                                    {group.label}
                                </TimeframeBox>
                            ))}
                    </TimeframeOptions>
                </TimeframeContainer>

                <CustomSignUpButton type="submit" disabled={isLoading || !selectedGroup}>
                    {isLoading ? <Spinner /> : "PRIJAVI SE"}
                </CustomSignUpButton>

                {submissionStatus !== 'idle' && (
                    <SubmissionStatusBox role="status" $status={submissionStatus}>
                        {submissionMessage}
                    </SubmissionStatusBox>
                )}
            </SignUpForm>
        </SignUpPageContainer>
    );
}

const TimeframeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const TimeframeOptions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const TimeframeBox = styled.button<{ $selected: boolean }>`
  background-color: ${({ $selected }) => ($selected ? '#CEFF51' : 'transparent')};
  color: ${({ $selected }) => ($selected ? '#000' : '#fff')};
  font-family: var(--font-mohave);
  font-weight: 600;
  padding: 0.75rem 1.25rem;
  border-radius: 0;
  border: 2px solid #777;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 1rem;

  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

  &:hover {
    border-color: ${({ disabled }) => (disabled ? '#777' : '#CEFF51')};
    background-color: ${({ $selected, disabled }) =>
      disabled ? ($selected ? '#BBD94A' : 'transparent') : $selected ? '#CEFF51' : 'transparent'};
  }

  &:disabled {
    background-color: ${({ $selected }) => ($selected ? '#BBD94A' : 'transparent')};
    border-color: #555;
    cursor: not-allowed;
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

const SubmissionStatusBox = styled.div<{ $status: 'success' | 'error' }>`
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 0;
  text-align: center;
  font-weight: 500;
  color: #fff;
  background-color: ${({ $status }) => ($status === 'success' ? '#28a745' : '#dc3545')};
  animation: fadeIn 0.5s ease;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
