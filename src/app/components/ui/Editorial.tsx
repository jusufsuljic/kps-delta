'use client';

import styled, { css } from 'styled-components';
import Link from 'next/link';

export const containerStyles = css`
  width: min(100%, var(--content-width));
  margin-inline: auto;
  padding-inline: var(--gutter);
`;

export const PageContainer = styled.div`
  ${containerStyles}
  padding-block: 56px 80px;
  @media (max-width: 767px) { padding-block: 32px 48px; }
`;

export const PageHeading = styled.header`
  padding-bottom: 32px;
  margin-bottom: 32px;
  border-bottom: 1px solid var(--border);
  h1 { font-size: 3.5rem; line-height: 1.05; font-weight: 700; text-transform: uppercase; }
  > p:last-child:not(:first-child) { color: var(--muted); max-width: 620px; font-size: 1.1rem; line-height: 1.6; margin-top: 18px; }
  @media (max-width: 767px) { h1 { font-size: 2.6rem; } }
`;

export const buttonStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  min-height: 48px;
  padding: 12px 24px;
  border: 1px solid var(--accent);
  background: var(--accent);
  color: #101110;
  font-family: var(--font-mohave), sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  &:hover:not(:disabled) { background: #e0ff96; border-color: #e0ff96; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

export const ButtonLink = styled(Link)`
  ${buttonStyles}
`;
