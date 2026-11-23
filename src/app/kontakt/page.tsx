'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { containerStyles, buttonStyles, PageHeading } from '../components/ui/Editorial';
import { CustomSignUpInputContainer as CustomInputContainer, Spinner, StatusBox as SubmissionStatusBox } from '../components/ui/FormStyles';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';

export default function ContactPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [submissionMessage, setSubmissionMessage] = useState('');
    const [question, setQuestion] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setSubmissionStatus('idle');
        const formData = new FormData(e.currentTarget);
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            if (response.ok) {
                setSubmissionStatus('success');
                setSubmissionMessage('Vaše pitanje je uspješno poslano! Odgovorit ćemo u najkraćem roku.');
                (e.target as HTMLFormElement).reset();
                setQuestion('');
            } else {
                setSubmissionStatus('error');
                setSubmissionMessage(result.error || 'Došlo je do greške.');
            }
        } catch (error) {
            console.log(error);
            setSubmissionStatus('error');
            setSubmissionMessage('Greška u komunikaciji sa serverom. Pokušajte ponovo.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <PageContainer>
            <PageHeading><h1>KONTAKT</h1><p>Informacije o članstvu, obukama i klubu. Javite nam se.</p></PageHeading>
            <ColumnsWrapper>
                <InfoSection>
                    <InfoItem href="tel:+38761032285">
                        <FaPhone aria-hidden="true" />
                        <span><small>TELEFON</small>+387 61 032 285</span>
                        <FiArrowUpRight aria-hidden="true" />
                    </InfoItem>
                    <InfoItem href="https://wa.me/38761032285" target="_blank" rel="noopener noreferrer">
                        <FaWhatsapp aria-hidden="true" />
                        <span><small>WHATSAPP</small>Pošalji poruku</span>
                        <FiArrowUpRight aria-hidden="true" />
                    </InfoItem>
                    <InfoItem href="mailto:kpsdelta@hotmail.com">
                        <FaEnvelope aria-hidden="true" />
                        <span><small>EMAIL</small>kpsdelta@hotmail.com</span>
                        <FiArrowUpRight aria-hidden="true" />
                    </InfoItem>
                    <InfoItem target="_blank" rel="noopener noreferrer" href="https://share.google/6kzBou3tgw0zyTQ4x">
                        <FaMapMarkerAlt aria-hidden="true" />
                        <span><small>LOKACIJA</small>Sportsko Strelište Žuč, 71000 Sarajevo</span>
                        <FiArrowUpRight aria-hidden="true" />
                    </InfoItem>
                </InfoSection>

                <FormColumn>
                    <h2>POŠALJITE NAM PORUKU</h2>
                    <p>Imate pitanje? Popunite formu ispod.</p>

                    <FormSection onSubmit={handleSubmit}>
                        <CustomInputContainer>
                            <label htmlFor="name">Ime i Prezime</label>
                            <input id="name" name="name" type="text" required />
                        </CustomInputContainer>

                        <CustomInputContainer>
                            <label htmlFor="email">Email Adresa</label>
                            <input id="email" name="email" type="email" required />
                        </CustomInputContainer>

                        <CustomInputContainer>
                            <label htmlFor="phone">Broj Telefona</label>
                            <input id="phone" name="phone" type="tel" required />
                        </CustomInputContainer>

                        <CustomInputContainer data-full-width>
                            <label htmlFor="question">Vaše Pitanje</label>
                            <CustomTextarea
                                id="question"
                                name="question"
                                required
                                maxLength={500}
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                            />
                            <CharCounter>{question.length} / 500</CharCounter>
                        </CustomInputContainer>

                        <SubmitButton type="submit" disabled={isLoading}>
                            {isLoading ? <Spinner /> : 'POŠALJI PITANJE'}
                        </SubmitButton>

                        {submissionStatus !== 'idle' && (
                            <SubmissionStatusBox role="status" $status={submissionStatus}>
                                {submissionMessage}
                            </SubmissionStatusBox>
                        )}
                    </FormSection>
                </FormColumn>
            </ColumnsWrapper>
        </PageContainer>
    );
}

const PageContainer = styled.div`
  ${containerStyles}
  padding-block: 56px 96px;
  @media (max-width: 767px) { padding-block: 32px 56px; }
`;

const ColumnsWrapper = styled.div`
  display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr); gap: 56px; align-items: start;
  @media (max-width: 900px) { grid-template-columns: 1fr; gap: 32px; }
`;

const InfoSection = styled.div`
  padding: 8px 32px; background: var(--surface); min-width: 0;
  @media (max-width: 600px) { padding: 24px 18px; }
`;

const InfoItem = styled.a`
  display: flex; align-items: center; gap: 16px;
  padding: 20px 0; border-top: 1px solid var(--border);
  &:first-child { border-top: 0; }
  > svg:first-child { flex-shrink: 0; color: var(--accent); font-size: 1.3rem; }
  > svg:last-child { margin-left: auto; flex-shrink: 0; color: var(--muted); }
  span { display: flex; flex-direction: column; gap: 2px; font-size: 1.2rem; overflow-wrap: anywhere; min-width: 0; }
  small { font-size: 0.85rem; letter-spacing: 0.12em; color: var(--muted); }
  &:hover { color: var(--accent); }
  &:hover > svg:last-child { color: var(--accent); }
`;

const FormColumn = styled.div`
  min-width: 0; display: flex; flex-direction: column;
  h2 { font-size: clamp(2rem, 3.4vw, 2.6rem); line-height: 1; margin-bottom: 10px; }
  > p { font-size: 1.05rem; color: var(--muted); margin-bottom: 28px; }
`;

const FormSection = styled.form`
  display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px;
  > :nth-child(3), > [data-full-width], > button, > [role='status'] { grid-column: 1 / -1; }
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`;

const CustomTextarea = styled.textarea`
  min-height: 150px; resize: vertical; font-family: inherit;
`;

const CharCounter = styled.div`
  text-align: right; margin-top: 6px;
  font-size: 0.95rem; color: var(--muted);
`;

const SubmitButton = styled.button`${buttonStyles} min-height: 56px; font-size: 1.05rem;`;
