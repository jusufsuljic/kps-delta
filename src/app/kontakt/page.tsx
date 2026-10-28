'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { containerStyles, buttonStyles, PageHeading } from '../components/ui/Editorial';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

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
            {/* --- This wrapper now only handles the two-column layout --- */}
            <ColumnsWrapper>
                <InfoSection>
                    <h2>Kontakt Informacije</h2>
                    <InfoItem>
                        <FaPhone />
                        <a href="tel:+38761032285">+387 61 032 285</a>
                    </InfoItem>
                    <InfoItem>
                        <FaEnvelope />
                        <a href="mailto:kpsdelta@hotmail.com">kpsdelta@hotmail.com</a>
                    </InfoItem>
                    <InfoItem>
                        <FaMapMarkerAlt />
                        <span><a target="_blank" rel="noopener noreferrer" href="https://share.google/6kzBou3tgw0zyTQ4x">Sportsko Strelište Žuč, 71000 Sarajevo</a></span>
                    </InfoItem>
                </InfoSection>

                {/* --- This new container holds everything for the right column --- */}
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

                        <CustomInputContainer>
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
  padding-block: 56px 80px;
  @media (max-width: 767px) { padding-block: 32px 48px; }
`;

const ColumnsWrapper = styled.div`
  display: flex;
  gap: 64px;
  width: 100%;
  align-items: flex-start;

  @media screen and (max-width: 900px) {
    flex-direction: column;
    > div { width: 100%; }
    gap: 2rem;
  }
`;

const InfoSection = styled.div`
  flex: 1; /* Takes up 1/3 of the space */
  padding: 32px; background: var(--surface); border-top: 2px solid var(--accent); min-width: 0;
  h2 {
    color: #ffffff;
    margin-bottom: 1.5rem;
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  font-size: 1rem;

  svg {
    flex-shrink: 0;
    color: #CEFF51;
    font-size: 1.5rem;
  }

  a, span {
    overflow-wrap: anywhere;
    color: #fff;
    text-decoration: none;
    transition: color 0.2s ease;
  }
  a:hover {
    color: #CEFF51;
  }
`;

const FormColumn = styled.div`
    flex: 1.4; min-width: 0;
    display: flex;
    flex-direction: column;

    h2 {
        color: #ffffff;
        margin-bottom: 0.5rem; font-size: 2rem;
    }
  
    p {
        font-size: 1rem;
        color: #b0b0b0;
        margin-bottom: 3rem;
    }
`;

const FormSection = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const CustomInputContainer = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 0.5rem;
    color: #b0b0b0;
    font-weight: 500;
  }

  input {
    background-color: #1a1a1a;
    color: #fff;
    height: 3rem;
    width: 100%;
    border-radius: 0;
    padding-left: 1rem;
    border: 1px solid #50554a;
    transition: border-color 0.2s ease;
    
    &:focus {
      outline: none;
      border-color: #CEFF51;
    }
  }
`;

const CustomTextarea = styled.textarea`
    background-color: #1a1a1a;
    color: #fff;
    min-height: 120px;
    width: 100%;
    border-radius: 0;
    padding: 0.75rem 1rem;
    border: 1px solid #50554a;
    resize: vertical;
    transition: border-color 0.2s ease;

    &:focus {
      outline: none;
      border-color: #CEFF51;
    }
`;

const CharCounter = styled.div`
  text-align: right;
  font-size: 0.85rem;
  color: var(--muted);
  margin-top: 0.25rem;
`;

const SubmitButton = styled.button`${buttonStyles}`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border-left-color: #000;
  animation: spin 1s ease infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const SubmissionStatusBox = styled.div<{ $status: 'success' | 'error' }>`
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 8px;
  font-weight: 500;
  color: #fff;
  background-color: ${({ $status }) => ($status === 'success' ? '#28a745' : '#dc3545')};
`;