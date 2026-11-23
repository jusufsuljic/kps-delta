'use client';

import styled, { keyframes } from 'styled-components';
import { containerStyles, buttonStyles } from './Editorial';

export const SignUpPageContainer = styled.div`
  ${containerStyles}
  padding-block: 56px 96px;
  @media (max-width: 767px) { padding-block: 32px 56px; }
`;

export const SignUpForm = styled.form`
  position: relative;
  width: min(100%, 960px);
  margin-inline: auto;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
  padding: 40px;
  background: var(--surface);
  border: 1px solid var(--border);
  h1 { grid-column: 1 / -1; font-size: clamp(2rem, 4vw, 2.8rem); line-height: 1.05; padding-bottom: 24px; margin-bottom: 8px; border-bottom: 1px solid var(--border); }
  > button, > [role='status'], > [data-full-width] { grid-column: 1 / -1; }
  @media (max-width: 600px) { grid-template-columns: 1fr; gap: 20px; padding: 0; background: none; border: 0; }
`;

export const CustomSignUpInputContainer = styled.div`
  display: flex; flex-direction: column; min-width: 0;
  > label { font-size: 1.05rem; color: #c7cbbf; margin-bottom: 8px; }
  input:not([type='radio']):not([type='file']), textarea {
    background: #0e100d; color: var(--foreground); min-height: 50px; width: 100%;
    border-radius: 0; padding: 12px 14px; border: 1px solid var(--border-strong); font-size: 1.05rem;
    transition: border-color 180ms ease, box-shadow 180ms ease;
    &:hover { border-color: #7b8271; }
    &:focus { outline: none; border-color: var(--accent); }
  }
`;

export const CustomSignUpButton = styled.button`${buttonStyles} width: 100%; margin-top: 8px; min-height: 56px; font-size: 1.05rem;`;

const fadeIn = keyframes`from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; }`;

// Status message shown after any form submission.
export const StatusBox = styled.div<{ $status: 'success' | 'error' }>`
  padding: 16px 18px; margin-top: 8px;
  border: 1px solid ${({ $status }) => ($status === 'success' ? '#ceff5170' : '#ff5c4d80')};
  border-left: 4px solid ${({ $status }) => ($status === 'success' ? 'var(--success)' : 'var(--danger)')};
  background: ${({ $status }) => ($status === 'success' ? '#ceff5112' : '#ff5c4d14')};
  color: var(--foreground); font-size: 1.05rem; line-height: 1.5; text-align: left;
  animation: ${fadeIn} 0.35s ease;
`;

const spin = keyframes`to { transform: rotate(360deg); }`;

export const Spinner = styled.div`
  width: 22px; height: 22px; margin: auto;
  border: 3px solid #10111033; border-left-color: #101110; border-radius: 50%;
  animation: ${spin} 0.9s linear infinite;
`;
