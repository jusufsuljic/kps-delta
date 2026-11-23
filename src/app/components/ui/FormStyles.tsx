'use client';

import styled from 'styled-components';
import { containerStyles, buttonStyles } from './Editorial';

export const SignUpPageContainer = styled.div`
  ${containerStyles}
  padding-block: 56px 80px;
  @media (max-width: 767px) { padding-block: 32px 48px; }
`;

export const SignUpForm = styled.form`
  width: min(100%, 960px);
  margin-inline: auto;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
  h1 { grid-column: 1 / -1; font-size: 2.6rem; line-height: 1.15; padding-bottom: 28px; margin-bottom: 8px; border-bottom: 1px solid var(--border); }
  > button, > [role='status'], > [data-full-width] { grid-column: 1 / -1; }
  @media (max-width: 600px) { grid-template-columns: 1fr; gap: 20px; h1 { font-size: 2rem; } }
`;

export const CustomSignUpInputContainer = styled.div`
  display: flex; flex-direction: column; min-width: 0;
  > label { font-size: 0.95rem; color: #c7cbbf; margin-bottom: 8px; }
  input:not([type='radio']):not([type='file']) {
    background: var(--surface); color: var(--foreground); min-height: 48px; width: 100%;
    border-radius: 0; padding: 10px 14px; border: 1px solid #50554a; font-size: 1rem;
    transition: border-color 180ms ease;
    &:hover { border-color: #8b9281; }
    &:focus { outline: 2px solid var(--accent); outline-offset: 2px; border-color: var(--accent); }
  }
`;

export const CustomSignUpButton = styled.button`${buttonStyles} width: 100%; margin-top: 8px;`;
