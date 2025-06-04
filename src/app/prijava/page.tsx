'use client'

import { useState } from "react";
import styled from "styled-components";

export default function SignUp() {

    const [hasWeapon, setHasWeapon] = useState(false)
    const [selectedPackage, setSelectedPackage] = useState<'starter' | 'premium' | null>(null);

    return (
        <SignUpPageContainer>
            <SignUpForm>
                <h1>Forma za registraciju</h1>
                <CustomSignUpInputContainer>
                    <label>Ime</label>
                    <input></input>
                </CustomSignUpInputContainer>
                <CustomSignUpInputContainer>
                    <label>Prezime</label>
                    <input></input>
                </CustomSignUpInputContainer>
                <CustomSignUpInputContainer>
                    <label>Kontakt telefon</label>
                    <input></input>
                </CustomSignUpInputContainer>
                <CustomSignUpInputContainer>
                    <label>Broj lične karte</label>
                    <input></input>
                </CustomSignUpInputContainer>
                <CustomSignUpInputContainer>
                    <label>Adresa stanovanja</label>
                    <input></input>
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
                {hasWeapon && <CustomSignUpInputContainer>
                    <label>Broj oružanog lista</label>
                    <input></input>
                </CustomSignUpInputContainer>}
                <PackageSelectionContainer>
                    <PackageBox
                        selected={selectedPackage === 'starter'}
                        onClick={() => setSelectedPackage('starter')}
                    >
                        <h2>STARTER</h2>
                        <ul>
                            <li>Osnovni pristup</li>
                            <li>Jedan trening sedmično</li>
                            <li></li>
                            <li>Grupne sesije</li>
                            <li>Podrška putem e-maila i WhatsApp-a</li>
                        </ul>
                        <Price>150 KM/god</Price>
                    </PackageBox>

                    <PackageBox
                        selected={selectedPackage === 'premium'}
                        onClick={() => setSelectedPackage('premium')}
                    >
                        <h2>PREMIUM</h2>
                        <ul>
                            <li>Neograničen pristup</li>
                            <li>Personalizovani treninzi</li>
                            <li>1-na-1 sesije</li>
                            <li>Prioritetna podrška</li>
                        </ul>
                        <Price>200 KM/god</Price>
                    </PackageBox>
                </PackageSelectionContainer>

                <CustomSignUpButton>
                    PRIJAVI SE
                </CustomSignUpButton>
            </SignUpForm>
        </SignUpPageContainer>
    );
}


const SignUpPageContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 20rem;
  @media screen and (max-width: 767px) {
    padding: 1rem;
  }

  h1 {
  }
`;

const SignUpForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1rem;
    
`

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

  input[type='radio']:focus + label {
    outline: 2px solid #ceff51;
  }
`;


const CustomSignUpInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    input {
        height: 2rem;
        width: 100%;
        border-radius: 6px;
        padding-left: 1rem;
        border: 2px solid gray;
        :focus {
            border: 3px solid #CEFF51
        }
        
    }
    
`

const CustomSignUpButton = styled.button`
    background-color: #CEFF51;
    border: none;
    color: #000000;
    font-family: var(--font-mohave);
    font-size: 1.5rem;
    font-weight: bold;
    height: 4rem;
    cursor: pointer;

`

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
  box-shadow: ${({ premium }) =>
    premium ? '0 0 10px rgba(206, 255, 81, 0.4)' : 'none'};
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

