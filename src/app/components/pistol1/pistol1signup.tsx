'use client';

import { useState } from "react";
import styled from "styled-components";
import { SignUpPageContainer, SignUpForm, CustomSignUpInputContainer, CustomSignUpButton, Spinner, StatusBox as SubmissionStatusBox } from "../ui/FormStyles";

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
                                    <strong>{group.label}</strong>
                                    <small>{group.full ? 'POPUNJENO' : selectedGroup?.id === group.id ? 'ODABRANO' : 'SLOBODNO'}</small>
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
  gap: 10px;
  > label { font-size: 1.05rem; color: #c7cbbf; }
`;

const TimeframeOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: 10px;
`;

const TimeframeBox = styled.button<{ $selected: boolean }>`
  display: flex; flex-direction: column; align-items: flex-start; gap: 2px;
  padding: 14px 16px; min-height: 76px; text-align: left;
  font-family: var(--font-mohave), sans-serif;
  background: ${({ $selected }) => ($selected ? 'var(--accent)' : '#0e100d')};
  color: ${({ $selected }) => ($selected ? '#101110' : 'var(--foreground)')};
  border: 1px solid ${({ $selected }) => ($selected ? 'var(--accent)' : 'var(--border-strong)')};
  border-radius: 0; cursor: pointer;
  small { font-size: 0.85rem; letter-spacing: 0.1em; }
  strong { font-size: 1.45rem; font-weight: 600; line-height: 1.2; }
  small { color: ${({ $selected }) => ($selected ? '#101110' : 'var(--accent)')}; }
  &:hover:not(:disabled) { border-color: var(--accent); }
  &:disabled {
    cursor: not-allowed; opacity: 0.45;
    strong { text-decoration: line-through; }
    small { color: var(--danger); }
  }
`;
