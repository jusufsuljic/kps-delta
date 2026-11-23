'use client';

import { useState } from "react";
import { SignUpPageContainer, SignUpForm, CustomSignUpInputContainer, CustomSignUpButton, Spinner, StatusBox as SubmissionStatusBox } from "../ui/FormStyles";

type LowlightSignupProps = {
    totalCount: number
}

export default function LowlightSignup({ totalCount }: LowlightSignupProps) {
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

                <CustomSignUpButton type="submit" disabled={isLoading || totalCount >= 10}>
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
